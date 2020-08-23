module.exports = {
  name: 'nodejs',
  label: 'Nodejs',
  description:
    'Generate the necessary files to dockerize a <strong>Nodejs server</strong>.',
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
      title: 'Extra config',
      questions: [
        {
          name: 'private_npm',
          title: 'Npm private repository',
          checked: false,
          type: 'checkbox',
        },
        {
          name: 'typescript',
          title: 'Typescript',
          checked: false,
          type: 'checkbox',
        },
      ],
    },
  ],
  tabs: [
    {
      fileName: 'Dockerfile',
      template: 'nodejs/Dockerfile',
    },
    {
      fileName: '.dockerignore',
      template: 'nodejs/DockerIgnore',
    },
  ],
};
