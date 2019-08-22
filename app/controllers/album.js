const {
    listAlbums: listAlbumsService,
    listPhotos: listPhotosService,
    findAlbumsById: findAlbumsByIdService
  } = require('../services/jsonplaceholder'),
  { deleteAll: deleteAllService } = require('../services/album'),
  { AlbumUser } = require('../models');

const listAlbums = (req, res, next) =>
  listAlbumsService()
    .then(response => res.send(response))
    .catch(err => next(err));

const listPhotos = (req, res, next) =>
  listPhotosService(req)
    .then(response => res.send(response))
    .catch(err => next(err));

const buyAlbum = (req, res, next) =>
  findAlbumsByIdService(req.params.id)
    .then(response => {
      AlbumUser.create({
        user_id: req.params.userId,
        album_id: response.id,
        album_title: response.title
      })
        .then(() => res.status(201).send('OK, bought album'))
        .catch(err => next(err));
    })
    .catch(err => next(err));

const deleteAll = (req, res, next) =>
  deleteAllService()
    .then(() => res.status(200).send('Deleted All'))
    .catch(error => next(error));

module.exports = { listAlbums, listPhotos, buyAlbum, deleteAll };
