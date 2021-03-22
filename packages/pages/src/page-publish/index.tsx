// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
// import type { Route } from '@polkadot/apps-routing/types';

import React, {useContext} from 'react';
import styled from "styled-components";
// import { useTranslation } from '../translate';
import PdotCard from "@polkadot/react-components-chainx/PdotCards";
import { Records } from "@polkadot/react-components-chainx/Records";
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import {AllAccountsContext} from '@polkadot/react-components-chainx/AllAccountsProvider';

interface Props {
  className?: string;
}

export default function PublicContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  const {hasPlatonAccount} = useContext(PlatonAccountsContext)
  const {hasAccounts} = useContext(AllAccountsContext)

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      { hasPlatonAccount && hasAccounts?
        <PdotCard className="left" title="发行 PDOT" component="PublishCard" isBasic />
        : <PdotCard noData={true} title='发行 PDOT' isBasic noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
      <Records className="right" title="发行记录" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0rem 7rem 2.5rem 3rem;
  width: 97.1%;
  padding-right: 50px;
  .left {
    width: 636px;
  }
  .right {
    width: 308px;
  }
`;
