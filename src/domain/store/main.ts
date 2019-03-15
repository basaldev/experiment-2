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
export type SecondPage = { name: 'SECOND_PAGE' };
export type ThirdPage = { name: 'THIRD_PAGE' };
export type FourthPage = { name: 'FOURTH_PAGE' };

export type Page = HomePage | SecondPage | ThirdPage | FourthPage;

export type Item = { name: string; url: string };

export type State = {
  currentPage: Page;
  allItems: Array<Item>;
  filteredItems: Array<Item>;
  messages: Array<any>;
  documents: Array<any>;
  dianosis: Array<any>;
  doctors: Array<any>;
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
  documents: [
    {
      type: 'data',
      img: `https://picsum.photos/200/300/?random`,
      title: 'Image',
      cols: 3,
    },
    {
      type: 'document',
      img: `https://picsum.photos/500/200/?random`,
      title: 'Image',
      cols: 1,
    },
    {
      type: 'document',
      img: `https://picsum.photos/430/470/?random`,
      title: 'Image',
      cols: 2,
    },
    {
      img: `https://picsum.photos/100/300/?random`,
      title: 'Image',
      cols: 3,
    },
    {
      type: 'data',
      img: `https://picsum.photos/900/200/?random`,
      title: 'Image',
      cols: 1,
    },
    {
      img: `https://picsum.photos/450/454/?random`,
      title: 'Image',
      cols: 2,
    },
    {
      img: `https://picsum.photos/450/454/?random`,
      title: 'Image',
      cols: 2,
    },
  ],
  dianosis: [],
  doctors: [{
    img: `https://picsum.photos/450/454/?random`,
    title: 'Image',
    cols: 2,
  }],
  loading: true,
  sessionAttributes: {}
};

export const store = createAtom(defaultState);
