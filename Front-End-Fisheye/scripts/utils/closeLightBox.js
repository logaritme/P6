// Closes the lightBox called by (2) ways: click & enter on element cross
function closeLightBox(theIndex, theIndexBis) {
  // Reset theIndex and theIndexBis
  theIndex = null;
  theIndexBis;
  // Clean lightBox content ( title && (image || video) )
  document.querySelector('.injected-content-lightBox').innerHTML = '';
  // Invisibility of video
  document.querySelector('.flex-center.as-video').classList.remove('show');
  document.querySelector('.as-video.injected-content-lightBox').classList.add('hidden');
  // Invisibility of image
  document.querySelector('.flex-center.as-img').classList.remove('show');
  document.querySelector('.as-img.injected-content-lightBox').classList.add('hidden');
  // Closes the lightbox a hidden class
  document.querySelector('#LightBox_modal').classList.remove('show');
  document.querySelector('#LightBox_modal').classList.add('hidden');
}
