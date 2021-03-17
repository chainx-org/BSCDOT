import { Sidebar } from "@polkadot/react-components";
import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebars from "./components/SideBar";
import PublicContent from "./page-publish";
import RedeemContent from "./page-redeem";
import TransferContent from "./page-transfer";
function Contents(): React.ReactElement {
  return (
    <main className='accounts--App'>
      {/* <Sidebars /> */}
      <Header />
      <HashRouter>
      <Route path="/" exact component={PublicContent} />
      <Route path="/redeem" component={RedeemContent} />
      <Route path="/transfer" component={TransferContent} />
    </HashRouter>
    </main>
    
  );
}

export default Contents;
