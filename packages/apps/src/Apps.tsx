// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BareProps as Props, ThemeDef, ThemeProps } from '@polkadot/react-components/types';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Signer from '@polkadot/react-signer';
import WarmUp from './WarmUp';
import Contents from '@polkadot/pages';
import Sidebars from '@polkadot/pages/components/SideBar';
import Status from './Content/Status';


function Apps({className = ''}: Props): React.ReactElement<Props> {
  const {theme} = useContext<ThemeDef>(ThemeContext);

  return (
    <>
      <div className={`apps--Wrapper theme--${theme} ${className}`}>
        <Signer>
          <Sidebars/>
          <div className="main">
            <Contents/>
          </div>
          <Status/>
        </Signer>
      </div>
      <WarmUp/>
    </>
  );
}

export default React.memo(styled(Apps)(({theme}: ThemeProps) => `
  background: ${theme.bgPage};
  box-sizing: border-box;
  display: flex;
  // justify-content: space-between;
  box-sizing: border-box;
  // flex-direction: column;
  min-height: 100vh;

  .main{
    width: fit-content;
    margin: 0 auto;
  }
`));
