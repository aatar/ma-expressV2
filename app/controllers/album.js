const {
    listAlbums: listAlbumsService,
    listPhotos: listPhotosService,
    findAlbumsById: findAlbumsByIdService
  } = require('../services/jsonplaceholder'),
  logger = require('../logger'),
  { albumUser } = require('../models'),
  { albumMapper } = require('../mappers/album');

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
  logger.info('Searching album...');
  return findAlbumsByIdService(req.params.id)
    .then(response => {
      logger.info('Creating album...');
      req.params.title = response.title;
      return albumUser.create(albumMapper(req.params)).then(() => res.status(201).send('OK, bought album'));
    })
    .catch(next);
};
