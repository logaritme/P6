

////////////////////////////////////////////
// I CAN'T MAKE THIS FUNCTION AS A MODULE //
////////////////////////////////////////////

// import { mediasInLightBoxes, mediasSortedLikes, mediasSortedDate, mediasSortedTitle, mediasFiltereds, 
//   justMediasIdInLightBox } from '../pages/photographer-page.js';

// export
function canModifyMediasFiltereds() {
  if (mediasSortedLikes !== undefined) {
    mediasInLightBoxes = mediasSortedLikes;
    // console.log('if/else 1ère entrée:', mediasInLightBoxes);
  } else if (mediasSortedDate !== undefined) {
    mediasInLightBoxes = mediasSortedDate;
    // console.log('if/else 2ème entrée:', mediasInLightBoxes);
  } else if (mediasSortedTitle !== undefined) {
    mediasInLightBoxes = mediasSortedTitle;
    // console.log('if/else 3ème entrée:', mediasInLightBoxes);
  } else if (mediasFiltereds.length > 0) {
    mediasInLightBoxes = mediasFiltereds;
    // console.log('if/else 4ème entrée:', mediasInLightBoxes);
  } else console.log('Error in the array of mediasFiltereds');
  // console.log(mediasInLightBoxes);
  // justMediasIdInLightBox = Array.from(justMediasIdInLightBox);
  for (let i = 0; i < mediasInLightBoxes.length; i++) {
    justMediasIdInLightBox.push(mediasInLightBoxes[i].id);
  }
  // console.log(justMediasIdInLightBox);
};
