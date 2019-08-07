const listAlbums = (req, res) => {
  res.status(200).send('hello');
  /* fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(json => res.status(200).send(json));*/
};

module.exports = { listAlbums };
