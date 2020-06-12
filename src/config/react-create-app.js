module.exports = {
  name: 'react-create-app',
  label: 'React',
  description:
    'Generate the necessary files to dockerize a <strong>React create app</strong>.',
  groups: [
    {
      title: 'Versions',
      questions: [
        {
          title: 'Nodejs version',
          name: 'node_version',
          defaultValue: '10.16.3',
          type: 'text',
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
      template: 'react/Dockerfile',
    },
    {
      fileName: '.dockerignore',
      template: 'react/DockerIgnore',
    },
    {
      fileName: 'nginx/conf.d/default.conf.template',
      template: 'frontend/NgixConf',
    },
  ],
};
