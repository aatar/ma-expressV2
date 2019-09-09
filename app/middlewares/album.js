const { AlbumUser, User } = require('../models'),
  { alreadyBoughtAlbumError, didntBuyAlbumError } = require('../errors');

const userBoughtAlbum = (req, res, next) =>
  AlbumUser.findOne({
    where: {
      album_id: req.params.id,
      user_id: req.params.user.id
    },
    include: [
      {
        model: User,
        as: 'user'
      }
    ]
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
