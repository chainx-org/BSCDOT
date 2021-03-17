// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BareProps as Props, ThemeDef, ThemeProps } from '@polkadot/react-components/types';

import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
// import AccountSidebar from '@polkadot/app-accounts-chainx/Sidebar';
import { getSystemChainColor } from '@polkadot/apps-config';
import GlobalStyle from '@polkadot/react-components-chainx/styles';
import { useApi } from '@polkadot/react-hooks';
import Signer from '@polkadot/react-signer';
import ConnectingOverlay from './overlays/Connecting';
import WarmUp from './WarmUp';
import Contents from '@polkadot/pages';
import Sidebars from '@polkadot/pages/components/SideBar';
import Header from '@polkadot/pages/components/Header';
import { ToolTipConfig } from '@polkadot/react-components-chainx/ToolTipConfig/ToolTipConfig';
export const PORTAL_ID = 'portals';

function Apps ({ className = '' }: Props): React.ReactElement<Props> {
  const { theme } = useContext<ThemeDef>(ThemeContext);
  const { systemChain, systemName } = useApi();

  const uiHighlight = useMemo(
    () => getSystemChainColor(systemChain, systemName),
    [systemChain, systemName]
  );

  return (
    <>
      <GlobalStyle uiHighlight={uiHighlight} />
      <div className={`apps--Wrapper theme--${theme} ${className}`}>
          <Signer>
            <Sidebars />
            <div className="main">
            <Header />
            <Contents />
            </div>
          </Signer>
          <ConnectingOverlay />
          <div id={PORTAL_ID} />
      </div>
      <WarmUp />
      {/* <ToolTipConfig /> */}
    </>
  );
}

export default React.memo(styled(Apps)(({ theme }: ThemeProps) => `
  background: ${theme.bgPage};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  // flex-direction: column;
  min-height: 100vh;
  .main{
    display: block;
  }
`));
