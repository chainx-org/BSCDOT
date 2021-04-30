import {ActionStatus} from '@polkadot/pages/components/Status/types';
import BigNumber from 'bignumber.js';
import { web3 } from '@polkadot/pages/contract';

const creatStatusInfo = (statusInfo: ActionStatus, status: string,message: string) => {
  statusInfo.status = status
  statusInfo.message = message
}

const toPrecision = (value: number, precision = 0, paddingZero = true): number | string => {
  precision = Number(precision);
  const big = new BigNumber(value).dividedBy(Math.pow(10, precision));

  if (paddingZero) {
    return big.toFixed(precision);
  } else {
    return big.toNumber();
  }
}

const  classes = (...classNames: (boolean | null | string | undefined)[]): string =>  {
  return classNames
    .filter((className): boolean => !!className)
    .join(' ');
}

const length = 5;

const shortenHash = (hash: string): string => {
  if (hash.length > 2 * length) {
    return hash.substring(0, 5) + '...' + hash.substring(hash.length - 5)
  }else{
    return hash
  }
}

const blockNumberToDate = async (blockNumber: number) => {
  const {timestamp} = await web3.eth.getBlock(blockNumber);
  return timestamp * 1000
};

const tipInXBTC: BigNumber = new BigNumber(0)
const tipInDOT: BigNumber = new BigNumber(0.5)
const tipInPCX: BigNumber = new BigNumber(0.1)

export {
  creatStatusInfo,
  toPrecision,
  classes,
  tipInXBTC,
  tipInDOT,
  tipInPCX,
  shortenHash,
  blockNumberToDate
}
