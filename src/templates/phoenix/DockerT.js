FROM node:10.13.0-slim as nodejs
FROM elixir:1.6.1

# install common dev libs
RUN apt-get update -qq && apt-get install -y \
  build-essential libpq-dev nano vim git

# install postgresql
RUN apt-get install -y postgresql-client


# Install Nodejs 10.13.0 and Yarn 1.10.1
ENV NODE_VERSION=10.13.0 YARN_VERSION=1.10.1
COPY --from=nodejs /usr/local/bin/ /usr/local/bin/
COPY --from=nodejs /usr/local/lib/ /usr/local/lib/
COPY --from=nodejs /opt/yarn-v1.10.1/ /opt/yarn-v1.10.1/

WORKDIR /app
COPY . /app

# Phoenix dependencies
RUN apt-get install -y inotify-tools
RUN mix do local.rebar, local.hex --force
