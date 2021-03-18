import React, { useState } from "react";
import styled from "styled-components";
import { Cell } from "./components/Cell/Cell";
import ALAYA from "./assets/alaya.svg";
import PLATON from "./assets/platon.svg";
import CLOSE from "./assets/icon-close.png";

const Wrapper = React.memo(styled.section`
  position: absolute;
  z-index: 999;
  top: 30px;
  left: 35%;
  max-height: 500px !important;
  overflow: auto;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #efefef;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  width: 312px;
  .header{
    height: 44px; 
    // display:flex;
    img{
      width: 16px;
      height: 16px;
      margin: 20px 20px 8px;
      // align-self: center;
    }
  }
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
  isOpen?: any;
  setIsOpen?: any;  
  // 
}

export function ToolTipConfig({list=lists,isOpen,setIsOpen}: ToolTipConfigProps): React.ReactElement<ToolTipConfigProps> {
  const [value, setValues] = useState(false);
  // const [isAccountListOpen, setIsAccountListOpen] = useState<boolean>(true);
  const _toggle = (): void => setIsOpen(false);

  return (
    <div>
    {isOpen &&
    <Wrapper>
      <div className="header">
        <img src={CLOSE} onClick={_toggle} />
      </div>
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
    </Wrapper>}
    </div>
  );
}
