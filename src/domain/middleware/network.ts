/*
 * Exodev React kit
 *
 * Copyright © 2016 Exodev, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

const url = `http://localhost:3000/chat/`;

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
