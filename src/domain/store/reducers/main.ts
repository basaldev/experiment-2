/*
 * Rakuten React kit
 *
 * Copyright © 2016 Rakuten, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getLogger } from 'domain/logger';
import { store, State, Page, Item } from 'domain/store/main';

const logger = getLogger('State');

export function updateCurrentPage(currentPage: Page) {
  logger.debug(`Update current page ${currentPage.name}`);
  return store.swap(oldState => ({ ...oldState, currentPage }));
}

export function updateInputText(inputText: string) {
  return store.swap(oldState => ({ ...oldState, inputText }));
}
export function updatesessionAttributes(sessionAttributes:any){
  logger.debug(`Update sessionAttributes `, sessionAttributes);
  return store.swap(oldState => ({
    ...oldState,
    sessionAttributes
  }));
}

export function updateChat(message:any){
  return store.swap(oldState => ({
    ...oldState,
    messages: [
    ...oldState.messages,
    message
  ]}));
}