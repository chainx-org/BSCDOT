// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
// import type { Route } from '@polkadot/apps-routing/types';

import React, {useContext} from 'react';
import styled from "styled-components";
// import { useTranslation } from '../translate';
import { Records } from "@polkadot/react-components-chainx/Records";
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';
import { PlatonAccountsContext } from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import PdotNodata from '@polkadot/react-components-chainx/PdotCards/PdotNodata';
import PublishAndRedeemCard from '@polkadot/react-components-chainx/PdotCards/PublishAndRedeemCard';


interface Props {
  className?: string;
}

export default function PublicContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  const {hasPlatonAccount} = useContext(PlatonAccountsContext)
  const {hasAccounts} = useContext(PolkadotAccountsContext)

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      { hasPlatonAccount && hasAccounts?
        <PublishAndRedeemCard className="left" title="发行" unit='PDOT' isReverse={false} />
        : <PdotNodata title='发行 PDOT' noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
      <Records className="right" title="发行记录" />
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
