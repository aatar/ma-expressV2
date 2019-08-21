const rp = require('request-promise');

const listAlbums = () => rp({ uri: `${process.env.JSONPLACEHOLDER_BASE_URL}/albums`, json: true });
const listPhotos = req =>
  rp({ uri: `${process.env.JSONPLACEHOLDER_BASE_URL}/photos?albumId=${req.params.id}`, json: true });

const findAlbumsById = id => rp({ uri: `${process.env.JSONPLACEHOLDER_BASE_URL}/albums/${id}`, json: true });

module.exports = { listAlbums, listPhotos, findAlbumsById };
