const { AlbumUser, User } = require('../models');

const checkIfUserBoughtAlbum = (req, res, next) =>
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
    .then(albums => {
      if (albums && albums.length > 0) {
        res.status(400).send('You have already bought that album');
      } else {
        next();
      }
    })
    .catch(err => next(err));

module.exports = { checkIfUserBoughtAlbum };
