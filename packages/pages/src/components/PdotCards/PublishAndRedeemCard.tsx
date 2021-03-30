import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, Title, Content, PublishAndRedeem, AmountAndTip, RedeemWarn } from './components'
import AccountMessage from "../AccountMessage";
import InputAutoLength from "@polkadot/pages/components/InputAutoLength";
import { PlatonAccountsContext} from '@polkadot/pages/components/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { ApiContext } from '@polkadot/react-api';
import Button from '../Button';

interface PublishAndRedeemProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  isReverse?: boolean;
  unit?: string;
  onClick?: () => void;
  charge: number;
  isChargeEnough: boolean;
  setAmount: React.Dispatch<string>;
}

export default function PublishAndRedeemCard({children, className = "", title, isReverse, unit, onClick, charge, setAmount, isChargeEnough}: PublishAndRedeemProps): React.ReactElement<PublishAndRedeemProps> {
  const {currentAccount} = useContext(PolkadotAccountsContext)
  const {platonAccount} = useContext(PlatonAccountsContext)
  const {formatProperties} = useContext(ApiContext)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    isChargeEnough? setErrorMessage(''): setErrorMessage('余额不足')
  }, [isChargeEnough])

  return (
    <Wrapper className={`ui-card ${className}`}>
      <Title className={`ui-card-title `}>{title} {unit}</Title>
      <Content className="pdotCon">
        <PublishAndRedeem className={`ui-card-content`} key={title}>
          <AmountAndTip className='amountTit'>{title}数量</AmountAndTip>
          <InputAutoLength placeholder="0" tokenName={isReverse ? unit: formatProperties.tokenSymbol[0]} onBlur={(e) => setAmount(e.target.textContent!)}/>
          <AmountAndTip className='tip'>手续费： {charge} {unit}</AmountAndTip>
          <AccountMessage isReverse={isReverse} polkadotAddress={currentAccount} platonAddress={platonAccount}/>
          <RedeemWarn className="warn isShow">{errorMessage}</RedeemWarn>
          <Button className="isConfirm" onClick={onClick} text={`确定${title}`} />
        </PublishAndRedeem>
      </Content>
    </Wrapper>
  );
}
