// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0


import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from './Button';
// import Icon from '@polkadot/react-components/Icon';

interface EndpointProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    content?: string;
    iconNode?: any;
    btnlabel?: string;
    onClick?: () => void | Promise<void>;
}


function Endpoints({ children, className = '', content, title, iconNode, btnlabel, onClick }: EndpointProps): React.ReactElement<EndpointProps> {
  const _onClick = useCallback(
    () => onClick && onClick(),
    [onClick]
  );

  return (
    <div className={`isBasic ${className}`} >
      <div className='leftIcon'>
        <img src={iconNode} alt={iconNode} />
      </div>
      <div className='rightCon'>
        <div className='title'>{title}</div>
        <p className='tabEndpoints'>{content}</p>
        <Button
          className='ui-tabEndpoint'
          isBasic
          label={btnlabel}
          onClick={_onClick}
        />
      </div>
      {children}
    </div>
  );
}

export default React.memo(styled(Endpoints)`

  min-width: 308px;
  height: 152px;
  color: #FFFFFF;
  background: transparent;
  border-radius: 10px;
  border: none;
  padding: 20px 0 0 22px;
  margin: 20px 0;

  &.isBasic {
    display: flex;
  }

  .rightCon {
    display: flex;
    flex-direction: column;
    margin-left: 22px;
    .title {
        font-size: 16px;
        margin-bottom: 6px;
    }
    .tabEndpoints {
        font-size: 20px;
        margin-bottom: 20px;
    }
    .ui-tabEndpoint {
      width: 88px;
      height: 36px;
    }
  
  }

  &.blueCard {
    background-image: linear-gradient(-45deg, #45B2EA 0%, #2394CE 100%);
  }
 
`);
