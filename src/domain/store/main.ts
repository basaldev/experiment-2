/*
 * Rakuten React kit
 *
 * Copyright © 2016 Rakuten, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createAtom } from 'js-atom';
import { Bubble } from 'components/presentational/bubble';

export type HomePage = { name: 'HOME_PAGE' };

export type DocumentsPage = { name: 'DOCUMENTS_PAGE' };
export type HistoryPage = { name: 'HISTORY_PAGE' };


export type Page = HomePage | DocumentsPage | HistoryPage;

export type Item = { name: string; url: string };

export type State = {
  currentPage: Page;
  allItems: Array<Item>;
  filteredItems: Array<Item>;
  messages: Array<any>;
  documents: Array<any>;
  loading: boolean;
  inputText:string;
  sessionAttributes: any;
};

const defaultState: State = {
  currentPage: { name: 'HOME_PAGE' },
  allItems: [],
  filteredItems: [],
  messages: [  {
    content: Bubble('Hi, How can I help you today?'),
    showSpeaker: true,
    direction: 'row',
    speaker: 'BOT'
  }],
  inputText: '',
  documents: [],
  loading: true,
  sessionAttributes: {}
};

export const store = createAtom(defaultState);
