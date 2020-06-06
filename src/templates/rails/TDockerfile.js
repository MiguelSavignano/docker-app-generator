import React from 'react';
import { CodeSnippet } from '../CodeSnippet';
import { nodeModulesCacheLayer } from '../react/TDockerfile';

require('codemirror/mode/dockerfile/dockerfile');

const installNodejs = ({ javascrit_package_manager, node_version }) => {
  const layer = [];

  if (javascrit_package_manager === 'asset_pipeline') {
    layer.push(`RUN apt-get install -y nodejs npm`);
  } else {
    layer.push(`ENV NODE_VERSION=${node_version}`);
    layer.push(
      `COPY --from=node:${node_version}-slim /usr/local/bin/ /usr/local/bin/`,
    );
    layer.push(
      `COPY --from=node:${node_version}-slim /usr/local/lib/ /usr/local/lib/`,
    );
    if (javascrit_package_manager === 'yarn') {
      layer.push(`COPY --from=node:${node_version}-slim /opt/ /opt/`);
    }
  }
  return layer.join('\n');
};
export const template = ({
  ruby_version,
  node_version,
  javascrit_package_manager,
  private_npm,
  database,
  github_private,
}) => `FROM ruby:${ruby_version}-slim as builder

# Install common libs
RUN apt-get update -qq && apt-get install -y \\
  build-essential vim git
${(() => {
  if (database === 'mysql') {
    return `
# Install Mysql
RUN apt-get install -y mysql-client libmysqlclient-dev`;
  } else if (database === 'postgresql') {
    return `
# Install Postgresql
RUN apt-get install -y postgresql-client libpq-dev`;
  }
})()}

# Install Nodejs
${installNodejs({ javascrit_package_manager, node_version })}

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
ARG RAILS_ENV=production

ENV NODE_ENV=$NODE_ENV
ENV RAILS_ENV=$RAILS_ENV

# Gems cache layer
COPY Gemfile Gemfile.lock /app/
RUN bundle install -j $(nproc)

${
  javascrit_package_manager !== 'asset_pipeline'
    ? nodeModulesCacheLayer({ javascrit_package_manager, private_npm })
    : ``
}

COPY . .

# Build production assets
RUN bundle exec rails assets:precompile
${
  javascrit_package_manager !== 'asset_pipeline'
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
RUN apt-get update -qq && apt-get install -y \\
  libpq-dev \\
  nodejs \\
&& apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN groupadd -r deploy && useradd -r -g deploy deploy
USER deploy

COPY --from=builder --chown=deploy:deploy /usr/local/bundle /usr/local/bundle
COPY --from=builder --chown=deploy:deploy /app /app

CMD [ "sh", "-c", "bundle exec rake db:create db:migrate && bundle exec rails server -b 0.0.0.0" ]
`;

export default (props) => (
  <CodeSnippet mode="dockerfile" template={template} {...props} />
);
