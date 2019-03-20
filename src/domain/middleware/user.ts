/*
 * Exodev React kit
 *
 * Copyright © 2016 Exodev, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getLogger } from 'domain/logger';
<<<<<<< HEAD
import { updateChat, updateMyDoctor, updateInputText, updatesessionAttributes, updateDiagnosis } from 'domain/store/reducers/main';
import { getDoctors } from 'domain/store/selectors/main';
import { DiagnosesCard } from 'components/presentational/diagnoses-card';
=======
import {
  updateChat,
  updateCurrentUser,
  updateMyDoctor,
  updateInputText,
  updateSnackbarContent,
  updateDiagnosis,
  updateSnackbarVisible,
} from 'domain/store/reducers/main';
import { getDoctors, getUser } from 'domain/store/selectors/main';
import { DianosesCard } from 'components/presentational/dianoses-card';
>>>>>>> 88c752fa76f7c66ffc6df38e4e53de56f1d4188f
import { Bubble } from 'components/presentational/bubble';
import { postMessage, getImages } from 'domain/middleware/network';
import { firestore } from 'domain/firebase';
import * as filestack from 'filestack-js';
import page from 'page';
const logger = getLogger('Middleware/user');

export function saveDoctor(doctor: object) {
  updateMyDoctor(doctor);
  page('/4');
}

function normalizeBotResponse(message: string) {
  try {
    const result = JSON.parse(message);
    return result;
  } catch (error) {
    return message;
  }
}

export function saveDianoses(issue: object) {
  //find doctor
  const doctor = getDoctors()[0];
  const newDiagnosis = {
    issue,
    doctor,
  };
  updateDiagnosis(newDiagnosis);
}

//create react app
export function showResponse(botResponse) {
  // debugger
  const result = normalizeBotResponse(botResponse.result.fulfillment.speech);

  if (typeof result === 'object') {
    updateChat({
      content: Bubble(`Here are some possible diagnosis`),
      showSpeaker: true,
      direction: 'row',
      speaker: 'BOT',
    });
    updateChat({
      content: DiagnosesCard(result, true),
      showSpeaker: false,
      direction: 'row',
      speaker: 'BOT',
    });
  } else {
    updateChat({
      content: Bubble(botResponse.result.fulfillment.speech),
      showSpeaker: true,
      direction: 'row',
      speaker: 'BOT',
    });
  }
}

export function pushChat(textString, lexruntime, sessionAttributes) {
  updateChat({
    content: Bubble(textString),
    showSpeaker: true,
    direction: 'row-reverse',
    speaker: 'USER',
  });
  postMessage(textString).then(resp => {
    showResponse(resp);
  });
}

export function onKeyPressUpdateInputText(e) {
  updateInputText(e.target.value);
  return e.target;
}

export function scrollbottom(container) {
  container.scrollTop = container.scrollHeight;
}

export function onClickUploadDocument(event) {
  const client = filestack.init('AWc0bpovCRWqA1MDqiKU1z');
  client
    .picker({
      maxFiles: 20,
      uploadInBackground: false,
      onOpen: () => console.log('opened'),
      storeTo: {
        container: 'devportal-customers-assets',
        path: 'user-uploads/',
        region: 'us-east-1',
      },
      onUploadDone: (res: any) => {
        const { id } = getUser();
        const { mimetype, url, handle, filename } = res.filesUploaded[0];
        firestore
          .collection('userDocuments')
          .add({
            filestackId: handle,
            mimetype,
            url,
            name: filename,
            userId: id,
          })
          .then(docRef => {
            getImages();
            updateSnackbarContent('Document scanned and saved to Database');
            updateSnackbarVisible(true);
          })
          .catch(error => {
            console.log('Couldnt add doc: ', error);
          });
      },
    })
    .open();
}

export function onCloseSnackbar() {
  updateSnackbarVisible(false);
}

export function onChangeCurrentUser(user) {
  console.log(user);
  updateCurrentUser(user);
  page('/');
}
