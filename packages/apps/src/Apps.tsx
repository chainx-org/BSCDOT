import type { BareProps as Props, ThemeDef, ThemeProps } from '@polkadot/pages/components/types';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import WarmUp from './WarmUp';
import Contents from '@polkadot/pages';
import Sidebars from '@polkadot/pages/components/SideBar';
import Status from './Status';


function Apps({className = ''}: Props): React.ReactElement<Props> {
  const {theme} = useContext<ThemeDef>(ThemeContext);

  return (
    <>
      <div className={`apps--Wrapper theme--${theme} ${className}`}>
        <Sidebars/>
        <div className="main">
          <Contents/>
        </div>
        <Status/>
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
