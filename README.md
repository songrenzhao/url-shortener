# URL Shortener
URL shortening is used to create shorter aliases for long URLs. Inspired by TinyURL, this project aims to clone the behaviors of TinyURL.

---
## Author
- [Songren Zhao](https://www.linkedin.com/in/songrenzhao/) 
## Features
- [x] Encoding and hashing actual URL
- [x] Redirect to actual URL with tiny URL
- [x] Cached popular urls and reduce time it takes to redirect
- [x] High traffic capability, currently L&B with 4 instances
- [x] DNS Look up for IPv4

## Requirements
For development, you will only need the following tools
- Node.js
- Yarn / Npm
- MongoDB
- Redis
## Install

    $ git clone https://github.com/songrenzhao/url-shortener
    $ cd url-shortener
    $ yarn install

## Configure app

Create `.env` in the root folder then edit it with your settings. You will need:
```
PORT=...
MONGODB_USERNAME=...
MONGODB_PASSWORD=...
MONGODB_MISC=...
REDIS_HOST=...
REDIS_PORT=...
REDIS_PASSWORD=...
```
Notice MONGODB setting corresponds to this `mongodb+srv://${USERNAME}:${PASSWORD}@${MISC}?retryWrites=true&w=majority`

## Running the project
    $ yarn build
    $ yarn start
    
## Running the project on dev

    $ yarn dev

## Simple build for production

    $ yarn build
