// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useContext, useState} from 'react';
import styled from "styled-components";
// import { useTranslation } from '../translate';
import { Records } from "@polkadot/react-components-chainx/Records";
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';
import PdotNodata from '@polkadot/react-components-chainx/PdotCards/PdotNodata';
import PublishAndRedeemCard from '@polkadot/react-components-chainx/PdotCards/PublishAndRedeemCard';
import {StatusContext} from '@polkadot/react-components';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import {creatStatusInfo} from '@polkadot/pages/helper/helper';
import { createDepositTransactionParameters } from '../contract';

interface Props {
  className?: string;
}

export default function RedeemContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  const {hasAccounts, currentAccount } = useContext(PolkadotAccountsContext);
  const {platonAccount, hasPlatonAccount,RedreemRecords} = useContext(PlatonAccountsContext)
  const redreemLength = RedreemRecords.length
  const [amount, setAmount] = useState<string>('')
  const {queueAction} = useContext(StatusContext);
  const status = {action: 'redeem'} as ActionStatus;

  const redeem = () => {
    if (platonAccount && amount) {
      try {
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createDepositTransactionParameters(platonAccount, currentAccount, parseInt(amount))]
        })
          .then(result => {
            creatStatusInfo(status, 'success', `赎回成功，交易哈希: ${result}`);
            queueAction(status as ActionStatus);
          })
          .catch(error => {
            creatStatusInfo(status, 'error', error.message);
            queueAction(status as ActionStatus);
          });

      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      { hasPlatonAccount && hasAccounts?
        <PublishAndRedeemCard className = "left" title="赎回" unit='PDOT' isReverse={true}  onClick={redeem} setAmount={setAmount} />
        : <PdotNodata title='赎回 PDOT' noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
        <Records className = "right" title="赎回记录" records={RedreemRecords} recordLength={redreemLength} arrows={true} />
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
