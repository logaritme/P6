function addLike(idOfMedia) {
  console.log('id:', idOfMedia);
  // If already liked
  if (document.querySelector('#likesHearts-' + idOfMedia + ' i').classList.contains('liked')) {
    document.querySelector('#likesHearts-' + idOfMedia + ' i').classList.remove('liked');
    document.querySelector('#likesHearts-' + idOfMedia + ' span').innerHTML--;
    document.querySelector('#totalLikes').innerHTML--;
  }
  // If not already liked
  else {
    document.querySelector('#likesHearts-' + idOfMedia + ' i').classList.add('liked');
    document.querySelector('#likesHearts-' + idOfMedia + ' span').innerHTML++;
    document.querySelector('#totalLikes').innerHTML++;
  }
}
