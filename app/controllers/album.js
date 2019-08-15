const {
  listAlbums: listAlbumsService,
  listPhotos: listPhotosService
} = require('../services/jsonplaceholder');

const listAlbums = (req, res, next) =>
  listAlbumsService()
    .then(response => res.send(response))
    .catch(err => next(err));

const listPhotos = (req, res, next) =>
  listPhotosService(req)
    .then(response => res.send(response))
    .catch(err => next(err));

module.exports = { listAlbums, listPhotos };
