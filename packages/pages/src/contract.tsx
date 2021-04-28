import { decodeAddress } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import BigNumber from 'bignumber.js';
import { CoinInfo } from '@polkadot/pages/components/CoinInfoProvider';

const Ethers = require('ethers');
const Web3 = require('web3');
const coinInfo: CoinInfo = JSON.parse(window.localStorage.getItem('coinInfoList') || '{}');

const web3 = new Web3('https://data-seed-prebsc-1-s3.binance.org:8545');
let erc20Address: string;
let resourceID: string;
let chainID: number;

if (coinInfo.coinName === 'XBTC') {
  erc20Address = '0x39b7FBbC38e4963A5cBCAd8d4A8ACbA21391CC55';
  resourceID = '0x0000000000000000000000000000000000000000000000000000000000000001';
  chainID = 3;
} else if (coinInfo.coinName === 'PCX') {
  erc20Address = '0xDf0aFC545A3E819a7B69cD2D92df69Fa64606748';
  resourceID = '0x0000000000000000000000000000000000000000000000000000000000000003';
  chainID = 7;
} else if (coinInfo.coinName === 'DOT') {
  erc20Address = '0xf0723e55127406FcAA17C6B2E5d2e68459cF40a6';
  resourceID = '0x0000000000000000000000000000000000000000000000000000000000000002';
  chainID = 5;
}else {
  erc20Address = '0x39b7FBbC38e4963A5cBCAd8d4A8ACbA21391CC55';
  resourceID = '0x0000000000000000000000000000000000000000000000000000000000000001';
  chainID = 3;
}
// if(netWorkInfo.platonNetUrl){
//   web3 = new Web3(netWorkInfo.platonNetUrl);
// }else{
//   polkadotSetting.apiUrl === 'wss://supercube.pro/ws'? web3 = new Web3('https://platonnet.chainx.org/'): web3 = new Web3('')
// }
// let erc20Address: string;
// if(polkadotSetting.apiUrl === 'wss://supercube.pro/ws'){
//   erc20Address = 'atp18uylvwsppggu5wn458yxe0stetr7tpytyllaxc';
// }else if(polkadotSetting.apiUrl === 'wss://testnet-2.chainx.org/ws'){
//   erc20Address = 'atp15r65x5lwydl2m24c8yjz35pmykfvynd9gvf86m'
// }else{
//   erc20Address = 'atp18uylvwsppggu5wn458yxe0stetr7tpytyllaxc'
// }
const {ppos} = web3;
const bridge_abi = [
  {
    'inputs': [
      {
        'internalType': 'uint8',
        'name': 'chainID',
        'type': 'uint8'
      },
      {
        'internalType': 'address[]',
        'name': 'initialRelayers',
        'type': 'address[]'
      },
      {
        'internalType': 'uint256',
        'name': 'initialRelayerThreshold',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'fee',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'expiry',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint8',
        'name': 'destinationChainID',
        'type': 'uint8'
      },
      {
        'indexed': false,
        'internalType': 'bytes32',
        'name': 'resourceID',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'depositNonce',
        'type': 'uint64'
      }
    ],
    'name': 'Deposit',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'Paused',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint8',
        'name': 'originChainID',
        'type': 'uint8'
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'depositNonce',
        'type': 'uint64'
      },
      {
        'indexed': false,
        'internalType': 'enum Bridge.ProposalStatus',
        'name': 'status',
        'type': 'uint8'
      },
      {
        'indexed': false,
        'internalType': 'bytes32',
        'name': 'dataHash',
        'type': 'bytes32'
      }
    ],
    'name': 'ProposalEvent',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint8',
        'name': 'originChainID',
        'type': 'uint8'
      },
      {
        'indexed': false,
        'internalType': 'uint64',
        'name': 'depositNonce',
        'type': 'uint64'
      },
      {
        'indexed': false,
        'internalType': 'enum Bridge.ProposalStatus',
        'name': 'status',
        'type': 'uint8'
      },
      {
        'indexed': false,
        'internalType': 'bytes32',
        'name': 'dataHash',
        'type': 'bytes32'
      }
    ],
    'name': 'ProposalVote',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'relayer',
        'type': 'address'
      }
    ],
    'name': 'RelayerAdded',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'relayer',
        'type': 'address'
      }
    ],
    'name': 'RelayerRemoved',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'newThreshold',
        'type': 'uint256'
      }
    ],
    'name': 'RelayerThresholdChanged',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      }
    ],
    'name': 'RoleGranted',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      }
    ],
    'name': 'RoleRevoked',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'Unpaused',
    'type': 'event'
  },
  {
    'inputs': [],
    'name': 'DEFAULT_ADMIN_ROLE',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'MAX_RELAYERS',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'RELAYER_ROLE',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': '_chainID',
    'outputs': [
      {
        'internalType': 'uint8',
        'name': '',
        'type': 'uint8'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint8',
        'name': '',
        'type': 'uint8'
      }
    ],
    'name': '_depositCounts',
    'outputs': [
      {
        'internalType': 'uint64',
        'name': '',
        'type': 'uint64'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': '_expiry',
    'outputs': [
      {
        'internalType': 'uint40',
        'name': '',
        'type': 'uint40'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': '_fee',
    'outputs': [
      {
        'internalType': 'uint128',
        'name': '',
        'type': 'uint128'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': '_relayerThreshold',
    'outputs': [
      {
        'internalType': 'uint8',
        'name': '',
        'type': 'uint8'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'name': '_resourceIDToHandlerAddress',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      }
    ],
    'name': 'getRoleAdmin',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'getRoleMember',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      }
    ],
    'name': 'getRoleMemberCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'getRoleMemberIndex',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'grantRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'hasRole',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'paused',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'renounceRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'revokeRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint72',
        'name': 'destNonce',
        'type': 'uint72'
      },
      {
        'internalType': 'bytes32',
        'name': 'dataHash',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'relayer',
        'type': 'address'
      }
    ],
    'name': '_hasVotedOnProposal',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'relayer',
        'type': 'address'
      }
    ],
    'name': 'isRelayer',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newAdmin',
        'type': 'address'
      }
    ],
    'name': 'renounceAdmin',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'adminPauseTransfers',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'adminUnpauseTransfers',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'newThreshold',
        'type': 'uint256'
      }
    ],
    'name': 'adminChangeRelayerThreshold',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'relayerAddress',
        'type': 'address'
      }
    ],
    'name': 'adminAddRelayer',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'relayerAddress',
        'type': 'address'
      }
    ],
    'name': 'adminRemoveRelayer',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'handlerAddress',
        'type': 'address'
      },
      {
        'internalType': 'bytes32',
        'name': 'resourceID',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'tokenAddress',
        'type': 'address'
      }
    ],
    'name': 'adminSetResource',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'handlerAddress',
        'type': 'address'
      },
      {
        'internalType': 'bytes32',
        'name': 'resourceID',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'contractAddress',
        'type': 'address'
      },
      {
        'internalType': 'bytes4',
        'name': 'depositFunctionSig',
        'type': 'bytes4'
      },
      {
        'internalType': 'uint256',
        'name': 'depositFunctionDepositerOffset',
        'type': 'uint256'
      },
      {
        'internalType': 'bytes4',
        'name': 'executeFunctionSig',
        'type': 'bytes4'
      }
    ],
    'name': 'adminSetGenericResource',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'handlerAddress',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'tokenAddress',
        'type': 'address'
      }
    ],
    'name': 'adminSetBurnable',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint8',
        'name': 'originChainID',
        'type': 'uint8'
      },
      {
        'internalType': 'uint64',
        'name': 'depositNonce',
        'type': 'uint64'
      },
      {
        'internalType': 'bytes32',
        'name': 'dataHash',
        'type': 'bytes32'
      }
    ],
    'name': 'getProposal',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'enum Bridge.ProposalStatus',
            'name': '_status',
            'type': 'uint8'
          },
          {
            'internalType': 'uint200',
            'name': '_yesVotes',
            'type': 'uint200'
          },
          {
            'internalType': 'uint8',
            'name': '_yesVotesTotal',
            'type': 'uint8'
          },
          {
            'internalType': 'uint40',
            'name': '_proposedBlock',
            'type': 'uint40'
          }
        ],
        'internalType': 'struct Bridge.Proposal',
        'name': '',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': '_totalRelayers',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'newFee',
        'type': 'uint256'
      }
    ],
    'name': 'adminChangeFee',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'handlerAddress',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'tokenAddress',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amountOrTokenID',
        'type': 'uint256'
      }
    ],
    'name': 'adminWithdraw',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint8',
        'name': 'destinationChainID',
        'type': 'uint8'
      },
      {
        'internalType': 'bytes32',
        'name': 'resourceID',
        'type': 'bytes32'
      },
      {
        'internalType': 'bytes',
        'name': 'data',
        'type': 'bytes'
      }
    ],
    'name': 'deposit',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint8',
        'name': 'chainID',
        'type': 'uint8'
      },
      {
        'internalType': 'uint64',
        'name': 'depositNonce',
        'type': 'uint64'
      },
      {
        'internalType': 'bytes32',
        'name': 'resourceID',
        'type': 'bytes32'
      },
      {
        'internalType': 'bytes32',
        'name': 'dataHash',
        'type': 'bytes32'
      }
    ],
    'name': 'voteProposal',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint8',
        'name': 'chainID',
        'type': 'uint8'
      },
      {
        'internalType': 'uint64',
        'name': 'depositNonce',
        'type': 'uint64'
      },
      {
        'internalType': 'bytes32',
        'name': 'dataHash',
        'type': 'bytes32'
      }
    ],
    'name': 'cancelProposal',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint8',
        'name': 'chainID',
        'type': 'uint8'
      },
      {
        'internalType': 'uint64',
        'name': 'depositNonce',
        'type': 'uint64'
      },
      {
        'internalType': 'bytes',
        'name': 'data',
        'type': 'bytes'
      },
      {
        'internalType': 'bytes32',
        'name': 'resourceID',
        'type': 'bytes32'
      }
    ],
    'name': 'executeProposal',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address payable[]',
        'name': 'addrs',
        'type': 'address[]'
      },
      {
        'internalType': 'uint256[]',
        'name': 'amounts',
        'type': 'uint256[]'
      }
    ],
    'name': 'transferFunds',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

const erc20miner_abi = [
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': 'name',
        'type': 'string'
      },
      {
        'internalType': 'string',
        'name': 'symbol',
        'type': 'string'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'Paused',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': 'previousAdminRole',
        'type': 'bytes32'
      },
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': 'newAdminRole',
        'type': 'bytes32'
      }
    ],
    'name': 'RoleAdminChanged',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      }
    ],
    'name': 'RoleGranted',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      }
    ],
    'name': 'RoleRevoked',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'Unpaused',
    'type': 'event'
  },
  {
    'inputs': [],
    'name': 'DEFAULT_ADMIN_ROLE',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'MINTER_ROLE',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'PAUSER_ROLE',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }
    ],
    'name': 'allowance',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'burn',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'burnFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'decimals',
    'outputs': [
      {
        'internalType': 'uint8',
        'name': '',
        'type': 'uint8'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'subtractedValue',
        'type': 'uint256'
      }
    ],
    'name': 'decreaseAllowance',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      }
    ],
    'name': 'getRoleAdmin',
    'outputs': [
      {
        'internalType': 'bytes32',
        'name': '',
        'type': 'bytes32'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'getRoleMember',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      }
    ],
    'name': 'getRoleMemberCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'grantRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'hasRole',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'addedValue',
        'type': 'uint256'
      }
    ],
    'name': 'increaseAllowance',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'paused',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'renounceRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'role',
        'type': 'bytes32'
      },
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'revokeRole',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'sender',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'recipient',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'mint',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'pause',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'unpause',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

const blankFunctionSig = '0x00000000';
const blankFunctionDepositerOffset = 0;


const bridgeAddress = '0xeEc45984F86f35AF9F6489fd30a7f0aa655c08dB';
const handlerAddress = '0x04c20C38e015e52685ba7DC34E839960a23C03CC';
const erc20_minter_contract = new web3.eth.Contract(erc20miner_abi);
erc20_minter_contract.options.address = erc20Address;

const bridge_contract = new web3.eth.Contract(bridge_abi);
bridge_contract.options.address = bridgeAddress;

const hexlifyAmount = (value: number): string => {
  const HexCharacters: string = '0123456789abcdef';
  let hex = '';
  while (value) {
    hex = HexCharacters[value & 0x0f] + hex;
    value = Math.floor(value / 16);
  }
  if (hex.length) {
    if (hex.length % 2) { hex = '0' + hex; }
    return '0x' + hex;
  }
  return '0x00';
};

const amountToHex = (covertThis: number, padding: number): string => {
  return Ethers.utils.hexZeroPad(hexlifyAmount(covertThis), padding);
};

const addressToHex = (covertThis: number, padding: number): string => {
  return Ethers.utils.hexZeroPad(Ethers.utils.hexlify(covertThis), padding);
};


const createERCDepositData = (tokenAmountOrID: number, lenRecipientAddress: number, recipientAddress: string): string => {
  return '0x' +
    amountToHex(tokenAmountOrID, 32).substr(2) +      // Token amount or ID to deposit (32 bytes)
    addressToHex(lenRecipientAddress, 32).substr(2) + // len(recipientAddress)          (32 bytes)
    recipientAddress.substr(2);               // recipientAddress               (?? bytes)
};

const addressToPublicKey = (address: string): string => {
  return u8aToHex(decodeAddress(address));
};

const createApproveTransactionParameters = (from: string, amount: BigNumber) => {
  return {
    nonce: '0x00', // ignored by MetaMask
    to: erc20Address,
    from, // must match user's active address.
    value: '0', // Only required to send ether to the recipient from the initiating external account.
    data: erc20_minter_contract.methods.approve(handlerAddress, amount.toString()).encodeABI(),
  };
};

const createDepositTransactionParameters = (from: string, to: string, amount: BigNumber) => {
  return {
    nonce: '0x00', // ignored by MetaMask
    to: bridgeAddress,
    from, // must match user's active address.
    value: '0', // Only required to send ether to the recipient from the initiating external account.
    data: bridge_contract.methods.deposit(chainID, resourceID, createERCDepositData(amount.toNumber(), 32, to)).encodeABI(),
  };
};

const createTransferTransactionParameters = (from: string, amount: string, to: string) => {
  return {
    nonce: '0x00', // ignored by MetaMask
    to: erc20Address, // Required except during contract publications.
    from, // must match user's active address.
    value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data: erc20_minter_contract.methods.transfer(to, ((new BigNumber(amount)).times(1e18)).toString()).encodeABI(),
  };
};


export {
  blankFunctionSig,
  blankFunctionDepositerOffset,
  createERCDepositData,
  bridge_abi,
  erc20miner_abi,
  bridge_contract,
  erc20_minter_contract,
  ppos,
  createDepositTransactionParameters,
  createTransferTransactionParameters,
  createApproveTransactionParameters,
  bridgeAddress,
  erc20Address,
  handlerAddress,
  addressToPublicKey,
  web3
};
