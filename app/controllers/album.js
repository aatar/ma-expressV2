const {
    listAlbums: listAlbumsService,
    listPhotos: listPhotosService,
    findAlbumsById: findAlbumsByIdService
  } = require('../services/jsonplaceholder'),
  logger = require('../logger'),
  { AlbumUser } = require('../models');

exports.listAlbums = (req, res, next) => {
  logger.info('Listing albums...');
  return listAlbumsService()
    .then(response => res.send(response))
    .catch(next);
};
exports.listPhotos = (req, res, next) => {
  logger.info('Listing photos...');
  return listPhotosService(req)
    .then(response => res.send(response))
    .catch(next);
};

exports.buyAlbum = (req, res, next) => {
  logger.info('Listing photos...');
  return findAlbumsByIdService(req.params.id)
    .then(response => {
      AlbumUser.create({
        user_id: req.params.userId,
        album_id: response.id,
        album_title: response.title
      })
        .then(() => res.status(201).send('OK, bought album'))
        .catch(next);
    })
    .catch(next);
};
