import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {Cell} from './components/Cell/Cell';
import CLOSE from './assets/icon-close.png';
import { PolkadotAccountsContext } from '@polkadot/react-components-chainx/PolkadotAccountsProvider';
import {NetWorkContext} from '@polkadot/react-components-chainx/NetWorkProvider';

const Wrapper = React.memo(styled.section`
  position: fixed;
  left: 50%;
  top: 5%;
  transform: translate(-50%);
  z-index: 999;
  max-height: 500px !important;
  overflow: auto;
  background: rgba(255, 255, 255);
  border: 1px solid #efefef;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  width: 312px;

  .header{
    height: 44px;

    img{
      width: 16px;
      height: 16px;
      margin: 20px 20px 8px;
    }
  }
`);


interface ToolTipConfigProps {
  list: object[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  listType: 'netWork' | 'accountList'
}

export function ToolTipConfig({list, isOpen, setIsOpen, listType}: ToolTipConfigProps): React.ReactElement<ToolTipConfigProps> {
  const {currentAccount} = useContext(PolkadotAccountsContext)
  const {netWork} = useContext(NetWorkContext)
  const _toggle = (): void => setIsOpen(false);

  const component =  <>
    {isOpen &&
    <Wrapper>
      <div className="header">
        <img src={CLOSE} onClick={_toggle}/>
      </div>
      {list.map(function (item: any) {
        return (
          <Cell
            key={Math.random()}
            isSelected={currentAccount === item.account || netWork.name === item.title}
            iconUrl={item.iconUrl}
            title={item.title}
            accountName={item.accountName}
            account={item.account}
            listType={listType}
            item={item}
          />
        );
      })}
    </Wrapper>}
  </>

  return (
    ReactDOM.createPortal(component, document.body)
  );
}
