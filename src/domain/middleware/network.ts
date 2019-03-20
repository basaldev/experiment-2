import { getLogger } from 'domain/logger';
import { getUser } from 'domain/store/selectors/main';
import { firestore } from 'domain/firebase';
import { updateUserDocuments } from 'domain/store/reducers/main';
const logger = getLogger('Middleware/network');

function genQueryParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

export function _fetch(url: string, options: any, queryParams: any) {
  if (queryParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + genQueryParams(queryParams);
  }
  return fetch(url, options);
}

// const url = `http://localhost:3000/chat/`;
const url = `https://dialogflow-diagnose.now.sh/chat/`;

export async function postMessage(message) {
  const r = await fetch(`${url}${message}`, { method: 'GET' });
  return r.json();
}

export function getImages() {
  const userId = getUser().id;
  firestore
    .collection('userDocuments')
    .where('userId', '==', userId)
    .get()
    .then(querySnapshot => {
      const files = querySnapshot.docs.map(doc => doc.data());
      updateUserDocuments(files);
    });
}
