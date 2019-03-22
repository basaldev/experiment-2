import { getLogger } from 'domain/logger';
import {
  updateChat,
  updateCurrentUser,
  updateMyDoctor,
  updateInputText,
  updateSnackbarContent,
  updateDiagnosis,
  updateTreatment,
  updateSnackbarVisible,
  updateCurrentPage,
  updateCurrentPatient
} from 'domain/store/reducers/main';
import { getDoctors, getUser } from 'domain/store/selectors/main';
import { DianosesCard } from 'components/presentational/diagnoses-card';
import { Bubble } from 'components/presentational/bubble';
import { postMessage, getImages } from 'domain/middleware/network';
import { firestore } from 'domain/firebase';
import * as filestack from 'filestack-js';
import page from 'page';
import { v4 as uuid } from 'uuid';

const logger = getLogger('Middleware/user');

export function saveDoctor(doctor: object) {
  updateMyDoctor(doctor);
  page('/actions');
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
  const zeroOneOrTwo = Math.floor(Math.random() * 3); // temporary - get random doctor of the 3 hardcoded ones
  const doctor = getDoctors()[zeroOneOrTwo];
  const newDiagnosis = {
    id: uuid(),
    issue,
    doctor
  };
  updateDiagnosis(newDiagnosis);
  page('/diagnose');
}

export function saveTreatment(diagnosis: object, doctor: object, patient: object, prescription: string) {
  const newTreatment = {
    id: uuid(),
    diagnosis,
    doctor,
    patient,
    prescription
  };
  updateTreatment(newTreatment);
}

export function showResponse(botResponse) {
  const result = normalizeBotResponse(botResponse.result.fulfillment.speech);

  if (typeof result === 'object') {
    updateChat({
      content: Bubble(`Here are some possible diagnoses:`),
      showSpeaker: true,
      direction: 'row',
      speaker: 'BOT'
    });
    updateChat({
      content: DianosesCard(result, true),
      showSpeaker: false,
      direction: 'row',
      speaker: 'BOT'
    });
  } else {
    updateChat({
      content: Bubble(botResponse.result.fulfillment.speech),
      showSpeaker: true,
      direction: 'row',
      speaker: 'BOT'
    });
  }
}

export function pushChat(textString, lexruntime, sessionAttributes) {
  updateChat({
    content: Bubble(textString),
    showSpeaker: true,
    direction: 'row-reverse',
    speaker: 'USER'
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
        region: 'us-east-1'
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
            userId: id
          })
          .then(docRef => {
            getImages();
            updateSnackbarContent('Document scanned and saved to Database');
            updateSnackbarVisible(true);
          })
          .catch(error => {
            console.log('Couldn’t add doc: ', error);
          });
      }
    })
    .open();
}

export function onCloseSnackbar() {
  updateSnackbarVisible(false);
}

export function onChangeCurrentUser(user) {
  console.log(user);
  updateCurrentUser(user);
  onUserLogin(user);

}

export function onUserLogin(user){
  switch (user.role) {
    case "DOCTOR":
      page('/doctor');
      break;
    default:
      page('/');
      break;
  }
}

export function onClickViewPatient(user){
  updateCurrentPatient(user);
  page(`/patient/${user.id}`);
}