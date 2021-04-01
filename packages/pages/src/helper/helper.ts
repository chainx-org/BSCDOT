import {ActionStatus} from '@polkadot/pages/components/Status/types';
import BigNumber from 'bignumber.js';

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

const tipInAlaya = 0.03
const tipInPlaton = 0.5



export {
  creatStatusInfo,
  toPrecision,
  classes,
  tipInAlaya,
  tipInPlaton
}
