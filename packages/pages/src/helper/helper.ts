import {ActionStatus} from '@polkadot/react-components/Status/types';
import BigNumber from 'bignumber.js';

const creatStatusInfo = (statusInfo: ActionStatus, status: "success" | "error" | "event" | "queued" | "received" | "sending",  message: string, address?: string) => {
  if(status === 'success'){
    statusInfo.account = address;
  }
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

export {
  creatStatusInfo,
  toPrecision
}
