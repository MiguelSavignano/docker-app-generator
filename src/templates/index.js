export default {
  'rails/Dockerfile': require('./rails/TDockerfile').default,
  'rails/DockerCompose': require('./rails/DockerCompose').default,
  'rails/DockerIgnore': require('./rails/DockerIgnore').default,
  'react/Dockerfile': require('./react/TDockerfile').default,
  'react/DockerIgnore': require('./react/DockerIgnore').default,
  'frontend/NgixConf': require('./frontend/NgixConf').default,
  'nodejs/Dockerfile': require('./nodejs/TDockerfile').default,
  'nodejs/DockerIgnore': require('./nodejs/DockerIgnore').default,
};
