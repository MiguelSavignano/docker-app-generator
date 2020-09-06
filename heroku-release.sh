APP_NAME=$1
WEB_DOCKER_IMAGE_ID=`docker inspect registry.heroku.com/$APP_NAME/web --format={{.Id}}`
echo $WEB_DOCKER_IMAGE_ID
curl --netrc -X PATCH https://api.heroku.com/apps/$APP_NAME/formation \
--data @<(cat <<EOF
  { "updates": [
      {
        "type": "web",
        "docker_image": "$WEB_DOCKER_IMAGE_ID"
      }
    ]
  }
EOF
) \
-H "Content-Type: application/json" \
-H "Accept: application/vnd.heroku+json; version=3.docker-releases"
