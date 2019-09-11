const { Album_user } = require('../models'),
  { alreadyBoughtAlbumError } = require('../errors');

exports.checkIfUserBoughtAlbum = (req, res, next) =>
  Album_user.findOne({
    where: {
      album_id: req.params.id,
      user_id: req.params.user.id
    }
  })
    .then(album => {
      if (album) {
        throw alreadyBoughtAlbumError('You have already bought that album');
      }
      return next();
    })
    .catch(next);
