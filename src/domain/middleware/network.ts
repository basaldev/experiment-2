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


// const botId = `5400840e-7191-48f2-ad8b-e9240e452fdf`
// const url = `https://console.dialogflow.com/api-client/demo/embedded/${botId}/demoQuery`
// const query = `?q=${message}&sessionId=6e2c1c6b-223d-dbf1-1410-2b5d4d3d45b9`;
// const url = `https://rectangular-fender.glitch.me/${botId}/`
const url =  `https://rectangular-fender.glitch.me/chat/`

export async function postMessage(message): any {
  const r = await fetch(`${url}${message}`, { method: 'GET'})
  return r.json();
}