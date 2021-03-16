// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
// import type { Route } from '@polkadot/apps-routing/types';

import React from "react";
// import { useLocation } from 'react-router-dom';
import styled from "styled-components";
// import createRoutes from '@polkadot/apps-routing';
// import { ErrorBoundary, Spinner, StatusContext } from '@polkadot/react-components';
// import { useApi } from '@polkadot/react-hooks';

// import { findMissingApis } from '../endpoint';
// import { useTranslation } from '../translate';
import Lpolkadot from "./icons/logo_polkadot.svg";
import Lsamurai from "./icons/logo_samurai.svg";
import Network from "./icons/network.svg";

import polkadot from "./icons/logo_polkadot.svg";
import PolkadotAcc from "./icons/polkadot_account.svg";
import PlantonAcc from "./icons/planton_account.svg";
import Endpoints from "@polkadot/react-components-chainx/Endpoints";
import Pdotcard from "@polkadot/react-components-chainx/PdotCards/Pdotcard";
import Card from "@polkadot/react-components-chainx/Card/Card";
import AccountCard from "@polkadot/react-components-chainx/AccountCard/AccountCard";
import { Records } from "@polkadot/react-components-chainx/Records";

interface Props {
  className?: string;
}

export default function RedeemContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  return (
    // <div className={className}>
    <Wrapper className={`contentWrapper ${className}`}>
        <Pdotcard className = "left" title="赎回 PDOT" component="RedeemCard" isBasic />
        <Records className = "right" title="赎回记录" />
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
