/**
 * Exodev React kit
 *
 * Copyright © 2016 Exodev, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getLogger } from 'domain/logger';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from 'theme';

const logger = getLogger('Renderer');

export default async function render() {
  const App = (await import('components/container/app')).App;
  ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('app'));
}

declare const module: {
  hot: {
    accept: (string, Function) => void;
  };
};

if (module.hot) {
  module.hot.accept('components/container/app', () => {
    logger.time('Hot update applied');
    render();
    logger.timeEnd('Hot update applied');
  });
}
