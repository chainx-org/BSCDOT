import React, { useState } from "react";
import styled from "styled-components";
import { Cell } from "./components/Cell/Cell";
import ALAYA from "./components/assets/alaya.svg";
import PLATON from "./components/assets/platon.svg";

const Wrapper = React.memo(styled.section`
  position: absolute;
  z-index: 999;
  top: 30px;
  left: 50%;
  max-height: 500px !important;
  overflow: auto;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #efefef;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  width: 312px;
`);
const lists: any = [
  {
    title: "Alaya 网络",
    iconUrl: ALAYA
  },
  {
    title: "Platon 网络",
    iconUrl: PLATON
  }
];
interface ToolTipConfigProps {
  list?: any;
}

export function ToolTipConfig({list=lists}: ToolTipConfigProps): React.ReactElement<ToolTipConfigProps> {
  const [value, setValues] = useState(false);
  console.log('list',list)
  return (
    <Wrapper>
      {list.map(function(item: any) {
        return (
          <Cell
            key={item.account || item.title}
            isSelected={value == item.account || value == item.title}
            setValues={setValues}
            iconUrl={item.iconUrl}
            title={item.title}
            accountName={item.accountName}
            account={item.account}
          />
        );
      })}
    </Wrapper>
  );
}
