// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
// import type { Route } from '@polkadot/apps-routing/types';
import React, {useContext, useState} from 'react';
import styled from "styled-components";
import { Records } from "@polkadot/react-components-chainx/Records";
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';
import { PlatonAccountsContext } from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import PdotNodata from '../components/PdotCards/PdotNodata';
import PublishAndRedeemCard from '../components/PdotCards/PublishAndRedeemCard';
import {web3FromAddress} from '@polkadot/extension-dapp';
import { useApi } from '@polkadot/react-hooks';
import {StatusContext} from '@polkadot/react-components';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import {creatStatusInfo} from '@polkadot/pages/helper/helper';

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
    async function ccc() {
      if (hasAccounts && amount && platonAccount) {
        try {
          const injector = await web3FromAddress(currentAccount);
          api.setSigner(injector.signer);
          api.tx.utility.batch([
            api.tx.balances.transferKeepAlive('5F3NgH5umL6dg6rmtKEm6m7z75YZwkBkyTybksL9CZfXxvPT', parseInt(amount)),
            api.tx.system.remark(platonAccount)
          ])
            .signAndSend(
              currentAccount,
              { signer: injector.signer },
              (statusData) => {
                const formatStatusData = JSON.parse(JSON.stringify(statusData))
                if(formatStatusData.status.inBlock){
                  creatStatusInfo(status, 'success', '发行成功', currentAccount)
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
    ccc();
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
