module.exports = {
  name: 'nginx',
  label: 'Nginx static',
  description:
    'Generate the necessary files to create Dockerfile for <strong>Nginx static server</strong>.',
  groups: [
    {
      title: 'Files',
      questions: [
        {
          title: 'Build folder',
          name: 'build_folder',
          defaultValue: 'build',
          type: 'text',
        },
      ],
    },
  ],
  tabs: [
    {
      fileName: 'Dockerfile',
      template: 'templates/nginx/Dockerfile.ejs',
    },
    {
      fileName: 'nginx/conf.d/default.conf',
      template: 'templates/nginx/default.conf',
    },
  ],
};
