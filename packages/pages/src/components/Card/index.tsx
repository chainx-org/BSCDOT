// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0


import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from '@polkadot/react-components-chainx/Button';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  isBasic?: boolean;
  label?: React.ReactNode;
  iconNode?: any;
  onClick?: () => void | Promise<void>;
}

function Card({ children, className = '', isBasic, label, iconNode, onClick }: CardProps): React.ReactElement<CardProps> {
  const _onClick = useCallback(
    () => onClick && onClick(),
    [onClick]
  );

  return (
    <div
      className={`ui-card ${className} ${isBasic ? ' isBasic' : ''}  `}
    >
      <Button
        className='ui--AccountStatus'
        icon={iconNode}
        onClick={_onClick}
      />
      <p>{label}</p>
      {children}
    </div>
  );
}

export default React.memo(styled(Card)`

  min-width: 308px;
  height: 152px;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  // vertical-align: middle;
  border-radius: 10px;
  border: none;
  padding: 38px 37px;
  &.isBasic {

    .ui--AccountStatus {
      width: 196px;
      height: 48px;
      background: #fff;
      border-radius: 27px;
    }
  }

  &.pinkCard {
    background-image: linear-gradient(135deg, #C33379 0%, #ED449D 100%);
    margin-right: 20px;
  }

  &.greenCard {
    background-image: linear-gradient(135deg, #428A8B 0%, #58BBBD 100%);
  }


`);
