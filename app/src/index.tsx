import React from 'react'
import ReactDOM from 'react-dom';
import firebase, { initializeApp } from 'firebase'
import { PhoneSignIn } from 'ui/phone-signin';
import { VerifyForm } from 'ui/verify-form';
import { updateSignedInStatus } from 'domain/user/login';

const app = initializeApp({
  apiKey: "AIzaSyDBi-zg9xiry5_Mhs1nsVHpzBtSuyyUIX4",
  authDomain: "edge-1-794d6.firebaseapp.com",
  databaseURL: "https://edge-1-794d6.firebaseio.com",
  projectId: "edge-1-794d6",
  storageBucket: "edge-1-794d6.appspot.com",
  messagingSenderId: "516826054878"
});
const firestore = firebase.firestore(app);
let recaptchaVerifier;
window.onload = function () {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var uid = user.uid;
      var email = user.email;
      var photoURL = user.photoURL;
      var phoneNumber = user.phoneNumber;
      var isAnonymous = user.isAnonymous;
      var displayName = user.displayName;
      var providerData = user.providerData;
      var emailVerified = user.emailVerified;
    }
    updateSignInFormUI();
    updateSignedInStatus(firestore);
  });
  // Event bindings.
  document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
  document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);
  // [START appVerifier]
  recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': function (response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  });
  // [END appVerifier]
  recaptchaVerifier.render().then(function (widgetId) {
    window['recaptchaWidgetId'] = widgetId;
  });
};
/**
 * Function called when clicking the Login/Logout button.
 */
function onSignInSubmit() {
    window['signingIn'] = true;
    var phoneNumber = getPhoneNumberFromUserInput();
    var appVerifier = recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window['confirmationResult'] = confirmationResult;
        window['signingIn'] = false;
        updateSignInFormUI();
      }).catch(function (error) {
        // Error; SMS not sent
        console.error('Error during signInWithPhoneNumber', error);
        window.alert('Error during signInWithPhoneNumber:\n\n'
          + error.code + '\n\n' + error.message);
        window['signingIn'] = false;
        updateSignInFormUI();
      });
}
/**
 * Function called when clicking the "Verify Code" button.
 */
function onVerifyCodeSubmit(e) {
  e.preventDefault();
  if (!!getCodeFromUserInput()) {
    window['verifyingCode'] = true;
    var code = getCodeFromUserInput();
    confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      window['verifyingCode'] = false;
      window['confirmationResult'] = null;
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      console.error('Error while checking the verification code', error);
      window.alert('Error while checking the verification code:\n\n'
        + error.code + '\n\n' + error.message);
      window['verifyingCode'] = false;
    });
  }
}
/**
 * Cancels the verification code input.
 */
function cancelVerification(e) {
  e.preventDefault();
  window['confirmationResult'] = null;
  updateSignInFormUI();
}
/**
 * Signs out the user when the sign-out button is clicked.
 */

/**
 * Re-initializes the ReCaptacha widget.
 */
function resetReCaptcha() {
  if (typeof grecaptcha !== 'undefined'
    && typeof window['recaptchaWidgetId'] !== 'undefined') {
    grecaptcha.reset(window['recaptchaWidgetId']);
  }
}
/**
 * Updates the state of the Sign-in form.
 */
function updateSignInFormUI() {
  if (firebase.auth().currentUser || window['confirmationResult']) {
  } else {
    resetReCaptcha();
  }
}


/**
 * Updates the Signed in user status panel.
 */


ReactDOM.render(
  <div>
    <PhoneSignIn
      submitForm={onVerifyCodeSubmit}
      disabledSignInButton={false}
    />
    <VerifyForm />
  </div>,
  document.getElementById('root')
)