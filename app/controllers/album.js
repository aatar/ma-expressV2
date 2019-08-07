const fetch = require('node-fetch');

const listAlbums = (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(json => res.status(200).send(json));
};

const listPhotos = (req, res) => {
  fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${req.params.id}`)
    .then(response => response.json())
    .then(json => res.status(200).send(json));
};
module.exports = { listAlbums, listPhotos };
