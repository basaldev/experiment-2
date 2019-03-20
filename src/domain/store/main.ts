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

export type HomePage = { name: 'HOME_PAGE', value: 0 };
export type SecondPage = { name: 'SECOND_PAGE', value: 1 };
export type ThirdPage = { name: 'THIRD_PAGE', value: 2 };
export type FourthPage = { name: 'FOURTH_PAGE', value: 3 };

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
  myDoctors: Array<any>;
  loading: boolean;
  inputText:string;
  sessionAttributes: any;
};

const defaultState: State = {
  currentPage: { name: 'HOME_PAGE', value: 0 },
  allItems: [],
  filteredItems: [],
  messages: [  {
    content: Bubble('Hello, I am here to help! Can you tell me your symptoms?'),
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
  myDoctors: [],
  doctors: [{
    img: `https://images.unsplash.com/photo-1523350774557-359d2ca68f2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80`,
    name: 'Joseph Lister',
    specialisationId: 31,
    covered: true
  },
  {
    img: `https://images.unsplash.com/photo-1543165365-07232ed12fad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80`,
    name: 'Henry Gray',
    specialisationId: 95,
    covered: false
  },
  {
    img: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
    name: 'Jonas Salk',
    specialisationId: 15,
    covered: false
  }],
  loading: true,
  sessionAttributes: {}
};

export const store = createAtom(defaultState);
