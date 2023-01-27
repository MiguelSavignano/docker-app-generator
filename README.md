## Docker generator

Single page application generate Dockerfile, docker-compose.yml, etc with diferents configurations

https://miguelsavignano.github.io/docker-app-generator/

## Docker image

```
docker run --rm -p 8080:80 devmasx/docker-app-generator
```

[http://localhost:8080/](http://localhost:8080/)
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
