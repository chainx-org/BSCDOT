// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from "react";

// import { useTranslation } from '../translate';

// import { Link } from "react-router-dom";
// import { Router, Route, Link } from 'react-router'
import styled from "styled-components";

import Logo from "./icons/logo.svg";

import Publish from "./icons/publish.svg";
import Redeem from "./icons/redeem.svg";
import Transfer from "./icons/transfer.svg";

import Publish_ACTIVE from "./icons/publish_active.svg";
import Redeem_ACTIVE from "./icons/redeem_active.svg";
import Transfer_ACTIVE from "./icons/transfer_active.svg";

import SideItem from "./SideItem";
interface Props {
  className?: string;
}

export interface NodeItem {
  index: number;
  nodeName: string;
  link: string;
  icon: React.ReactElement;
  icon_after: React.ReactElement;
}

const Wrapper = styled.div`
  padding-top: 30px;
  width: 256px;
  font-size: 16px;
  background: #fff;
  box-shadow: 6px 0 20px 0 rgba(0, 0, 0, 0.3);
  // overflow-y: auto;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  .wrappers {
    margin: 0 56px 0 52px;
    .navLists {
      padding-top: 30px;
      .navItem {
        margin: 25px 0;
        a {
          display: flex;
          align-items: center;
          padding: 15px 0;
          span {
            padding-left: 16px;
            color: #6f7c7c;
          }
        }
      }
      .statusRisk > a.selected {
        background: #51abad;
        border-radius: 0 10px 10px 0;
        margin: 25px -26px 25px -52px;
        padding-left: 52px;
        span {
          color: #ffffff;
        }
      }
    }
  }
`;

function Sidebars({ className = "" }: Props): React.ReactElement<Props> {
  // const { t } = useTranslation();

  const nodeList: NodeItem[] = [
    // {nodeName: '发行', link: '/',  icon: <img src={Publish} alt='publish' />},
    // {nodeName: '赎回', link: '/redeem',   icon: <img src={Redeem} alt='redeem' />},
    // {nodeName: '转账', link: '/transfer', icon: <img src={Transfer} alt='transfer' />}
    {
      index: 0,
      nodeName: "发行",
      link: "/",
      icon: <img src={Publish} alt="publish" />,
      icon_after: <img src={Publish_ACTIVE} alt="publish" />
    },
    {
      index: 1,
      nodeName: "赎回",
      link: "/redeem",
      icon: <img src={Redeem} alt="redeem" />,
      icon_after: <img src={Redeem_ACTIVE} alt="redeem" />
    },
    {
      index: 2,
      nodeName: "转账",
      link: "/transfer",
      icon: <img src={Transfer} alt="transfer" />,
      icon_after: <img src={Transfer_ACTIVE} alt="transfer" />
    }
  ];
  const [recordType, setRecordType] = useState(0);
  function statusNode(node: NodeItem, index: number) {
    setRecordType(index);
  }
  return (
    <Wrapper className="">
      <div className="wrappers">
        <img src={Logo} alt="logo" />
        <ul className="navLists">
          {nodeList.map((node: NodeItem, index: number) => (
            <SideItem node={node} key={index} id={index} recordType={recordType} statusNode={statusNode} />
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default Sidebars;
