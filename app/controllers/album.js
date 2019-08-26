const {
    listAlbums: listAlbumsService,
    listPhotos: listPhotosService,
    findAlbumsById: findAlbumsByIdService
  } = require('../services/jsonplaceholder'),
  logger = require('../logger'),
  { AlbumUser, User } = require('../models');

exports.listAlbums = (req, res, next) => {
  logger.info('Listing albums...');
  return listAlbumsService()
    .then(response => res.send(response))
    .catch(next);
};

exports.listBoughtAlbums = (req, res, next) => {
  logger.info('Searching for bought albums');
  AlbumUser.findAll({
    where: {
      user_id: req.params.id
    },
    attributes: ['id', 'album_id', 'album_title'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name', 'surname', 'email']
      }
    ]
  })
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
