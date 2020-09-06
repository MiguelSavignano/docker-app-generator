# BUILD STAGE
FROM node:10.16.3-alpine as build

WORKDIR /app
ARG PUBLIC_URL=https://storage.googleapis.com/example-bucket105
ENV PUBLIC_URL=$PUBLIC_URL

# Node modules cache layer
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM google/cloud-sdk:latest as sync-assets
# RUN --mount=type=secret,id=GCP_SA_KEY gcloud auth activate-service-account --key-file /run/secrets/GCP_SA_KEY
# RUN gcloud auth activate-service-account --key-file /run/secrets/GCP_SA_KEY

ARG GCP_SA_KEY
RUN echo $GCP_SA_KEY | base64 -d > key.json && \
    gcloud auth activate-service-account --key-file key.json && \
    rm -f key.json

WORKDIR /app
COPY --from=build /app/build /app/build
# Archive all bucket objects, to delete with lifecycle https://cloud.google.com/storage/docs/lifecycle
RUN gsutil -m rewrite -s archive gs://example-bucket105/** || echo "0"
# Upload all new assets builded
RUN gsutil -m rsync -r /app/build gs://example-bucket105

# # FINAL STAGE
FROM nginx:1.15

COPY --from=sync-assets /app/build/ /usr/share/nginx/html/
COPY nginx/conf.d/default.conf.template /etc/default.conf.template

ENV PORT=80
CMD /bin/bash -c "envsubst < /etc/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
