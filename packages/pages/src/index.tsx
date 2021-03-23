import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import PublicContent from './page-publish';
import RedeemContent from './page-redeem';
import TransferContent from './page-transfer';

function Contents(): React.ReactElement {

  return (
    <>
      <main className='accounts--App'>
        <Header/>
        <HashRouter>
          <Route path="/redeem" component={RedeemContent}/>
          <Route path="/transfer" component={TransferContent}/>
          <Route path="/" exact component={PublicContent}/>
        </HashRouter>
      </main>
    </>
  );
}

export default Contents;
