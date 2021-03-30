// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, {useContext, useState} from 'react';
import {Wrapper, Title, Content, TransfersCard, AmountAndAddress, Addressjudge} from './components';
import {createTransferTransactionParameters} from '@polkadot/pages/contract';
import {PlatonAccountsContext} from '@polkadot/pages/components/PlatonAccountsProvider';
import {creatStatusInfo} from '@polkadot/pages/helper/helper';
import {ActionStatus} from '@polkadot/pages/components/Status/types';
import {Icon, StatusContext} from '@polkadot/pages/components';
import Button from '../Button';
import InputDex from '../Input/InputDex';
import Input from '../Input/Input';
import useTokenTransferList from '@polkadot/pages/hooks/useTransferList';

interface PdotCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}


export default function TransferCard({children, className = '', title}: PdotCardProps): React.ReactElement<PdotCardProps> {
  const [amount, setAmount] = useState<string>('');
  const [warning, setWarning] = useState<boolean>(false);
  const [targetAddress, setTargetAddress] = useState<string>('');
  const {platonAccount} = useContext(PlatonAccountsContext);
  const status = {action: 'transfer'} as ActionStatus;
  const {queueAction} = useContext(StatusContext);

  const confirmTransfer = () => {
    if (platonAccount && amount && targetAddress) {
      try {
        setWarning(false)
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createTransferTransactionParameters(platonAccount, amount, targetAddress)]
        })
          .then(result => {
            creatStatusInfo(status, 'success',`交易哈希: ${result}`);
            queueAction(status as ActionStatus);
            useTokenTransferList(platonAccount)
          })
          .catch(error => {
            creatStatusInfo(status, 'error', error.message);
            queueAction(status as ActionStatus);
          });

      } catch (err) {
        setWarning(true)
        console.log(err);
      }
    }
  };

  return (
    <Wrapper className={`ui-card ${className} `}>
      <Title className={`ui-card-title  `}>{title}</Title>
      <Content className="pdotCon">
        <TransfersCard className={`ui-Transfers `}>
          <AmountAndAddress className='amountTit'>转账数量</AmountAndAddress>
          <InputDex className='bgcolor' tokenName={'PDOT'} placeholder='输入 PDOT 数量' onChange={setAmount}/>
          <AmountAndAddress className='addressTit'>接收地址</AmountAndAddress>
          <Addressjudge>
            <Input className='bgcolor iptAddress' placeholder='输入 Platon 目标账户地址' onChange={setTargetAddress}/>
            { warning ? <Icon icon='times' className='warning redColor' size='2x' /> : null }
          </Addressjudge>
          <Button className="isConfirm" onClick={confirmTransfer} text="确定转账" />
        </TransfersCard>
      </Content>
    </Wrapper>
  );
}

