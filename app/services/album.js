const { AlbumUser } = require('../models');

const deleteAll = () =>
  AlbumUser.destroy({
    truncate: { cascade: true }
  });

module.exports = { deleteAll };
