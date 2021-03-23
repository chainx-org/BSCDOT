// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useContext} from 'react';
import styled from "styled-components";
// import { useTranslation } from '../translate';
import { Records } from "@polkadot/react-components-chainx/Records";
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';
import PdotNodata from '@polkadot/react-components-chainx/PdotCards/PdotNodata';
import PublishAndRedeemCard from '@polkadot/react-components-chainx/PdotCards/PublishAndRedeemCard';

interface Props {
  className?: string;
}

export default function RedeemContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  const {hasPlatonAccount} = useContext(PlatonAccountsContext)
  const {hasAccounts} = useContext(PolkadotAccountsContext)
  return (

    <Wrapper className={`contentWrapper ${className}`}>
      { hasPlatonAccount && hasAccounts?
         <PublishAndRedeemCard className = "left" title="赎回" unit='PDOT' isReverse={true}  />
        : <PdotNodata title='赎回 PDOT' noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
        <Records className = "right" title="赎回记录" />
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
