const Web3 = require('web3');
const { bridge_abi, erc20miner_abi, createERCDepositData } = require('@polkadot/pages/src/contract')
const web3 = new Web3('http://127.0.0.1:6789');
// const ppos = web3.ppos
//
// async function ccc(){
//   let reply = await ppos.rpc('platon_accounts')
//   console.log('reply: ', reply)
// }
// ccc()

const ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
const RELAYER_ROLE = "0xe2b7fb3b832174769106daebcfd6d1970523240dda11281102db9363b83b0dc4";
const MINTER_ROLE = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
const PAUSER_ROLE = "0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a";

const adminAddress = "atx18hqda4eajphkfarxaa2rutc5dwdwx9z5xzkega";
const ghjieAddress = "atx1j4ncnc4ajm8ut0nvg2n34uedtz3kuecmsdf7qd";
const rjmanAddress = "atx1sy2tvmghdv47hwz89yu9wz2y29nd0frr0578e3";

const bridgeAddress = "atx1762m2ryuvnnrk3d9q6gfy6whk29n59xu34typ5";
const handlerAddress = "atx1t3zvgf73mmhzax24epgv02vqznzw24a5m78cnz";
const erc20Address = "atx1lfhrcc6xectcfe850kf83rcntlw0ha7wck9qjz";
const resourceID = "0x0000000000000000000000000000000000000000000000000000000000000000";


const erc20_minter_contract = new web3.platon.Contract(erc20miner_abi);
erc20_minter_contract.options.address = erc20Address;
erc20_minter_contract.options.from = adminAddress;
// console.log(erc20_minter_contract)

const bridge_contract = new web3.platon.Contract(bridge_abi);
bridge_contract.options.address = bridgeAddress;
bridge_contract.options.from = adminAddress;
// console.log('bri1: ',bridge_contract.methods)
const PolkadotRecipient = "0x1cbd2d43530a44705ad088af313e18f80b53ef16b36177cd4b77b846f2a5f07c"

// bridge_contract.methods.deposit(1, resourceID, createERCDepositData(10, 20 ,PolkadotRecipient)).send({from: adminAddress, value: 0, gasPrice: 1, gas: 2000000})
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


erc20_minter_contract.methods.balanceOf(adminAddress).call()
.then(console.log);

// bridge_contract.getPastEvents('Deposit', {
//   fromBlock: 0,
//   toBlock: 'latest'
// }, function(error, events){ console.log(events); });

// bridge_contract.getPastEvents('ProposalEvent', {
//   fromBlock: 0,
//   toBlock: 'latest'
// }, function(error, events){ console.log(events); });

// console.log(bridge_contract.methods.deposit(1, resourceID, createERCDepositData(10, 32 ,ghjieAddress)))


