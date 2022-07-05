//////////////////////////////////////////////
// GLOBAL VARIABLES TO CATCH DOM'S ELEMENTS //

// Change the name of the ID (change to the appropriate DOM's elements)
// Modal form content (entire form block)
const modalContent = document.getElementById('modal-content');

// Modal form button
const modalBtn = document.querySelectorAll('.modal-btn');

// Gets values of inputs ( text + text + email + text ) by types
const inputsInFields = document.querySelectorAll('input[type="text"], input[type="email"]');

// Variables declared for all the functions filtered by regex
let firstName, lastName, email, messageUser;

// Variables to approve validities for the validation function areAllBooleansValid
let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isMessageUserValid = false;
// End of global variables //
/////////////////////////////

////////////////////////
// FUNCTIONS DECLARED //

// Below code given by the source project
// Opens modal form on "Contactez-moi"
function displayModal() {
  const modalContent = document.getElementById('contact_modal');
  modalContent.style.display = 'block';
}

// Closes modal form on "Envoyer" and on cross "X"
function closeModal() {
  const modalContent = document.getElementById('contact_modal');
  modalContent.style.display = 'none';
}
// Above code given by the source project

// Closes the form subscribe modal on valid filled form
const areAllBooleansValid = () => {
  return (
    // Verifies if the value of firstName, lastName, email, birthDate and quantity are not null
    // And verifies if all the functions on input fields and checkboxes return true.
    firstName !== null &&
    isFirstNameValid !== false &&
    lastName !== null &&
    isLastNameValid !== false &&
    email !== null &&
    isEmailValid !== false &&
    messageUser !== null &&
    isMessageUserValid !== false
  );
};

// End of functions declared //
///////////////////////////////

//////////////////////////////////////////////
// FUNCTIONS CLOSE MODAL AND ERRORS DISPLAY //

// Close modal form by button
function closeModal() {
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const eMailInput = document.getElementById('email');
  const messageUserInput = document.getElementById('quantity');

  function displayErrorMsgFirstName() {
    if (firstNameInput.value.length === 0) {
      errorDisplay('firstName', 'Le prénom doit faire entre 2 et 33 caractères.', false);
    }
  }

  function displayErrorMsgLastName() {
    if (lastNameInput.value.length === 0) {
      errorDisplay('lastName', 'Le nom doit faire entre 2 et 33 caractères.', false);
    }
  }

  function displayErrorMsgEmail() {
    if (eMailInput.value.length === 0) {
      errorDisplay('email', "L'email doit faire entre 6 et 33 caractères.", false);
    }
  }

  function displayErrorMsgMessageUser() {
    if (messageUserInput.value.length === 0) {
      errorDisplay('messageUser', "Ce texte n'est pas valide.", false);
    }
  }

  function allErrorsChecked() {
    displayErrorMsgFirstName();
    displayErrorMsgLastName();
    displayErrorMsgEmail();
    displayErrorMsgMessageUser();
  }

  allErrorsChecked();
  if (areAllBooleansValid()) {
    modalContent.style.display = 'none';
  } else {
    modalContent.style.display = 'block';
  }
}

/* Manages all error messages displayed
   through a text displaying in the appropriated div */
const errorDisplay = (tag, messageErr, valid) => {
  const textContainer = document.querySelector(`.${tag}`);
  const textInput = document.querySelector(`.${tag} > input`);
  const errorDisplayDiv = document.querySelector(`.${tag} > div`);
  if (!valid) {
    textContainer.classList.add('errorDiv');
    textInput.classList.add('errorColor');
    errorDisplayDiv.textContent = messageErr;
  } else {
    textContainer.classList.remove('errorDiv');
    textInput.classList.remove('errorColor');
    errorDisplayDiv.textContent = messageErr;
  }
};

// End of functions close modal and errors display //
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
// Functions for all the fields and checkboxes of the form //

// First name : Filters the length and the validity of the first name typed
const firstNameChecker = (value) => {
  // If length is not valid
  if ((value.length > 0 && value.length < 2) || value.length > 33) {
    errorDisplay('firstName', 'Le prénom doit faire entre 2 et 33 caractères.', false);
    firstName = null;
    isFirstNameValid = false;
    areAllBooleansValid();
  }
  // If caracters are not valid
  else if (!value.match(/^(?! \s)[a-zA-ZÀ-ÿ-' ]*$/g)) {
    errorDisplay('firstName', 'Le prénom ne doit contenir ni caractères spéciaux ni chiffres.', false);
    firstName = null;
    isFirstNameValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('firstName', '', true);
    firstName = value;
    isFirstNameValid = true;
    console.info("PRÉNOM:", value);
    areAllBooleansValid();
  }
};

// Last name : Filters the length and the validity of the last name typed
const lastNameChecker = (value) => {
  // If length is not valid
  if ((value.length > 0 && value.length < 2) || value.length > 33) {
    errorDisplay('lastName', 'Le nom doit faire entre 2 et 33 caractères.', false);
    lastName = null;
    isLastNameValid = false;
    areAllBooleansValid();
  }
  // If caracters are not valid
  else if (!value.match(/^(?! \s)[a-zA-ZÀ-ÿ-' ]*$/g)) {
    errorDisplay('lastName', 'Le nom ne doit contenir ni caractères spéciaux ni chiffres.', false);
    lastName = null;
    isLastNameValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('lastName', '', true);
    lastName = value;
    isLastNameValid = true;
    console.info("NOM:", value);

    areAllBooleansValid();
  }
};

// Email : Filters the length and the validity of the email typed
const emailChecker = (value) => {
  // If length is not valid
  if ((value.length > 0 && value.length < 6) || value.length > 33) {
    errorDisplay('email', "L'email doit faire entre 6 et 33 caractères.", false);
    email = null;
    isEmailValid = false;
    areAllBooleansValid();
  }
  // If caracters are not valid
  else if (value.length > 0 && !value.match(/^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errorDisplay('email', 'Ce champ doit être valide au format email.', false);
    email = null;
    isEmailValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('email', '', true);
    email = value;
    isEmailValid = true;
    console.info("E-MAIL:", value);
    areAllBooleansValid();
  }
};

// MessageUser :Filters the length and the validity of the message typed
const messageUserChecker = (value) => {
  // If length is not valid (From 2 to 260 characters)
  if ((value.length > 0 && value.length < 2) || value.length > 261) {
    errorDisplay('messageUser', 'Le message doit faire 2 caractères mini et 260 caractères maxi.', false);
    messageUser = null;
    isMessageUserValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('messageUser', '', true);
    messageUser = value;
    isMessageUserValid = true;
    console.info("MESSAGE:", value);
    areAllBooleansValid();
  }
};

// End of functions for all the fields form //
////////////////////////////////////////////////////////////////////

///////////////
// LISTENERS //

/* Listener on the DOM, on form id="form-subscribe-tournament",
   prevent when action is submitting the form */
// document.getElementById('contact_form').addEventListener('submit', (event) => {
//   event.preventDefault();
// });

// Listener to open/Launch modal form
modalBtn.forEach((clickBtnLaunch) => clickBtnLaunch.addEventListener('click', launchModal));

// Listener to close modal form throught the button "Envoyer"
document.getElementById('firstModalBtnSubmit').addEventListener('click', closeModal);

// 3 LISTENERS FOR ALL THE FIELDS OF THE FORM //

/* Manages the values obtained for each field text typed by the user,
   getting the values of inputs ( text + text + email + text)
   by switch on each id */
inputsInFields.forEach((input) => {
  input.addEventListener('input', (element) => {
    switch (element.target.id) {
      case 'firstName':
        firstNameChecker(element.target.value);
        break;
      case 'lastName':
        lastNameChecker(element.target.value);
        break;
      case 'email':
        emailChecker(element.target.value);
        break;
      case 'messageUser':
        messageUserChecker(element.target.value);
        break;
      default:
        return 'error';
    }
  });
});

// End of the listeners //
//////////////////////////
