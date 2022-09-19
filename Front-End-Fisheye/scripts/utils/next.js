
/*
// Retrieves the index and newIdMediaShownInLightBox of next media (to the right)
export function next() {
  if (theIndex !== null) {
    // Based on theIndex
    if (theIndex === -1) {
      console.log('Error in next() based on theIndex');
    } else if (theIndex === mediasInLightBoxes.length - 1) {
      theIndex = 0;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    } else {
      theIndex++;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    }
  } else {
    // Based on theIndexBis
    if (theIndexBis === -1) {
      console.log('Error in next() based on theIndexBis');
    } else if (theIndexBis === mediasInLightBoxes.length - 1) {
      theIndex = 0;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    } else {
      theIndex = theIndexBis + 1;
      newIdMediaShownInLightBox = mediasIdInLightBox[theIndex];
    }
  }
*/


    /*

  function setCurrentIndexInLightBox(elementClicked, theIndex) {
    // Defines theIndexBis( id is casted to Number)
    theIndex = setMediasIdInLightBox(mediasFilteredsInside).findIndex((elt) => elt === Number(elementClicked.path[1].id));
    return theIndex;
  }

  function setTheIndexBis(elementClicked, theIndexBis) {
    theIndexBis = setMediasIdInLightBox(mediasFilteredsInside).findIndex((elt) => elt === Number(elementClicked.path[3].id));
    return theIndexBis;
  };

  // Iterates on the DOM for the click on the element
  for (const mediaLink of mediaLinks) {
    mediaLink.addEventListener('click', (element) => {
      element.preventDefault();
      element.stopPropagation();
      setCurrentIndexInLightBox(elementClicked, theIndex);
      setTheIndexBis(elementClicked, theIndexBis);
    }

*/
// }

