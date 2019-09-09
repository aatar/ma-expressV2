const { AlbumUser, User } = require('../models'),
  { alreadyBoughtAlbumError } = require('../errors');

exports.checkIfUserBoughtAlbum = (req, res, next) =>
  AlbumUser.findOne({
    where: {
      album_id: req.params.id,
      user_id: req.params.userId
    },
    include: [
      {
        model: User,
        as: 'albumUsers'
      }
    ]
  })
    .then(album => {
      if (album) {
        throw alreadyBoughtAlbumError('You have already bought that album');
      }
      return next();
    })
    .catch(next);
