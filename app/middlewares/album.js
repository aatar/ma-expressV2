const { albumUser } = require('../models'),
  { alreadyBoughtAlbumError, didntBuyAlbumError } = require('../errors'),
  logger = require('../logger');

const userBoughtAlbum = (req, res, next) => {
  logger.info('Searching album...');
  return albumUser
    .findOne({
      where: {
        albumId: req.params.id,
        userId: req.user.id
      }
    })
    .then(album => album)
    .catch(next);
};

exports.checkIfUserDidntBuyAlbum = (req, res, next) => {
  logger.info('Checking if did not buy album...');
  return userBoughtAlbum(req, res, next)
    .then(response => {
      if (response) {
        throw alreadyBoughtAlbumError('You have already bought that album');
      } else {
        return next();
      }
    })
    .catch(next);
};

exports.checkIfUserBoughtAlbum = (req, res, next) => {
  logger.info('Checking if bought album...');
  return userBoughtAlbum(req, res, next)
    .then(response => {
      if (response) {
        return next();
      }
      throw didntBuyAlbumError('You did not buy that album');
    })
    .catch(next);
};
