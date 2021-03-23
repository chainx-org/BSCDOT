// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, {useContext, useState} from 'react';
import { Wrapper, Title, Content, TransfersCard, AmountAndAddress } from './components/index'
import Input from '../Input';
import InputDex from '../InputDex';
import Button from "@polkadot/react-components-chainx/Button";
import {createTransferTransactionParameters} from '@polkadot/pages/contract';
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';

interface PdotCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}


export default function TransferCard({ children, className = '',title }: PdotCardProps): React.ReactElement<PdotCardProps> {
  const [amount, setAmount] = useState<string>('')
  const [targetAddress, setTargetAddress] = useState<string>('')
  const {platonAccount} = useContext(PlatonAccountsContext)

  const confirmTransfer = () => {
    if(platonAccount && amount && targetAddress){
      try{
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createTransferTransactionParameters(platonAccount, parseInt(amount), targetAddress)]
        }).then((result: any) => console.log((result)));
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <Wrapper className={`ui-card ${className} `}>
      <Title className={`ui-card-title  `}>{title}</Title>
      <Content className="pdotCon">
        <TransfersCard className={`ui-Transfers `}>
          <AmountAndAddress className='amountTit'>转账数量</AmountAndAddress>
          <InputDex className='bgcolor' tokenName={'PDOT'}  placeholder='输入 PDOT 数量' onChange={setAmount}/>
          <AmountAndAddress className='addressTit'>接收地址</AmountAndAddress>
          <Input className='bgcolor iptAddress' placeholder='输入 Platon 目标账户地址' onChange={setTargetAddress}/>
          <Button className="isConfirm" onClick={confirmTransfer}>确定转账</Button>
        </TransfersCard>
      </Content>
    </Wrapper>
  );
}

