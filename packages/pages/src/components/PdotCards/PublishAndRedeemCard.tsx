import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, Title, Content, PublishAndRedeem, AmountAndTip, RedeemWarn } from './components'
import AccountMessage from "../AccountMessage";
import InputAutoLength from "@polkadot/pages/components/InputAutoLength";
import { PlatonAccountsContext} from '@polkadot/pages/components/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { ApiContext } from '@polkadot/react-api';
import Button from '../Button';
import { useTranslation } from '@polkadot/pages/components/translate';

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
  const {t} = useTranslation();
  const {currentAccount} = useContext(PolkadotAccountsContext)
  const {platonAccount} = useContext(PlatonAccountsContext)
  const {formatProperties} = useContext(ApiContext)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    isChargeEnough? setErrorMessage(''): setErrorMessage(t('The balance is insufficient'))
  }, [isChargeEnough, t])

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
          <Button className="isConfirm" onClick={onClick} text={`${t('Confirm')}${title}`} />
        </PublishAndRedeem>
      </Content>
    </Wrapper>
  );
}
