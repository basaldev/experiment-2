/*
 * Rakuten React kit
 *
 * Copyright © 2016 Rakuten, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getLogger } from 'domain/logger';
import { updateChat, updateMyDoctor, updateInputText, updatesessionAttributes, updateDiagnosis } from 'domain/store/reducers/main';
import { getDoctors } from 'domain/store/selectors/main';
import { DianosesCard } from 'components/presentational/dianoses-card';
import { Bubble } from 'components/presentational/bubble';
import { postMessage } from 'domain/middleware/network';
import page from 'page';
const logger = getLogger('Middleware/user');

export function saveDoctor(doctor: object) {
  updateMyDoctor(doctor);
  page('/4');
}

function normalizeBotResponse(message: string) {
  return JSON.parse(message);
}

export function saveDianoses(issue: object) {
  //find doctor
  const doctor = getDoctors()[0];
  const newDiagnosis = {
    issue,
    doctor
  }
  updateDiagnosis(newDiagnosis);
}

//create react app
export function showResponse(botResponse) {
  debugger
  updateChat({
    content: Bubble(botResponse.result.fulfillment.speech),
    showSpeaker: true,
    direction: 'row',
    speaker: 'BOT'
  },
  );
}


export function pushChat(textString, lexruntime, sessionAttributes) {
  const params = {
    botAlias: '$LATEST',
    botName: 'Tere',
    inputText: textString,
    userId: 'tere-thursday',
    sessionAttributes: sessionAttributes
  };
  ;
  updateChat({
    content: Bubble(textString),
    showSpeaker: true,
    direction: 'row-reverse',
    speaker: 'USER'
  });
  postMessage(textString).then(resp => {
    showResponse(resp);
  })
}

export function onKeyPressUpdateInputText(e) {
  updateInputText(e.target.value)
  return e.target;
}

export function scrollbottom(container) {
  container.scrollTop = container.scrollHeight;
}
