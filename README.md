# Generic Google API Client for Node-RED using OAuth2

Node-RED node for Google APIs.

This Node is based on the implementation by [74Labs](https://github.com/74Labs/node-red-contrib-google). It has been updated to use the latest version of the __googleapis__. Further the authorization workflows has been changed to __OAuth2__.

## Features

This node is a wrapper for official Google APIs Node.js Client: [google-api-nodejs-client](https://github.com/google/google-api-nodejs-client).

List of available APIs are delivered online via [Google API Discovery Service](https://developers.google.com/discovery/).

Package contains two nodes. There is configuration node made for maintaining connection to Google API Services (_google-credentials_) and regular node providing posibility to call any method of any API exposed via official Google's Node.js Client.

## How to Install

Run the following command in the root directory of your Node-RED install

```
npm install node-red-contrib-google-oauth2
```

or for a global installation
```
npm install -g node-red-contrib-google-oauth2
```

## Configuration

1. Generate OAuth credentials at [Google API Console](https://console.developers.google.com/apis/credentials/oauthclient).

  * Choose Web Application.
  * As `Authorized JavaScript origins` enter your Node-RED IP (_e.g. `http://localhost:1880`_)
  * As `Authorized redirect URIs` enter your Node-RED IP plus `/google-credentials/auth/callback` (_e.g. `http://localhost:1880/google-credentials/auth/callback`_)
  * Hint - if operating remotely or over a vpn where you dont have access to localhost you can change your local hosts file to point the VPN address to local host e.g 100.5.2.1 localhost

2. Copy the `Client ID` and `Client secret` and paste them into the Config Node

 * Add scopes that you would like to access. For instance to access the drive APIs to create and manage files use

  ```
  https://www.googleapis.com/auth/drive
  https://www.googleapis.com/auth/drive.file 
  ```

3. Click Authorization and follow the flow. 
4. You should now have a configured google node

## Add fs object to the global modules in node-red

The drive api requires you pass it as a stream rather than a buffer. To easily faciltate this in your node-red flows add the fs module to the global modules in your settings.js
```
  functionGlobalContext: {
        fs:require('fs'),
    },

```
and restart node-red

## Example use the drive api to create a file

The node uses the google apis. For example on how to use these apis the google documentation is very useful. for instance

https://developers.google.com/drive/api/v3/manage-uploads

### To use it in node-red
In a function node set up the parameters for the API call (for the google node). On the assumption that the msg object has a filename and filenameShort property the code to upload a tar.gz file would look like

```
const fs = global.get('fs')

msg.payload = {}

let fileMetadata = {
    name : msg.filenameShort,
}

let media = {
    mimeType : 'application/x-tar',
    body :  fs.createReadStream(msg.filename)
}

msg.payload = {
    resource : fileMetadata,
    media : media,
    fields : 'id'
}

return msg

```

and connect it to the google node. If all has gone well you should be able to upload a file from node red


