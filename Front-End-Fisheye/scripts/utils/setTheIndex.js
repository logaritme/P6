let theIndexBis = Number;

function setTheIndex() {
  const mediaLinks = document.querySelectorAll('.dimensions-photos-grapher-page');
  for (let mediaLink of mediaLinks) {
    mediaLink.addEventListener('click', function (element) {
      const idInLightBoxCastedToNumber = Number(element.path[3].id);
      theIndexBis = justMediasIdInLightBox.findIndex((elt) => elt === idInLightBoxCastedToNumber);
    });
  }
}

export { setTheIndex, theIndexBis };
