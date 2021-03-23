import React, {useContext} from 'react';
import { Wrapper, Title, Content, PublishAndRedeem, AmountAndTip, RedeemWarn } from './components'
import { AccountMessage } from "@polkadot/react-components-chainx/AccountMessage/AccountMessage";
import Button from "@polkadot/react-components-chainx/Button";
import InputAutoLength from "@polkadot/react-components-chainx/InputAutoLength";
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';
import { ApiContext } from '@polkadot/react-api';

interface PublishAndRedeemProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  isReverse?: boolean;
  unit?: string;
  onClick?: () => void;
  setAmount?: any;
}

export default function PublishAndRedeemCard({
  children,
  className = "",
  title,
  isReverse,
  unit,
  onClick,
  setAmount
}: PublishAndRedeemProps): React.ReactElement<PublishAndRedeemProps> {

  const {currentAccount} = useContext(PolkadotAccountsContext)
  const {platonAccount} = useContext(PlatonAccountsContext)
  const {formatProperties} = useContext(ApiContext)

  return (
    <Wrapper className={`ui-card ${className}`}>
      <Title className={`ui-card-title `}>{title} {unit}</Title>
      <Content className="pdotCon">
        <PublishAndRedeem className={`ui-card-content`} key={title}>
          <AmountAndTip className='amountTit'>{title}数量</AmountAndTip>
          {
            title==='发行'? <InputAutoLength placeholder="0" tokenName="PDOT" onBlur={(e) => setAmount(e.target.textContent)}/>:
            <InputAutoLength placeholder="0" tokenName={formatProperties.tokenSymbol[0]} onBlur={(e) => setAmount(e.target.textContent)}/>
          }
          <AmountAndTip className='tip'>手续费： 0.5 PDOT</AmountAndTip>
          <AccountMessage isReverse={isReverse} polkadotAddress={currentAccount} platonAddress={platonAccount}/>
          {
            isReverse ? <RedeemWarn className="warn isShow">PDOT 余额不足</RedeemWarn>: null
          }
          <Button className="isConfirm" onClick={onClick}>确定{title}</Button>
        </PublishAndRedeem>
      </Content>
    </Wrapper>
  );
}
