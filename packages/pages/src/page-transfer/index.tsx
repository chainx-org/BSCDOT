// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Icon, Records, StatusContext } from '@polkadot/pages/components';
import { PlatonAccountsContext } from '@polkadot/pages/components/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import PdotNodata from '../components/PdotCards/PdotNodata';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';
import { useTranslation } from '../components/translate';
import Card from '@polkadot/pages/components/Card/Card';
import {
  AddressJudge,
  AmountAndAddress,
  Content,
  Title,
  TransfersCard
} from '@polkadot/pages/components/PdotCards/components';
import InputDex from '@polkadot/pages/components/Input/InputDex';
import Input from '@polkadot/pages/components/Input/Input';
import Button from '@polkadot/pages/components/Button';
import { createTransferTransactionParameters } from '@polkadot/pages/contract';
import { creatStatusInfo } from '@polkadot/pages/helper/helper';
import { ActionStatus } from '@polkadot/pages/components/Status/types';

interface Props {
  className?: string;
}

export default function TransferContent({className}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const {hasPlatonAccount, Transfers} = useContext(PlatonAccountsContext);
  const {hasAccounts} = useContext(PolkadotAccountsContext);
  const transferLength = Transfers.length;
  const [warning, setWarning] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const status = {action: 'transfer'} as ActionStatus;
  const {platonUnit, netName} = useContext(NetWorkContext);
  const {platonAccount, fetchTransfers} = useContext(PlatonAccountsContext);
  const {queueAction} = useContext(StatusContext);
  const [targetAddress, setTargetAddress] = useState<string>('');

  const confirmTransfer = () => {
    if (platonAccount && amount && targetAddress) {
      try {
        setWarning('');
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createTransferTransactionParameters(platonAccount, amount, targetAddress)]
        })
          .then(result => {
            creatStatusInfo(status, 'success', `${t('Transaction hash')}: ${result}`);
            queueAction(status as ActionStatus);
            fetchTransfers(platonAccount);
          })
          .catch(error => {
            creatStatusInfo(status, 'error', error.message);
            queueAction(status as ActionStatus);
          });

      } catch (err) {
        setWarning(err.coderType);
        console.log(err);
      }
    }
  };

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      {hasPlatonAccount && hasAccounts ?
        <Card className="left" title={`${platonUnit} ${t('Transfer')}`}>
          <Content className="pdotContent">
            <TransfersCard className={`ui-Transfers`}>
              <AmountAndAddress className='amountTit'>{t('Number of transfers')}</AmountAndAddress>
              <AddressJudge>
                <InputDex className='bgcolor' tokenName={platonUnit}
                          placeholder={t('Enter the number of {{platonUnit}}', {replace: {platonUnit}})}
                          onChange={setAmount}/>
                {warning === 'uint256' ? <Icon icon='times' className='warning redColor' size='2x'/> : null}
              </AddressJudge>
              <AmountAndAddress className='addressTit'>{t('Receiving address')}</AmountAndAddress>
              <AddressJudge className='judge'>
                <Input className='bgcolor iptAddress'
                       placeholder={t('Enter the {{netName}} destination account address', {replace: {netName}})}
                       onChange={setTargetAddress}/>
                {warning === 'address' ? <Icon icon='times' className='warning redColor' size='2x'/> : null}
              </AddressJudge>
              <Button className="isConfirm" onClick={confirmTransfer} text={t('Confirm Transfer')}/>
            </TransfersCard>
          </Content>
        </Card>
        : <PdotNodata title={`${platonUnit} ${t('Transfer')}`}
                      noDataMsg={t('Please login to your Polkadot and PlatON accounts first')}/>
      }
      <Records className="right" title={t('Transfer record')} records={Transfers} recordLength={transferLength}
               arrows={false}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .left{
    width: 636px;
  }
  .right{
    width: 308px;
  }
`;
