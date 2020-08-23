const { nodeModulesCacheLayer } = require('../nodejs/TDockerfile');

module.exports.default = `# BUILD STAGE
FROM node:<%= node_version %>-alpine as build

WORKDIR /app
${nodeModulesCacheLayer}
COPY . .
RUN npm run build

# FINAL STAGE
<% if (server_conf === 'nginx') { -%>
FROM nginx:1.15
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/conf.d/default.conf.template /etc/default.conf.template

ENV PORT=80
CMD /bin/bash -c "envsubst < /etc/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
<% } %>
<% if (server_conf === 'nodejs') { %>
FROM node:<%= node_version %>-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
<% } %>
`;
