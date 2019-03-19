/*
 * Rakuten React kit
 *
 * Copyright © 2016 Rakuten, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import page from 'page';

import { getLogger } from 'domain/logger';
import { updateCurrentPage } from 'domain/store/reducers/main';

type Context = { params: { name: string } };
type OnRoute = (ctx: Context) => void;

const logger = getLogger('Middleware/router');

function homeRouter(onRoute: OnRoute) {
  page('/', onRoute);
}
function secondRouter(onRoute: OnRoute) {
  page('/2', onRoute);
}
function thirdRouter(onRoute: OnRoute) {
  page('/3', onRoute);
}
function fourthRouter(onRoute: OnRoute) {
  page('/4', onRoute);
}

export default function startRouters() {

  homeRouter(ctx => {
    logger.debug('Home route');
    updateCurrentPage({ name: 'HOME_PAGE', value: 0 });
  });

  secondRouter(ctx => {
    logger.debug('Document route');
    updateCurrentPage({ name: 'SECOND_PAGE', value: 1 });
  });
  thirdRouter(ctx => {
    logger.debug('Document route');
    updateCurrentPage({ name: 'THIRD_PAGE', value: 2 });
  });
  fourthRouter(ctx => {
    logger.debug('Document route');
    updateCurrentPage({ name: 'FOURTH_PAGE', value: 3 });
  });

  page();
}

export function navigate(route:string, event:any){
  event.preventDefault();
  page(route)
}
