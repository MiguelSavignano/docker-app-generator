module.exports = {
  name: 'rails',
  label: 'Rails',
  description:
    'Generate the necessary files to dockerize a <strong>Rails server</strong>.',
  groups: [
    {
      title: 'Versions',
      questions: [
        {
          title: 'Ruby version',
          name: 'ruby_version',
          defaultValue: '2.5.6',
          type: 'text',
        },
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
        {
          title: 'Asset pipeline (Sprockets)',
          name: 'javascrit_package_manager',
          value: 'asset_pipeline',
          type: 'radio',
        },
      ],
    },
    {
      title: 'Database',
      questions: [
        {
          name: 'database',
          label: 'postgresql',
          title: 'postgresql',
          checked: 'checked',
          value: 'postgresql',
          type: 'radio',
        },
        {
          name: 'database',
          label: 'mysql',
          title: 'mysql',
          value: 'mysql',
          type: 'radio',
        },
      ],
    },
    {
      title: 'Extra config',
      questions: [
        {
          name: 'rails_worker',
          title: 'Sidekiq workers',
          checked: true,
          type: 'checkbox',
        },
        {
          name: 'github_private',
          title: 'Github token for private gems?',
          checked: false,
          type: 'checkbox',
        },
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
      template: 'templates/rails/Dockerfile.ejs',
    },
    {
      fileName: 'docker-compose.yml',
      template: 'templates/rails/docker-compose.yml',
    },
    {
      fileName: '.dockerignore',
      template: 'templates/rails/dockerignore',
    },
  ],
};
