const { albumUser } = require('../models'),
  { alreadyBoughtAlbumError } = require('../errors');

exports.checkIfUserBoughtAlbum = (req, res, next) =>
  albumUser
    .findOne({
      where: {
        albumId: req.params.id,
        userId: req.user.id
      }
    })
    .then(album => {
      if (album) {
        throw alreadyBoughtAlbumError('You have already bought that album');
      }
      return next();
    })
    .catch(next);
