const { albumUser } = require('../models'),
  { alreadyBoughtAlbumError, didntBuyAlbumError } = require('../errors');

const userBoughtAlbum = (req, res, next) =>
  albumUser
    .findOne({
      where: {
        albumId: req.params.id,
        userId: req.user.id
      }
    })
    .then(album => album)
    .catch(next);

exports.checkIfUserDidntBuyAlbum = (req, res, next) =>
  userBoughtAlbum(req, res, next)
    .then(response => {
      if (response) {
        throw alreadyBoughtAlbumError('You have already bought that album');
      } else {
        return next();
      }
    })
    .catch(next);

exports.checkIfUserBoughtAlbum = (req, res, next) =>
  userBoughtAlbum(req, res, next)
    .then(response => {
      if (response) {
        return next();
      }
      throw didntBuyAlbumError('You did not buy that album');
    })
    .catch(next);
