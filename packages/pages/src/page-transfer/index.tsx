// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
// import type { Route } from '@polkadot/apps-routing/types';

import React, { useContext, useEffect } from "react";
// import { useLocation } from 'react-router-dom';
import styled from "styled-components";
// import createRoutes from '@polkadot/apps-routing';
// import { ErrorBoundary, Spinner, StatusContext } from '@polkadot/react-components';
// import { useApi } from '@polkadot/react-hooks';

// import { findMissingApis } from '../endpoint';
// import { useTranslation } from '../translate';
import Pdotcard from "@polkadot/react-components-chainx/PdotCards/Pdotcard";
import { Records } from "@polkadot/react-components-chainx/Records";

import {DeriveBalancesAll} from '@polkadot/api-derive/types';
import { useAccountInfo, useApi, useCall } from '@polkadot/react-hooks';
import { api } from '@polkadot/react-api';
import { web3AccountsSubscribe, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { useAllAccounts } from '@polkadot/react-hooks-chainx/useAllAccounts';
import { useLocalStorage } from '@polkadot/react-hooks-chainx';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';

interface Props {
  className?: string;
}

function TransferContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  // const { api, isApiReady } = useApi();
  const { accountAddress, hasAccounts, allAccounts} = useAllAccounts()
  console.log('all',accountAddress,allAccounts,hasAccounts)

  // const allBalances = useCall<DeriveBalancesAll>(isApiReady && api.derive.balances.all, [currentAccount]);
  // console.log('allBalances',JSON.stringify(allBalances) ) 

  return (
    // <div className={className}>
    <div className="contentWrapper `${className}`">
      <Pdotcard className="left" title="PDOT 转账" component="TransferCard" isBasic />
      <Records className="right" title="转账记录" />
    </div>
    // </div>
  );
}

export default React.memo(styled(TransferContent)`
  
`);
