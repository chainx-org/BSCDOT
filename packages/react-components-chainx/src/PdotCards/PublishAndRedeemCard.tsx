import React, {useContext, useState} from 'react';
import { Wrapper, Title, Content, PublishAndRedeem, AmountAndTip, RedeemWarn } from './components/index'
import { AccountMessage } from "../AccountMessage/AccountMessage";
import Button from "@polkadot/react-components-chainx/Button";
import InputAutoLength from "../InputAutoLength";
import {web3FromAddress} from '@polkadot/extension-dapp';
import {createDepositTransactionParameters} from '@polkadot/pages/contract';
import {PlatonAccountsContext} from '@polkadot/react-components-chainx/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '../PolkadotAccountsProvider';
import { ApiContext } from '@polkadot/react-api';
import { usePolkadotAccounts } from '@polkadot/react-hooks-chainx/usePolkadotAccounts';
import { useApi } from '@polkadot/react-hooks';
import {StatusContext} from '@polkadot/react-components';
import {ActionStatus} from '@polkadot/react-components/Status/types';
import {creatStatusInfo} from '@polkadot/pages/helper/helper';

interface PublishAndRedeemProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  isReverse?: boolean;
  unit?: string;
}

export default function PublishAndRedeemCard({
  children,
  className = "",
  title,
  isReverse,
  unit
}: PublishAndRedeemProps): React.ReactElement<PublishAndRedeemProps> {
  const [amount, setAmount] = useState<string>('')
  const {currentAccount} = useContext(PolkadotAccountsContext)
  const {platonAccount} = useContext(PlatonAccountsContext)
  const {api} = useApi()
  const {hasAccounts} = usePolkadotAccounts()
  const {formatProperties} = useContext(ApiContext)
  const {queueAction} = useContext(StatusContext);

  const publish = () => {
    const status = { action: 'publish' } as ActionStatus;
    async function ccc() {
      if (hasAccounts && amount && platonAccount) {
        try {
          const injector = await web3FromAddress(currentAccount);
          api.setSigner(injector.signer);
          api.tx.utility.batch([
            api.tx.balances.transferKeepAlive(currentAccount, amount),
            api.tx.system.remark(platonAccount)
          ])
            .signAndSend(currentAccount, { signer: injector.signer }, (status) => {console.log('status',status)})
            .then(result => {
              creatStatusInfo(status, 'success', '发行成功', currentAccount)
              queueAction(status as ActionStatus)
            })
            .catch(error => {
              creatStatusInfo(status, 'error', (error as Error).message)
              queueAction(status as ActionStatus)
            })
        } catch (err) {
          console.log(err);
        }
      }
    }
    ccc();
  }

  const redeem = () => {
    const status = {action: 'redeem'} as ActionStatus;
    if (platonAccount && amount) {
      try {
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createDepositTransactionParameters(platonAccount, currentAccount, parseInt(amount))]
        })
          .then(result => {
            creatStatusInfo(status, 'success', `赎回成功，交易哈希: ${result}`);
            queueAction(status as ActionStatus);
          })
          .catch(error => {
            creatStatusInfo(status, 'error', error.message);
            queueAction(status as ActionStatus);
          });

      } catch (err) {
        console.log(err);
      }
    }
  };

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
          {
            isReverse ? <AccountMessage isReverse={isReverse} polkadotAddress={currentAccount} platonAddress={platonAccount}/>:
            <AccountMessage isReverse={isReverse} polkadotAddress={currentAccount} platonAddress={platonAccount}/>
          }
          {
            isReverse ? <RedeemWarn className="warn isShow">PDOT 余额不足</RedeemWarn>: null
          }
          {
            title==='发行'?<Button className="isConfirm" onClick={publish}>确定{title}</Button>:
            <Button className="isConfirm" onClick={redeem}>确定{title}</Button>
          }
        </PublishAndRedeem>
      </Content>
    </Wrapper>
  );
}
