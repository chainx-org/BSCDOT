// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useContext} from 'react';
import styled from "styled-components";
import PdotCard from "@polkadot/react-components-chainx/PdotCards";
import { Records } from "@polkadot/react-components-chainx/Records";
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';

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
         <PdotCard className = "left" title="赎回 PDOT" component="RedeemCard" isBasic/>
        : <PdotCard noData={true} title='赎回 PDOT' isBasic noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
        <Records className = "right" title="赎回记录" />
      </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0rem 7rem 2.5rem 3rem;
  width: 97.1%;
  padding-right: 50px;
  .left{
    width: 636px;
  }
  .right{
    width: 308px;
  }
`;
