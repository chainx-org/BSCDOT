import React, { createContext, FC, useEffect, useState } from 'react';

export interface NetWorkProviderData {
  netWork: NetWorkInfo;
  setNetWork: React.Dispatch<NetWorkInfo>;
  localNet: NetWorkInfo
  isAlaya: boolean;
  platonUnit: string;
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
  const [isAlaya, setIsAlaya] = useState<boolean>(true)
  const [platonUnit, setPlatonUnit] = useState('AKSM')
  const [netWork, setNetWork] = useState<NetWorkInfo>({
    name: localNet.name || '',
    polkadotNetUrl: localNet.polkadotNetUrl || '',
    platonNetUrl: localNet.platonNetUrl || '',
  });

  useEffect(() => {
    if( polkadotSetting.apiUrl === 'wss://kusama-testnet.chainx.org/ws'){
      setNetWork({
        name: 'Alaya 网络',
        polkadotNetUrl: polkadotSetting.apiUrl,
        platonNetUrl: 'https://platonnet.chainx.org/'
      })
      setIsAlaya(true)
      setPlatonUnit('AKSM')
    }else{
      setNetWork({
        name: 'Platon 网络',
        polkadotNetUrl: polkadotSetting.apiUrl,
        platonNetUrl: ''
      })
      setIsAlaya(false)
      setPlatonUnit('PDOT')
    }
  }, [polkadotSetting.apiUrl]);

  useEffect(() => {
    window.localStorage.setItem('netWork', JSON.stringify(netWork));
  }, [netWork]);

  return (
    <NetWorkContext.Provider value={{
      netWork,
      setNetWork,
      localNet,
      isAlaya,
      platonUnit
    }}>
      {children}
    </NetWorkContext.Provider>
  );
};
