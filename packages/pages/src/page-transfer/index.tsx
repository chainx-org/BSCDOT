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
import Pdotcard from "@polkadot/react-components-chainx/PdotCards/Pdotcard";
import { Records } from "@polkadot/react-components-chainx/Records";

interface Props {
  className?: string;
}

function TransferContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();

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
