## Docker generator

Single page application generate Dockerfile, docker-compose.yml, etc with diferents configurations

[http://docker.templateconf.com/](http://docker.templateconf.com/)

### Development

```
npm install
npm start
```

**Note**: Is require run `npm run build:templates` for every templates folder change.

### Templates available

- React create app
- Nodejs server
- Rails server

### Ejs helpers

Use `-%>` Remove all safe-to-remove whitespace, including leading and trailing whitespace.

Use includes with `<%-` Example:

```
<%- include('templates/nodejs/modulesCacheLayer.ejs'); %>
```

## Deployment

Upload to GCP storage as static website [Documentation](https://cloud.google.com/storage/docs/hosting-static-website)

Ensure have a key.json with storage permissions to upload.

```
docker build .
```
