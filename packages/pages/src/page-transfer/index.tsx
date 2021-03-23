// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, {useContext} from 'react';
import styled from 'styled-components';
// import { useTranslation } from '../translate';
import {Records} from '@polkadot/react-components-chainx/Records';
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';
import TransferCard from '../components/PdotCards/TransferCard';
import PdotNodata from '../components/PdotCards/PdotNodata';

interface Props {
  className?: string;
}


export default function TransferContent({className}: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  const {hasPlatonAccount} = useContext(PlatonAccountsContext);
  const {hasAccounts,Transfers} = useContext(PolkadotAccountsContext);
  const transferslen = Transfers.length

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      {hasPlatonAccount && hasAccounts ?
        <TransferCard className="left" title="PDOT 转账" />
        : <PdotNodata title='PDOT 转账' noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
      <Records className="right" title="转账记录" records={Transfers} recordlen={transferslen} arrows={false} />
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
