// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { ToolTipConfig } from './ToolTipConfig/ToolTipConfig';
import ALAYA from '@polkadot/react-components-chainx/ToolTipConfig/assets/alaya.svg';
import PLATON from '@polkadot/react-components-chainx/ToolTipConfig/assets/platon.svg';

interface EndpointProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    content?: string;
    iconNode?: any;
    btnLabel?: string;
    onClick?: () => void | Promise<void>;
}

export interface NetWorkInfo {
  title: string;
  iconUrl: unknown;
  polkadotNetUrl: string;
  platOnNetUrl: string;
}

const netWorkList: NetWorkInfo[] = [
  {
    title: 'Alaya 网络',
    iconUrl: ALAYA,
    polkadotNetUrl: 'wss://westend-rpc.polkadot.io',
    platOnNetUrl: 'http://127.0.0.1:6789'
  },
  {
    title: 'Platon 网络',
    iconUrl: PLATON,
    polkadotNetUrl: 'wss://rpc.polkadot.io',
    platOnNetUrl: ''
  }
];

function Endpoints({ children, className = '', content, title, iconNode, btnLabel, onClick }: EndpointProps): React.ReactElement<EndpointProps> {
  const [isEndpoints, setIsEndpoints] = useState<boolean>(false);
  const _toggleEndpoints = (): void => setIsEndpoints(true);

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
          label={btnLabel}
          onClick={_toggleEndpoints}
        />
      </div>
      {isEndpoints && (
        <ToolTipConfig
          isOpen={isEndpoints}
          setIsOpen={setIsEndpoints}
          list={netWorkList}
          listType='netWork'
        />
      )}
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
  margin: 0 0 0 20px;

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
