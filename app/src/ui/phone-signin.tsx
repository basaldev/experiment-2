import React from 'react';
import firebase from 'firebase';

function onSignOutClick() {
  firebase.auth().signOut();
}
export class PhoneSignIn extends React.Component<any, any> {
  constructor(props: any){
    super(props);
}

  render() {
    return (
    <div>
      <form id="sign-in-form" action="#">
        <input className="mdl-textfield__input" type="text" pattern="\+[0-9\s\-\(\)]+" id="phone-number" />
        <label className="mdl-textfield__label" >Enter your phone number...</label>
        <span className="mdl-textfield__error">Input is not an international phone number!</span>
        <button onSubmit={this.props.submitForm} className="mdl-button mdl-js-button mdl-button--raised" id="sign-in-button">Sign-in</button>
      </form>
      <button className="mdl-button mdl-js-button mdl-button--raised" id="sign-out-button" onClick={onSignOutClick}>Sign-out</button>
    </div>
  )}
}