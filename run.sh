#!/bin/sh

git add .
git commit -m "test"
git push
docker exec -w //data nodered npm install --save git+https://github.com/arnfox/node-red-contrib-google-oauth2.git
docker restart nodered