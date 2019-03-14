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
  page('', onRoute);
}
function documentsRouter(onRoute: OnRoute) {
  page('/docs', onRoute);
}
function historyRouter(onRoute: OnRoute) {
  page('/history', onRoute);
}

export default function startRouters() {

  homeRouter(ctx => {
    logger.debug('Home route');
    updateCurrentPage({ name: 'HOME_PAGE' });
  });

  documentsRouter(ctx => {
    logger.debug('Document route');
    updateCurrentPage({ name: 'DOCUMENTS_PAGE' });
  });
  historyRouter(ctx => {
    logger.debug('Document route');
    updateCurrentPage({ name: 'HISTORY_PAGE' });
  });

  page();
}

export function navigate(route:string, event:any){
  event.preventDefault();
   page(route)
}
