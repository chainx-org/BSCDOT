import { Loading } from '@polkadot/pages/components';
import { useApi } from '@polkadot/react-hooks';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import PublicContent from './page-publish';
import RedeemContent from './page-redeem';
import TransferContent from './page-transfer';

function Contents(): React.ReactElement {
  const {isApiReady} = useApi();
  const [charge, setCharge] = useState<number>(0)

  return (
    <>
      <main className='accounts--App'>
        <Header/>
        <Switch>
          <Route path="/redeem" exact>
            <RedeemContent charge={charge} setCharge={setCharge}/>
          </Route>
          <Route path="/transfer" exact>
            <TransferContent/>
          </Route>
          <Route path="/">
            <PublicContent charge={charge} setCharge={setCharge}/>
          </Route>
        </Switch>
        {!isApiReady && <Loading/>}
      </main>
    </>
  )
    ;
}

export default Contents;
