import React, { useContext, useState } from 'react';
import { AddressJudge, AmountAndAddress, TransfersCard } from '@polkadot/pages/components/PdotCards/components';
import InputDex from '@polkadot/pages/components/Input/InputDex';
import { Icon, StatusContext } from '@polkadot/pages/components';
import Input from '@polkadot/pages/components/Input/Input';
import Button from '@polkadot/pages/components/Button';
import { useTranslation } from '@polkadot/pages/components/translate';
import { createTransferTransactionParameters } from '@polkadot/pages/contract';
import { creatStatusInfo } from '@polkadot/pages/helper/helper';
import { ActionStatus } from '@polkadot/pages/components/Status/types';
import { BSCAccountsContext } from '@polkadot/pages/components/BSCAccountsProvider';
import { CoinInfoContext } from '@polkadot/pages/components/CoinInfoProvider';

function CardContent(): React.ReactElement{
  const {t} = useTranslation();
  const [warning, setWarning] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const status = {action: 'transfer'} as ActionStatus;
  const {coinInfo} = useContext(CoinInfoContext);
  const {bCoinName} = coinInfo
  const {BSCAccount, fetchTransfers} = useContext(BSCAccountsContext);
  const {queueAction} = useContext(StatusContext);
  const [targetAddress, setTargetAddress] = useState<string>('');

  const confirmTransfer = () => {
    if (BSCAccount && amount && targetAddress) {
      try {
        setWarning('');
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createTransferTransactionParameters(platonAccount, amount, targetAddress)]
        })
          .then(result => {
            creatStatusInfo(status, 'success', `${t('Transaction hash')}: ${result}`);
            queueAction(status as ActionStatus);
            fetchTransfers(BSCAccount);
          })
          .catch(error => {
            creatStatusInfo(status, 'error', error.message);
            queueAction(status as ActionStatus);
          });

      } catch (err) {
        setWarning(err.coderType);
        console.log(err);
      }
    }
  };

  return (
    <TransfersCard className={`ui-Transfers`}>
      <AmountAndAddress className='amountTit'>{t('Number of transfers')}</AmountAndAddress>
      <AddressJudge>
        <InputDex className='bgcolor' tokenName={bCoinName}
                  placeholder={t('Enter the number of {{bCoinName}}', {replace: {bCoinName}})}
                  onChange={setAmount}/>
        {warning === 'uint256' ? <Icon icon='times' className='warning redColor' size='2x'/> : null}
      </AddressJudge>
      <AmountAndAddress className='addressTit'>{t('Receiving address')}</AmountAndAddress>
      <AddressJudge className='judge'>
        <Input className='bgcolor iptAddress'
               placeholder={t('Enter the BSC destination account address')}
               onChange={setTargetAddress}/>
        {warning === 'address' ? <Icon icon='times' className='warning redColor' size='2x'/> : null}
      </AddressJudge>
      <Button className="isConfirm" onClick={confirmTransfer} text={t('Confirm Transfer')}/>
    </TransfersCard>
  )
}

export default CardContent
