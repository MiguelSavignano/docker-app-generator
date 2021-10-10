# BUILD STAGE
FROM node:10.16.3-alpine as build

WORKDIR /app
ARG PUBLIC_URL=https://storage.googleapis.com/docker.templateconf.com
ENV PUBLIC_URL=$PUBLIC_URL

# Node modules cache layer
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:templates
RUN npm run build

FROM google/cloud-sdk:latest as sync-assets

ARG BUCKET_NAME=docker.templateconf.com
ENV BUCKET_NAME=$BUCKET_NAME

# *** SERVICE_ACCOUNT FILE PATH | COPY ***
COPY ./key.json key.json
RUN gcloud auth activate-service-account --key-file key.json && \
    rm -f key.json
# **********************************

# *** SERVICE_ACCOUNT ENV BASE64 | Docker build secretfile path mount (buildkit) ***

# RUN --mount=type=secret,id=GCP_SA_KEY gcloud auth activate-service-account --key-file /run/secrets/GCP_SA_KEY
# RUN gcloud auth activate-service-account --key-file /run/secrets/GCP_SA_KEY
# COPY --from=build /app/build /app/build
# **********************************

# *** SERVICE_ACCOUNT ENV BASE64 | Docker build argument ***

# ARG GCP_SA_KEY
# RUN echo $GCP_SA_KEY | base64 -d > key.json && \
#     gcloud auth activate-service-account --key-file key.json && \
#     rm -f key.json
# **********************************

WORKDIR /app
COPY --from=build /app/build /app/build
# Archive all bucket objects, to delete with lifecycle https://cloud.google.com/storage/docs/lifecycle
RUN gsutil -m rewrite -s archive gs://${BUCKET_NAME}/** || echo "0"
# Upload all new assets builded
RUN gsutil -m rsync -r /app/build gs://${BUCKET_NAME}
