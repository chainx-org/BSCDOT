import React, { createContext, FC, useEffect, useState } from 'react';

export interface NetWorkProviderData {
  netWork: NetWorkInfo;
  setNetWork: React.Dispatch<NetWorkInfo>;
  localNet: NetWorkInfo;
}

export interface NetWorkInfo {
  name: string;
  polkadotNetUrl: string;
  platonNetUrl: string;
}

export const NetWorkContext = createContext<NetWorkProviderData>({} as NetWorkProviderData);

export const NetWorkProvider: FC = ({children}) => {
  const localNet: NetWorkInfo = JSON.parse(window.localStorage.getItem('netWork') || '{}');
  const polkadotSetting = JSON.parse(window.localStorage.getItem('settings')!);
  const [netWork, setNetWork] = useState<NetWorkInfo>({
    name: localNet.name || '',
    polkadotNetUrl: localNet.polkadotNetUrl || '',
    platonNetUrl: localNet.platonNetUrl || '',
  });

  useEffect(() => {
    polkadotSetting.apiUrl === 'wss://westend-rpc.polkadot.io' ?
      setNetWork({
        name: 'Alaya 网络',
        polkadotNetUrl: polkadotSetting.apiUrl,
        platonNetUrl: 'https://platonnet.chainx.org/'
      })
      : setNetWork({
        name: 'Platon 网络',
        polkadotNetUrl: polkadotSetting.apiUrl,
        platonNetUrl: ''
      });
  }, [polkadotSetting.apiUrl]);

  useEffect(() => {
    window.localStorage.setItem('netWork', JSON.stringify(netWork));
  }, [netWork]);

  return (
    <NetWorkContext.Provider value={{
      netWork,
      setNetWork,
      localNet,
    }}>
      {children}
    </NetWorkContext.Provider>
  );
};
