## Table of contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)

## About

ytsr.js is an easy to use [node.js](https://nodejs.org/) module that gets [YouTube](https://www.youtube.com) search results quickly.
It doesn't require any API keys to use!

## Installation

```bash
npm install ytsr.js
```

## Usage

The normal way:

```javascript
const search = require('ytsr.js');

(async query => {
    const res = await search(query);
    console.log(res);
})("Kids by Current Joys");
```

You can also search by type, like video or playlist.

Video example:
```javascript
const search = require('ytsr.js');

(async query => {
    const res = await search(query, { type: "video" });
    console.log(res);
})("Playlist");
```

Playlist example:
```javascript
const search = require('ytsr.js');

(async query => {
    const res = await search(query, { type: "playlist" });
    console.log(res);
})("Playlist");
```