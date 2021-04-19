// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React  from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SideItem from "./SideItem";
import Languages from "./Languages";
import { useTranslation } from '@polkadot/pages/components/translate';
import NetWorkList from '@polkadot/pages/components/SideBar/NetWorkList';

interface Props {
  className?: string;
}

export interface NodeItem {
  index: number | undefined;
  nodeName: string;
  link: string;
  icon: React.ReactElement;
  icon_after: React.ReactElement;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  width: 256px;
  font-size: 16px;
  background: #fff;
  // box-shadow: 6px 0 20px 0 rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar {
    display: none;
  }

  .wrappers {
    margin: 0 56px 0 52px;

    ul,li{
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .navLists {
      padding-top: 23px;
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

      .statusRisk > a {
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
  const {t} = useTranslation();

  const nodeList: NodeItem[] = [
    {
      index: 0,
      nodeName: t("Publish"),
      link: "/",
      icon: <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/720bb60af2705f141078.svg' alt="publish" />,
      icon_after: <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/fbaef60905798d33727b.svg' alt="publish" />
    },
    {
      index: 1,
      nodeName: t("Redeem"),
      link: "/redeem",
      icon: <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/cdecc6a6733584359b5b.svg' alt="redeem" />,
      icon_after: <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/873084d11f0ffb9d9f7b.svg' alt="redeem" />
    },
    {
      index: 2,
      nodeName: t("Transfer"),
      link: "/transfer",
      icon: <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/0bef863a2d9db0f3d3de.svg' alt="transfer" />,
      icon_after: <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/4bb974cd897fd02c5fbf.svg' alt="transfer" />
    }
  ];

  const { pathname } = useLocation();

  return (
    <Wrapper>
      <div className="wrappers">
        <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/2708a538eefe61748c0e.svg' alt="PlatDot" />
        <NetWorkList/>
        <ul className="navLists">
          {nodeList.map((node: NodeItem, index: number) => (
            <SideItem node={node} key={index} id={index} pathname={pathname} />
          ))}
        </ul>
      </div>
      <Languages />
    </Wrapper>
  );
}

export default Sidebars;
