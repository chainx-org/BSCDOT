// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import {ToolTipConfig} from '@polkadot/react-components-chainx/ToolTipConfig/ToolTipConfig';
import Button from '@polkadot/react-components-chainx/Button';
// import type { Route } from '@polkadot/apps-routing/types';
import {Route} from 'react-router-dom';

import React, {useContext, useEffect} from 'react';
// import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import createRoutes from '@polkadot/apps-routing';
// import { ErrorBoundary, Spinner, StatusContext } from '@polkadot/react-components';
// import { useApi } from '@polkadot/react-hooks';

// import { findMissingApis } from '../endpoint';
// import { useTranslation } from '../translate';
import Lpolkadot from './icons/logo_polkadot.svg';
import samurai from './icons/logo_samurai.svg';
import Network from './icons/network.svg';

import polkadot from './icons/logo_polkadot.svg';
import PolkadotAcc from './icons/polkadot_account.svg';
import PlantonAcc from './icons/planton_account.svg';
import Endpoints from '@polkadot/react-components-chainx/Endpoints';
import Pdotcard from '@polkadot/react-components-chainx/PdotCards/Pdotcard';
import Card from '@polkadot/react-components-chainx/Card/Card';
import AccountCard from '@polkadot/react-components-chainx/AccountCard/AccountCard';
import {Records} from '@polkadot/react-components-chainx/Records';

import {DeriveBalancesAll} from '@polkadot/api-derive/types';
import {useAccountInfo, useApi, useCall} from '@polkadot/react-hooks';
import {api} from '@polkadot/react-api';
import {web3AccountsSubscribe, web3Enable, web3FromAddress} from '@polkadot/extension-dapp';
import {useAllAccounts} from '@polkadot/react-hooks-chainx/useAllAccounts';
import {useLocalStorage} from '@polkadot/react-hooks-chainx';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

interface Props {
  className?: string;
}


export default function TransferContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  // const { api, isApiReady } = useApi();
  const {accountAddress, hasAccounts, allAccounts} = useAllAccounts();

  // const allBalances = useCall<DeriveBalancesAll>(isApiReady && api.derive.balances.all, [currentAccount]);
  // console.log('allBalances',JSON.stringify(allBalances) )

  return (

    // <div className={className}>
    <Wrapper className={`contentWrapper ${className}`}>
      <Pdotcard className="left" title="PDOT 转账" component="TransferCard" isBasic />
      <Records className="right" title="转账记录" />
    </Wrapper>
    // </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0rem 7rem 2.5rem 3rem;
  width: 97.5%;
  padding-right: 50px;
  .left{
    width: 636px;
  }
  .right{
    width: 308px;
  }
`;
