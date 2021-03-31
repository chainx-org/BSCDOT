[![platon](https://img.shields.io/badge/platdot-js-orange)](https://platdot.chainx.org)
![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)

# platdot

```Platdot``` is a cross-chain project based on ChainBridge. In order to achieve two-way cross-chain, platdot needs to deploy a pallet on the Substrate chain that is equivalent to the smart contract in the EVM, but it cannot be deployed on polkadot. Our team has improved this. Through Platdot, it can be passed without pallet. The multi-signature module realizes a completely decentralized token transfer across Polkadot, transferring Dot on Polkadot to PlatON, and it can also be applied to kusama, chainX and other networks that have huge value but cannot deploy pallets on their own.

## Installation and quick start

```
git clone https://github.com/chainx-org/Platdot.git
cd ./Platdot
yarn install
yarn start
```

## Use preview of Platdot
1. Open https://platdot.chainx.org/ website，this is our homepage
![](https://ftp.bmp.ovh/imgs/2021/03/2388c7a785618747.png)

2. Then you need to log in to the relevant account through the ```polkadot extension``` and ```samurai``` plugin to perform related operations such as transfers

    If you have installed the ```polkadot extension``` and ```samurai``` plugin, when you first enter the page, two plugins will be called up, prompting you to connect
![](https://ftp.bmp.ovh/imgs/2021/03/2615ceee28332533.png)
    If the browser does not have a plugin installed, click the button on the homepage, and it will jump to the download address of the plugin
![](https://ftp.bmp.ovh/imgs/2021/03/57e6cc5e9562d46c.png)

3.  Page form after the login
![](https://ftp.bmp.ovh/imgs/2021/03/6aa73637d3ff4764.png)

4. How to switch polkadot account?

    Click to expand the account list
![](https://ftp.bmp.ovh/imgs/2021/03/8cbdeb8033e3f4d2.png)
    Choose the account you want
![](https://ftp.bmp.ovh/imgs/2021/03/35ba88e459e388ef.png)

5. How to switch platon account?

    Click to open the ```samurai``` plugin
![](https://i.bmp.ovh/imgs/2021/03/d39d220f39354a12.png)
    Click to switch account
![](http://lc-XLoqMObG.cn-n1.lcfile.com/c6247812ce28699bede1.png?imageView2/0)

6. How to proceed with the publish?

    Please make sure to enter the transaction quantity and click the operation
![](http://lc-XLoqMObG.cn-n1.lcfile.com/5f30848a3558ee5e7cad.png)
    After entering the account password, the upper right corner will prompt the current transaction status, if it fails, it will prompt error related information
![](http://lc-XLoqMObG.cn-n1.lcfile.com/a308995e3881dc4785b7.png)
    If it successes
![](http://lc-XLoqMObG.cn-n1.lcfile.com/3178257e8f1f5cbdca15.png)

7. How to proceed with the redeem?

    Please make sure to enter the transaction quantity and click the operation, and this click operation will evoke the samurai plugin, then you need to click confirm to proceed with the transaction
![](http://lc-XLoqMObG.cn-n1.lcfile.com/18a480eec98917c69155.png)
    After confirming, ```samurai``` will call up again to initiate transaction-related information, you need to click again to confirm
![](http://lc-XLoqMObG.cn-n1.lcfile.com/ea2e8e85d4e1a5bd290f.png)
    After clicking, the transaction hash will be returned, and you can use this transaction hash to query in the alaya browser
![](http://lc-XLoqMObG.cn-n1.lcfile.com/4842586edae696c2c851.png)

8. How to proceed with the transfer?

    Similarly, you also need to enter the number of transactions, and the target account address.
![](http://lc-XLoqMObG.cn-n1.lcfile.com/3d9fb285439effb5bc63.png)

9. How to check whether the transaction is successful?

    If it is a redeem and transfer operation, open the ```samurai``` plugin to check the progress of the transaction.
![](http://lc-XLoqMObG.cn-n1.lcfile.com/0f59079c8d5dc8a1633e.png)

    If it is a publish operation, you can go to polkadot scan to view the specific information of the transaction, https://polkadot.js.org/apps/#/explorer
![](http://lc-XLoqMObG.cn-n1.lcfile.com/fdcad7102178516d969a.png)

10. How to switch network?

    Click the switch network button, expand the option box, and select the network you need.

    Alaya network corresponds to alaya and westend, Platon network corresponds to platon and polkadot.
![](http://lc-XLoqMObG.cn-n1.lcfile.com/a0abed351459eff2052b.png)

    Users can view the current network status in the local localStorage
![](http://lc-XLoqMObG.cn-n1.lcfile.com/a31c86c0c50704018575.png)
