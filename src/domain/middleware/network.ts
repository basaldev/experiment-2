/*
 * Rakuten React kit
 *
 * Copyright © 2016 Rakuten, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getLogger } from 'domain/logger';
const logger = getLogger('Middleware/network');

function genQueryParams(params) {
  return Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
}


export function _fetch(url:string, options:any, queryParams:any) {
  if(queryParams) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + genQueryParams(queryParams);
  }
  return fetch(url, options);
}

const url =  `https://dialogflow-diagnose.now.sh/chat/`

export async function postMessage(message) {
  const r = await fetch(`${url}${message}`, { method: 'GET'})
  return r.json();
}