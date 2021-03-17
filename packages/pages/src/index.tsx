import React, {useContext, useEffect, useState} from 'react';
import {transferTransactionParameters, depositTransactionParameters, bridge_contract} from './contract';
import { TxButton } from '@polkadot/react-components';
import {useApi} from '@polkadot/react-hooks';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { HashRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import PublicContent from "./page-publish";
import RedeemContent from "./page-redeem";
import TransferContent from "./page-transfer";
import {AllAccountsContext} from '@polkadot/react-components-chainx/AllAccountsProvider';

function Contents(): React.ReactElement {
  const { api, isApiReady } = useApi()
  useEffect(() => {
    async function ccc() {
      // alaya.request({ method: "platon_requestAccounts" }).then(result => console.log((result)))
      // console.log(alaya.selectedAddress)
// console.log(bridge_contract.methods.deposit)

      alaya.request({
        method: 'platon_sendTransaction',
        params: [depositTransactionParameters]
      }).then(result => console.log((result)));
// bridge_contract.methods.deposit(1, resourceID, createERCDepositData(10, 20 ,ghjieAddress)).send({from: adminAddress, value: 0, gasPrice: 1, gas: 2000000})
//   .on('transactionHash', function(hash){
//     console.log('1hash: ',hash);
//   })
//   .on('confirmation', function(confirmationNumber, receipt){
//     console.log('2confirmationNumber: ', confirmationNumber);
//     console.log('2receipt: ', receipt);
//   })
//   .on('receipt', function(receipt){
//     console.log('3receipt: ', receipt)
//   })
//   .on('error', console.error);

      // const signPromise = await web3.platon.accounts.signTransaction(rawTx, '0xb416b341437c420a45cb6ba5ca883655eec169360d36866124d23682c03766ba');
      // console.log('signPromise: ', signPromise)
      // let receipt = await web3.platon.sendSignedTransaction(signPromise.rawTransaction);
      // console.log('receipt', receipt)
      // let reply = await ppos.rpc('platon_accounts')
      // console.log('reply', reply )
      // console.log(!!web3.platon.sendTransaction)

      // await web3a.platon.sendTransaction({from: alaya.selectedAddress,to: "atp1dt2wx0xjkd2je8ev4t3ysmte6n90kc9gm9mkrr", value: 1e19}, function(err, transactionHash) {if (err) { console.log(err); } else {console.log(transactionHash);}});

      // erc20_minter_contract.methods.transfer('atx1j4ncnc4ajm8ut0nvg2n34uedtz3kuecmsdf7qd', transferBalance)
      //   .send({from: 'atx1pvampa06l6ccnmva972e7wurr37mqadvrauy56' , gas:4712388})
      //   .then(function(receipt){
      //     console.log("receipt: ", receipt);
      //   }).catch(function(err) {
      //   console.log('err: ', err);
      // })


      //   web3a.platon.sendSignedTransaction('0x' + serializedTx.toString('hex'))
      //     .on('receipt', console.log);
    }

    // ccc();

    // erc20_minter_contract.methods.balanceOf(adminAddress).call()
    //   .then(console.log);
  }, []);

  const [active, setActive] = useState<InjectedAccountWithMeta | null>(null);

  const {accountAddress, hasAccounts, allAccounts} = useContext(AllAccountsContext)
  useEffect(() => {

    async function ccc(){

      if(hasAccounts){
        try{
          const injector = await web3FromAddress(accountAddress[0]);

          api.setSigner(injector.signer);
          setActive(allAccounts[0]);

        }catch (err){
          console.log(err)
        }

      }

    }
    ccc()

  }, [accountAddress])
  console.log(active)
  return (
    <>
      {isApiReady && <TxButton
        accountId={accountAddress[0]}
        icon='plus'
        label={'发行'}
        params={ [[
          api.tx.balances.transferKeepAlive('123mq9dK8GaErgAoMJqiBxx7cbLwiu4u7hzNmtVC3qEjjNRA', 1000),
          api.tx.system.remark('atx1j4ncnc4ajm8ut0nvg2n34uedtz3kuecmsdf7qd')
        ]]}
        // isDisabled={withdrawalDisabled}
        tx='utility.batch'
        // onSuccess={() => {
        //   setN(Math.random());
        //   toggleWithDrawButton();
        // }}
      />}
    <main className='accounts--App'>
      <Header />
      <HashRouter>
      <Route path="/" exact component={PublicContent} />
      <Route path="/redeem" component={RedeemContent} />
      <Route path="/transfer" component={TransferContent} />
    </HashRouter>



    </main>
    </>
  );
}

export default Contents;
