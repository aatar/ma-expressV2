exports.albumMapper = params => ({
  user_id: params.user.id,
  album_id: params.id,
  album_title: params.title
});
