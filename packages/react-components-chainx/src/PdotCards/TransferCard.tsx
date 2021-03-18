// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import InputDex from '../InputDex';
import Button from "@polkadot/react-components-chainx/Button";
import {createTransferTransactionParameters} from '@polkadot/pages/contract';

interface PdotCardProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    isBasic?: boolean;
}


function TransferCard({ children, className = '',title, isBasic }: PdotCardProps): React.ReactElement<PdotCardProps> {
  const [amount, setAmount] = useState<string>('')
  const [targetAddress, setTargetAddress] = useState<string>('')

  const confirmTransfer = () => {
    if(alaya.selectedAddress && amount && targetAddress){
      console.log(amount, targetAddress)
      try{
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createTransferTransactionParameters(alaya.selectedAddress, parseInt(amount), targetAddress)]
        }).then((result: any) => console.log((result)));
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className={`ui-Transfers ${className}`}>
      <p className={`amountTit  `}>转账数量</p>
      <InputDex className='bgcolor' tokenName={'PDOT'}  placeholder='输入 PDOT 数量' onChange={setAmount}/>
      <p className={`addressTit  `}>接收地址</p>
      <Input className='bgcolor iptAddress' placeholder='输入 Platon 目标账户地址' onChange={setTargetAddress}/>
      <Button className="isConfirm" onClick={confirmTransfer}>确定转账</Button>
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
