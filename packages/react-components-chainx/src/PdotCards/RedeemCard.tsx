import React, {useContext, useState} from 'react';
import styled from "styled-components";
import { AccountMessage } from "../AccountMessage/AccountMessage";
import Button from "@polkadot/react-components-chainx/Button";
import InputAutoLength from "../InputAutoLength";
import {createDepositTransactionParameters} from '@polkadot/pages/contract';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';

interface PdotCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  isBasic?: boolean;
}

function RedeemCard({
  children,
  className = "",
  title,
  isBasic
}: PdotCardProps): React.ReactElement<PdotCardProps> {
  const [amount, setAmount] = useState<string>('')
  const {currentAccount} = useContext(AccountContext)
  const redeem = () => {
    if(alaya.selectedAddress && amount){
      try{
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createDepositTransactionParameters(alaya.selectedAddress, currentAccount, parseInt(amount))]
        }).then((result: any) => console.log((result)));
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className={`ui-Redeems ${className}`} key={title}>
      <p className={`redeemTit`}>赎回数量</p>
      <InputAutoLength placeholder="0" tokenName="PDOT" onBlur={(e) => setAmount(e.target.textContent)}/>
      <p className={`tip `}>手续费： 0.5 PDOT</p>
      <AccountMessage isReverse={true} polkadotAddress={currentAccount} platonAddress={alaya.selectedAddress}/>
      <span className="warn isShow">PDOT 余额不足</span>
      <Button className="isConfirm" onClick={redeem}>确定赎回</Button>
    </div>
  );
}

export default React.memo(styled(RedeemCard)`
  display: flex;
  position: relative;
  flex-direction: column;
  background: #fff;
  padding: 20px 30px 30px;
  font-size: 12px;
  border: 0 solid transparent;
  .input {
    border: 0;
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
  .warn {
    display: none;
    position: absolute;
    bottom: 92px;
    left: 50%;
    transform: translate(-50%);
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #de071c;
    line-height: 16px;
  }
  .isShow {
    display: block !important;
  }
  .h1 {

  }
  .isConfirm {
    margin-top: 36px;
  }
`);
