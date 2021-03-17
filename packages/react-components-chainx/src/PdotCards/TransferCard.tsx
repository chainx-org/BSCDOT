// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import InputDex from '../InputDex';
import Button from "@polkadot/react-components-chainx/Button";

interface PdotcardProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    amount?: number;
    isBasic?: boolean;
 
}


function TransferCard({ children, className = '',title, amount, isBasic }: PdotcardProps): React.ReactElement<PdotcardProps> {


  return (
    <div className={`ui-Transfers ${className}`}>
      <p className={`amountTit  `}>转账数量</p>
      <InputDex className='bgcolor' tokenName={'PDOT'}  placeholder='输入 PDOT 数量' />
      <p className={`addressTit  `}>接收地址</p>
      <Input className='bgcolor iptAddress' placeholder='输入 Platon 目标账户地址' />
      <Button className="isConfirm">确定转账</Button>
    </div>
  );
}

export default React.memo(styled(TransferCard)`

  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px;
  font-size: 12px;
  .bgcolor {
    background: #F2F3F4;
    border-radius: 4px;
    margin-bottom: 16px;
    input {
      background: #F2F3F4;
      padding: 15px;
      &:focus {
        background: #F2F3F4;
        border: 1px solid #DCE0E2;
      }
    }
  }
  .amountTit, .addressTit {
    margin-bottom: 12px;
  }
  .amountTit {
    color: #444C5E;
  }
  .addressTit {
    color: #3F3F3F;
  }

  .isConfirm {
    margin-top: 20px;
  }

`);
