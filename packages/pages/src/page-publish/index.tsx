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
import { ToolTipConfig } from "@polkadot/react-components-chainx/ToolTipConfig/ToolTipConfig";

interface Props {
  className?: string;
}

export default function PublicContent({ className }: Props): React.ReactElement<Props> {
  //   const { t } = useTranslation();
  return (
    // <div className={className}>
    <Wrapper className="contentWrapper `${className}`">
      <Pdotcard className="left" title="发行 PDOT" component="PublishCard" isBasic />
      <Records className="right" title="发行记录" />
      {/* <ToolTipConfig /> */}
    </Wrapper>
    // </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 7rem 2.5rem 3rem;
  width: 98%;
  padding-right: 50px;
  .right{
    width: 308px;
  }
`;
