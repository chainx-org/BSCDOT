// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
// import type { Route } from '@polkadot/apps-routing/types';
import React, {useContext, useState} from 'react';
import styled from "styled-components";
import {Records} from '@polkadot/pages/components';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { PlatonAccountsContext } from '@polkadot/pages/components/PlatonAccountsProvider';
import PdotNodata from '../components/PdotCards/PdotNodata';
import PublishAndRedeemCard from '../components/PdotCards/PublishAndRedeemCard';
import {web3FromAddress} from '@polkadot/extension-dapp';
import { useApi } from '@polkadot/react-hooks';
import {StatusContext} from '@polkadot/react-components';
import {ActionStatus} from '@polkadot/pages/components/Status/types';
import {creatStatusInfo} from '@polkadot/pages/helper/helper';
import BigNumber from 'bignumber.js';

interface Props {
  className?: string;
}

export default function PublicContent({ className }: Props): React.ReactElement<Props> {
  const {hasPlatonAccount, platonAccount, PublishRecords} = useContext(PlatonAccountsContext)
  const publishLength = PublishRecords.length
  const {hasAccounts, currentAccount} = useContext(PolkadotAccountsContext)
  const [amount, setAmount] = useState<string>('')
  const {api} = useApi()
  const {queueAction} = useContext(StatusContext);
  const status = { action: 'publish' } as ActionStatus;

  const publish = () => {
    async function publishEvent() {
      if (hasAccounts && amount && platonAccount) {
        try {
          const injector = await web3FromAddress(currentAccount);
          const amountToBigNumber = (new BigNumber(amount)).times(1e12).toNumber()
          api.setSigner(injector.signer);
          api.tx.utility.batch([
            api.tx.balances.transferKeepAlive('5F3NgH5umL6dg6rmtKEm6m7z75YZwkBkyTybksL9CZfXxvPT', amountToBigNumber),
            api.tx.system.remark(platonAccount)
          ])
            .signAndSend(
              currentAccount,
              { signer: injector.signer },
              (statusData) => {
                const formatStatusData = JSON.parse(JSON.stringify(statusData))
                if(formatStatusData.status.inBlock){
                  creatStatusInfo(status, 'success','发行成功')
                  queueAction(status as ActionStatus)
                }else{
                  creatStatusInfo(status, 'sending', '正在发送中...')
                  queueAction(status as ActionStatus)
                }
              })
            .then(result => {
              console.log('result', result)
            })
            .catch(error => {
              creatStatusInfo(status, 'error', (error as Error).message)
              queueAction(status as ActionStatus)
            })
        } catch (err) {
          console.log(err);
        }
      }
    }
    publishEvent();
  }

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      { hasPlatonAccount && hasAccounts?
        <PublishAndRedeemCard className="left" title="发行" unit='PDOT' isReverse={false} onClick={publish} setAmount={setAmount} />
        : <PdotNodata title='发行 PDOT' noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
      <Records className="right" title="发行记录" records={PublishRecords} recordLength={publishLength} arrows={true} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .left {
    width: 636px;
  }
  .right {
    width: 308px;
  }
`;
