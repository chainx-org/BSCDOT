import {ActionStatus} from '@polkadot/react-components/Status/types';

const creatStatusInfo = (statusInfo: ActionStatus, status: "success" | "error" | "event" | "queued" | "received",  message: string, address?: string) => {
  if(status === 'success'){
    statusInfo.account = address;
  }
  statusInfo.status = status
  statusInfo.message = message
}

export {
  creatStatusInfo
}
