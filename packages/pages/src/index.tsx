import React from "react";
import { HashRouter, Route } from "react-router-dom";
import PublicContent from "./page-publish";
import RedeemContent from "./page-redeem";
import TransferContent from "./page-transfer";
function Contents(): React.ReactElement {
  return (
    <HashRouter>
      <Route path="/" exact component={PublicContent} />
      <Route path="/redeem" component={RedeemContent} />
      <Route path="/transfer" component={TransferContent} />
    </HashRouter>
  );
}

export default Contents;
