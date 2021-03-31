// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "../Button";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  isBasic?: boolean;
  label?: React.ReactNode;
  iconNode?: any;
  onClick?: () => void | Promise<void>;
}

function Card({
  children,
  className = "",
  isBasic,
  label,
  iconNode,
  onClick
}: CardProps): React.ReactElement<CardProps> {
  const _onClick = useCallback(() => onClick && onClick(), [onClick]);

  return (
    <div className={`ui-card ${className} ${isBasic ? " isBasic" : ""}  `}>
      <Button className="ui--AccountStatus" icon={iconNode} onClick={_onClick} />
      <p>{label}</p>
      {children}
    </div>
  );
}

export default React.memo(styled(Card)`
  min-width: 308px;
  max-width: 308px;
  height: 152px;
  font-size: 12px;
  color: #ffffff;
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
      min-height: 48px;
      background: #fff;
      border-radius: 27px;
    }
  }

  &.pinkCard {
    background-image: linear-gradient(135deg, #c33379 0%, #ed449d 100%);
    margin-right: 20px;
  }

  &.greenCard {
    background-image: linear-gradient(135deg, #428a8b 0%, #58bbbd 100%);
  }
`);
