import React, { useCallback } from "react";
import styled from "styled-components";
import { AccountMessage } from "../AccountMessage/AccountMessage";
import Button from "@polkadot/react-components-chainx/Button";
import InputAutoLength from "../InputAutoLength";

interface PdotcardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  amount?: number;
  isBasic?: boolean;
}

function PublishCard({
  children,
  className = "",
  title,
  amount,
  isBasic
}: PdotcardProps): React.ReactElement<PdotcardProps> {
  return (
    <div className={`ui-Redeems ${className}`} key={title}>
      <p className={`redeemTit  `}>发行数量</p>
      
      <InputAutoLength placeholder="0" tokenName="DOT" />
      <p className={`tip `}>手续费： 0.5 PDOT</p>
      <AccountMessage isReverse={false} />
      <Button className="isConfirm">确定发行</Button>
    </div>
  );
}

export default React.memo(styled(PublishCard)`
  display: flex;
  position: relative;
  flex-direction: column;
  background: #fff;
  padding: 20px 30px 30px;
  font-size: 12px;
  .bgcolor {
    background: #f2f3f4;
    border-radius: 4px;
    margin-bottom: 16px;
    input {
      background: #f2f3f4;
      padding: 15px;
      &:focus {
        background: #f2f3f4;
        border: 1px solid #dce0e2;
      }
    }
  }
  .redeemTit,
  .tip {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 12px;
    color: #6f7c7c;
    text-align: center;
  }
  .tip {
    margin-bottom: 20px;
  }
  .h1 {
    margin: 16px auto;
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #444c5e;
    line-height: 44px;
  }
  .isConfirm {
    margin-top: 36px;
  }
`);
