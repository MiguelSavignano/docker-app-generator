module.exports = {
  name: 'nodejs',
  label: 'Nodejs',
  description:
    'Generate the necessary files to create Dockerfile for <strong>Nodejs server</strong>.',
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
        {
          name: 'docker_image_name',
          title: 'Docker image name',
          type: 'text',
          defaultValue: 'docker_user/my_app'
        },
      ],
    },
  ],
  tabs: [
    {
      fileName: 'Dockerfile',
      template: 'templates/nodejs/Dockerfile.ejs',
    },
    {
      fileName: '.dockerignore',
      template: 'templates/nodejs/dockerignore.ejs',
    },
    {
      fileName: '.github/workflows/build-docker-image.yml',
      template: 'templates/nodejs/build-docker-image.yml.ejs',
    },
  ],
};
