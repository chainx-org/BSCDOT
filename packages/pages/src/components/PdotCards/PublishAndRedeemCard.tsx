import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, Title, Content, PublishAndRedeem, AmountAndTip, RedeemWarn } from './components'
import AccountMessage from "../AccountMessage";
import InputAutoLength from "@polkadot/pages/components/InputAutoLength";
import { PlatonAccountsContext} from '@polkadot/pages/components/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { ApiContext } from '@polkadot/react-api';
import Button from '../Button';
import { useTranslation } from '@polkadot/pages/components/translate';
import BigNumber from 'bignumber.js';

interface PublishAndRedeemProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  isReverse?: boolean;
  unit?: string;
  onClick?: () => void;
  charge: number;
  isChargeEnough: boolean;
  amount: BigNumber;
  setAmount: React.Dispatch<string>;
  isButtonDisabled?: boolean;
  isAmount?: boolean;
}

export default function PublishAndRedeemCard({children, className = "", title, isReverse, unit, onClick, charge, amount, setAmount, isChargeEnough, isButtonDisabled, isAmount}: PublishAndRedeemProps): React.ReactElement<PublishAndRedeemProps> {
  const {t} = useTranslation();
  const {currentAccount} = useContext(PolkadotAccountsContext)
  const {platonAccount} = useContext(PlatonAccountsContext);
  const {formatProperties} = useContext(ApiContext)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    amount.toNumber() > charge? setErrorMessage(''): setErrorMessage(t('The input amount should be greater than the handling fee'))
  }, [charge, amount, t])

  useEffect(() => {
    !isChargeEnough? setErrorMessage(t('The balance is insufficient')): isAmount && isReverse ? setErrorMessage('The amount cannot exceed 1000'):setErrorMessage('')
  }, [isChargeEnough,isAmount,t])

  return (
    <Wrapper className={`ui-card ${className}`}>
      <Title className={`ui-card-title `}>{title} {unit}</Title>
      <Content className="pdotCon">
        <PublishAndRedeem className={`ui-card-content`} key={title}>
          <AmountAndTip className='amountTit'>{title}{t('amount')}</AmountAndTip>
          <InputAutoLength placeholder="0" tokenName={isReverse ? unit: formatProperties.tokenSymbol[0]} onBlur={(e) => setAmount(e.target.textContent!)}/>
          <AmountAndTip className='tip'>{t('service charge')}： {charge} {unit}</AmountAndTip>
          <AccountMessage isReverse={isReverse} polkadotAddress={currentAccount} platonAddress={platonAccount}/>
          <RedeemWarn className="warn isShow">{errorMessage}</RedeemWarn>
          <Button className="isConfirm" onClick={onClick} text={`${t('Confirm')}${title}`} disabled={isButtonDisabled}/>
        </PublishAndRedeem>
      </Content>
    </Wrapper>
  );
}
