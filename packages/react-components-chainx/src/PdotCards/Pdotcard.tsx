// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from "react";
import styled from "styled-components";
import TransferRecords from "../Records/TransferRecords";
import RedeemRecords from "../Records/RedeemRecords";
import PdotnoData from "./Nodata";
import PublishCard from "./PublishCard";
import RedeemCard from "./RedeemCard";
import TransferCard from "./TransferCard";
import { Route } from "react-router-dom";

interface PdotcardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  isBasic?: boolean;
  noData?: boolean;
  noDataMsg?: string;
  component?: string;
}

function Pdotcard({
  component,
  children,
  className = "",
  title,
  noData,
  isBasic,
  noDataMsg
}: PdotcardProps): React.ReactElement<PdotcardProps> {
  return (
    <div className={`ui-card ${className}`}>
      <p className={`${className} ${isBasic ? " isBasic" : ""}  `}>{title}</p>
      <div className="pdotCon">
        {noData ? (
          <PdotnoData noDataMsg={noDataMsg} />
        ) : component === "PublishCard" ? (
          <PublishCard />
        ) : component === "RedeemCard" ? (
          <RedeemCard />
        ) : component === "TransferCard" ? (
          <TransferCard />
        ) : null}
      </div>
    </div>
  );
}

export default React.memo(styled(Pdotcard)`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  border: none;

  .isBasic {
    font-size: 20px;
    color: #444c5e;
    padding: 15px 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid #efefef;
  }
  .pdotCon {
    // max-height: 324px;
    // min-height: 324px;
    height: 324px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #6f7c7c;
      border-radius: 2.5px;
    }
  }
`);
