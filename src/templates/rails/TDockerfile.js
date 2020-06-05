import React from 'react';
import { CodeSnippet } from '../CodeSnippet';

require('codemirror/mode/dockerfile/dockerfile');

export const template = ({
  ruby_version,
  node_version,
  javascrit_package_manager,
  database,
  github_private,
}) => `
${
  javascrit_package_manager != 'asset_pipeline'
    ? `FROM node:${node_version}-slim as nodejs`
    : ``
}
FROM ruby:${ruby_version}-slim as builder

# Install common libs
RUN apt-get update -qq && apt-get install -y \\
  build-essential vim git
${(() => {
  if (database == 'mysql') {
    return `
# Install Mysql
RUN apt-get install -y mysql-client libmysqlclient-dev`;
  } else if (database == 'postgresql') {
    return `
# Install Postgresql
RUN apt-get install -y postgresql-client libpq-dev
`;
  }
})()}

# Install Nodejs

${(() => {
  if (javascrit_package_manager == 'asset_pipeline') {
    return `
RUN apt-get install -y nodejs npm`;
  } else if (javascrit_package_manager == 'yarn') {
    return `
ENV NODE_VERSION=${node_version}
COPY --from=nodejs /usr/local/bin/ /usr/local/bin/
COPY --from=nodejs /usr/local/lib/ /usr/local/lib/
COPY --from=nodejs /opt/ /opt/`;
  } else if (javascrit_package_manager == 'npm') {
    return `
ENV NODE_VERSION=${node_version}
COPY --from=nodejs /usr/local/bin/ /usr/local/bin/
COPY --from=nodejs /usr/local/lib/ /usr/local/lib/`;
  }
})()}
WORKDIR /app
${
  github_private
    ? `
# Private repository
ARG GITHUB_TOKEN
ARG GITHUB_USERNAME
RUN bundle config github.com \${GITHUB_USERNAME}:\${GITHUB_TOKEN}
`
    : ``
}
# Production config
ARG BUNDLE_DEPLOYMENT=true
ARG BUNDLE_WITHOUT="development test staging"
ARG NODE_ENV=production

ENV BUNDLE_DEPLOYMENT=$BUNDLE_DEPLOYMENT BUNDLE_WITHOUT=$BUNDLE_WITHOUT
ENV NODE_ENV=$NODE_ENV

# Gems cache layer
COPY Gemfile Gemfile.lock /app/
RUN bundle install -j 4

${(() => {
  if (javascrit_package_manager == 'asset_pipeline') {
    return `
COPY . .
CMD "./entrypoint.sh"`;
  } else if (javascrit_package_manager == 'yarn') {
    return `
# Node modules cache layer
COPY package.json yarn.lock /app/
RUN yarn install --pure-lockfile`;
  } else if (javascrit_package_manager == 'npm') {
    return `
# Node modules cache layer
COPY package.json package-lock.json /app/
RUN npm ci`;
  }
})()}

# ****************************
# ******Production stage******
# ****************************

FROM builder as production-builder
ENV NODE_ENV=production RAILS_ENV=production

# Build production assets
RUN bundle exec rails assets:precompile
${
  javascrit_package_manager != 'asset_pipeline'
    ? `
RUN rm -r node_modules`
    : ``
}
# **********************************
# ******Final production Stage******
# **********************************

FROM ruby:${ruby_version}-slim

ENV NODE_ENV=production RAILS_ENV=production RAILS_LOG_TO_STDOUT=true

# Install system dependencies
${(() => {
  if (javascrit_package_manager != 'asset_pipeline') {
    return `
COPY --from=nodejs /usr/local/ /usr/local/
    `;
  } else if (javascrit_package_manager == 'asset_pipeline') {
    return `
RUN apt-get update -qq && apt-get install -y \
libpq-dev \
nodejs \
&& apt-get clean && rm -rf /var/lib/apt/lists/*`;
  } else {
    return `
RUN apt-get update -qq && apt-get install -y \
libpq-dev \
&& apt-get clean && rm -rf /var/lib/apt/lists/*`;
  }
})()}

WORKDIR /app

RUN groupadd -r deploy && useradd -r -g deploy deploy
USER deploy

COPY --from=production-builder --chown=deploy:deploy /usr/local/bundle /usr/local/bundle
COPY --from=production-builder --chown=deploy:deploy /app /app

CMD [ "sh", "-c", "bundle exec rake db:create db:migrate && bundle exec rails server -b 0.0.0.0" ]
`;

export default () => <CodeSnippet mode="dockerfile" template={template} />;
