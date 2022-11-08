module.exports = {
  name: 'react-create-app',
  label: 'React',
  description:
    'Generate the necessary files to create a Dockerfile and Ngix configuration for <strong>React create app</strong>.',
  groups: [
    {
      title: 'Versions',
      questions: [
        {
          title: 'Nodejs version',
          name: 'node_version',
          defaultValue: '14-alpine',
          type: 'select',
          selectOptions: 'node-alpine'
        },
      ],
    },
    {
      title: 'Package manager',
      questions: [
        {
          title: 'npm',
          name: 'javascrit_package_manager',
          checked: 'checked',
          value: 'npm',
          type: 'radio',
        },
        {
          title: 'yarn',
          name: 'javascrit_package_manager',
          value: 'yarn',
          type: 'radio',
        },
      ],
    },
    {
      title: 'Server config',
      questions: [
        {
          name: 'server_conf',
          title: 'Nginx static',
          checked: 'checked',
          value: 'nginx',
          type: 'radio',
        },
        {
          name: 'server_conf',
          title: 'Nodejs static',
          value: 'nodejs',
          type: 'radio',
        },
      ],
    },
    {
      title: 'Extra config',
      questions: [
        {
          name: 'private_npm',
          title: 'Npm private repository',
          checked: false,
          type: 'checkbox',
        },
      ],
    },
  ],
  tabs: [
    {
      fileName: 'Dockerfile',
      template: 'templates/react/Dockerfile',
    },
    {
      fileName: '.dockerignore',
      template: 'templates/react/dockerignore',
    },
    {
      fileName: 'docker-compose.yml',
      template: 'templates/react/docker-compose.yml',
    },
    {
      fileName: 'nginx/conf.d/default.conf.template',
      mode: 'nginx',
      template: 'templates/react/nginx-default.conf',
    },
  ],
};
