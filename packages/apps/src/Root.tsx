// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeDef } from '@polkadot/pages/components/types';
import type { KeyringStore } from '@polkadot/ui-keyring/types';

import React, { Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter } from 'react-router-dom';
import { Api } from '@polkadot/react-api';
import Queue from '@polkadot/pages/components/Status/Queue';
import settings from '@polkadot/ui-settings';
import Apps from './Apps';
import WindowDimensions from './WindowDimensions';
import { darkTheme, lightTheme } from './themes';
import { BSCAccountsProvider } from '@polkadot/pages/components/BSCAccountsProvider';
import { PolkadotAccountsProvider } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { NetWorkProvider } from '@polkadot/pages/components/NetWorkProvider';


interface Props {
  store?: KeyringStore;
}

function createTheme({uiTheme}: { uiTheme: string }): ThemeDef {
  return uiTheme === 'dark'
    ? darkTheme
    : lightTheme;
}

function Root({store}: Props): React.ReactElement<Props> {
  const [theme, setTheme] = useState(createTheme(settings));

  useEffect((): void => {
    settings.on('change', (settings) => setTheme(createTheme(settings)));
  }, []);

  return (
    <Suspense fallback='...'>
      <ThemeProvider theme={theme}>
        <Queue>
          <Api
            store={store}
            url={settings.apiUrl}
          >
            <NetWorkProvider>
              <PolkadotAccountsProvider>
                <BSCAccountsProvider>
                  <HashRouter>
                    <WindowDimensions>
                      <Apps/>
                    </WindowDimensions>
                  </HashRouter>
                </BSCAccountsProvider>
              </PolkadotAccountsProvider>
            </NetWorkProvider>
          </Api>
        </Queue>
      </ThemeProvider>

    </Suspense>
  );
}

export default React.memo(Root);
