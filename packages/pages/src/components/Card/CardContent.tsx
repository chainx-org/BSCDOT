import React, { useContext } from 'react';
import { AmountAndTip, Nodata, PublishAndRedeem, RedeemWarn } from '@polkadot/pages/components/PdotCards/components';
import InputAutoLength from '@polkadot/pages/components/InputAutoLength';
import AccountMessage from '@polkadot/pages/components/AccountMessage';
import Button from '@polkadot/pages/components/Button';
import { useTranslation } from '@polkadot/pages/components/translate';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { BSCAccountsContext } from '@polkadot/pages/components/BSCAccountsProvider';

interface Props {
  tipLabel: string;
  tokenName: string;
  charge: number;
  onClick: () => void;
  buttonText: string;
  isButtonDisabled: boolean;
  setAmount: React.Dispatch<string>;
  errorMessage: string;
  isReverse: boolean;
}

function CardContent({tipLabel, tokenName, charge, onClick, buttonText, isButtonDisabled, setAmount, errorMessage, isReverse}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const {currentAccount} = useContext(PolkadotAccountsContext);
  const {BSCAccount} = useContext(BSCAccountsContext);

  return (
    <div className="pdotContent">
     <PublishAndRedeem className={`ui-card-content`}>
        <AmountAndTip className='amountTit'>{tipLabel}</AmountAndTip>
        <InputAutoLength placeholder="0" tokenName={tokenName}
                         onBlur={(e) => setAmount(e.target.textContent!)}/>
        <AmountAndTip
          className='tip'>{t('service charge')}： {charge} {tokenName}</AmountAndTip>
        <AccountMessage isReverse={isReverse} polkadotAddress={currentAccount} BSCAddress={BSCAccount}/>
        <RedeemWarn className="warn isShow">{errorMessage}</RedeemWarn>
        <Button className="isConfirm" onClick={onClick} text={buttonText}
                disabled={isButtonDisabled}/>
      </PublishAndRedeem>
    </div>
  );
}

export default CardContent;
