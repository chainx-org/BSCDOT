// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, {useContext} from 'react';
import styled from 'styled-components';
import {Records} from '@polkadot/pages/components';
import {PlatonAccountsContext} from '@polkadot/pages/components/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import TransferCard from '../components/PdotCards/TransferCard';
import PdotNodata from '../components/PdotCards/PdotNodata';
import { useTranslation } from '../components/translate';

interface Props {
  className?: string;
}


export default function TransferContent({className}: Props): React.ReactElement<Props> {
    const { t } = useTranslation();
  const {hasPlatonAccount,Transfers} = useContext(PlatonAccountsContext);
  const {hasAccounts} = useContext(PolkadotAccountsContext);
  const transferLength = Transfers.length

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      {hasPlatonAccount && hasAccounts ?
        <TransferCard className="left" title={t<string>('PDOT Transfer')} />
        : <PdotNodata title='PDOT 转账' noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
      <Records className="right" title="转账记录" records={Transfers} recordLength={transferLength} arrows={false} />
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
