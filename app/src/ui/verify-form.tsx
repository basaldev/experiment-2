import React from 'react';

export function VerifyForm() {
  return (
    <form id="verification-code-form" action="#">
        <input className="mdl-textfield__input" type="text" id="verification-code" />
          <label className="mdl-textfield__label" >Enter the verification code...</label>
          <input type="submit" className="mdl-button mdl-js-button mdl-button--raised" id="verify-code-button" value="Verify Code" />
          <button className="mdl-button mdl-js-button mdl-button--raised" id="cancel-verify-code-button">Cancel</button>
      </form>
  )
}