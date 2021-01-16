# URL Shortener
URL shortening is used to create shorter aliases for long URLs. Inspired by TinyURL, this project aims to clone the behaviors of TinyURL.

---
## Author
- [Songren Zhao](https://www.linkedin.com/in/songrenzhao/) 
## Features
- [x] Encoding actual URL with Hashing
- [x] Redirect to actual URL with tiny URL
- [ ] Caching - Redis? Design a LRU if cache is full? 
- [ ] High Traffic Capability?
## Requirements
For development, you will only need the following tools
- Node.js
- Yarn / Npm
- MongoDB

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
```
Notice MONGODB setting corresponds to this `mongodb+srv://${USERNAME}:${PASSWORD}@${MISC}?retryWrites=true&w=majority`

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
