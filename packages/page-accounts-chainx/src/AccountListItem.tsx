// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DeriveAccountInfo } from '@polkadot/api-derive/types';
import { ActionStatus } from '@polkadot/react-components/Status/types';
import { RecoveryConfig } from '@polkadot/types/interfaces';

import React, { useState, useEffect } from 'react';
import { Label } from 'semantic-ui-react';
import styled from 'styled-components';
import { AddressInfo, AddressSmall, Badge, Balance, Button, ChainLock, Forget, Icon, IdentityIcon, InputTags, LinkExternal, Menu, Popup, Input } from '@polkadot/react-components';
import { useApi, useCall, useToggle } from '@polkadot/react-hooks';
import { Option } from '@polkadot/types';
import keyring from '@polkadot/ui-keyring';
import Backup from './modals/Backup';
import ChangePass from './modals/ChangePass';
import Derive from './modals/Derive';
import RecoverAccount from './modals/RecoverAccount';
import RecoverSetup from './modals/RecoverSetup';
import Transfer from './modals/Transfer';
import { useTranslation } from './translate';

import store from 'store';

import buttonChecked from './img/buttonChecked.svg';

function noop() { }

interface Props {
  address: string;
  className?: string;
  filter: string;
  isFavorite: boolean;
  toggleFavorite: (address: string) => void;
  onToggleAccountChecked: (address: string) => void;
  isAccountChecked: boolean;
}

function Account({ address, className, filter, isAccountChecked, isFavorite, onToggleAccountChecked, toggleFavorite }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const api = useApi();
  const info = useCall<DeriveAccountInfo>(api.api.derive.accounts.info as any, [address]);
  const recoveryInfo = useCall<RecoveryConfig | null>(api.api.query.recovery?.recoverable, [address], {
    transform: (opt: Option<RecoveryConfig>): RecoveryConfig | null =>
      opt.unwrapOr(null)
  });
  const [tags, setTags] = useState<string[]>([]);
  const [accName, setAccName] = useState('');
  const [genesisHash, setGenesisHash] = useState<string | null>(null);
  const [{ isDevelopment, isEditable, isExternal }, setFlags] = useState({ isDevelopment: false, isEditable: false, isExternal: false });
  const [isVisible, setIsVisible] = useState(true);
  const [isEditingName, toggleEditName] = useToggle();
  const [isEditingTags, toggleEditTags] = useToggle();
  const [isBackupOpen, toggleBackup] = useToggle();
  const [isDeriveOpen, toggleDerive] = useToggle();
  const [isForgetOpen, toggleForget] = useToggle();
  const [isIdentityOpen, toggleIdentity] = useToggle();
  const [isPasswordOpen, togglePassword] = useToggle();
  const [isRecoverAccountOpen, toggleRecoverAccount] = useToggle();
  const [isRecoverSetupOpen, toggleRecoverSetup] = useToggle();
  const [isSettingsOpen, toggleSettings] = useToggle();
  const [isTransferOpen, toggleTransfer] = useToggle();

  const _setTags = (tags: string[]): void => setTags(tags.sort());

  useEffect((): void => {
    const { identity, nickname } = info || {};

    if (api.api.query.identity && api.api.query.identity.identityOf) {
      if (identity?.display) {
        setAccName(identity.display);
      }
    } else if (nickname) {
      setAccName(nickname);
    }
  }, [info]);

  useEffect((): void => {
    const account = keyring.getAccount(address);

    setGenesisHash(account?.meta.genesisHash || null);
    setFlags({
      isDevelopment: account?.meta.isTesting || false,
      isEditable: (account && !(account.meta.isInjected || account.meta.isHardware)) || false,
      isExternal: account?.meta.isExternal || false
    });
    _setTags(account?.meta.tags || []);
    setAccName(account?.meta.name || '');
  }, [address]);

  useEffect((): void => {
    if (filter.length === 0) {
      setIsVisible(true);
    } else {
      const _filter = filter.toLowerCase();

      setIsVisible(
        tags.reduce((result: boolean, tag: string): boolean => {
          return result || tag.toLowerCase().includes(_filter);
        }, accName.toLowerCase().includes(_filter))
      );
    }
  }, [accName, filter, tags]);

  if (!isVisible) {
    return null;
  }

  const _saveName = (): void => {
    toggleEditName();

    const meta = { name: accName, whenEdited: Date.now() };

    if (address) {
      try {
        const currentKeyring = keyring.getPair(address);

        currentKeyring && keyring.saveAccountMeta(currentKeyring, meta);
      } catch (error) {
        keyring.saveAddress(address, meta);
      }
    }
  };

  const _onForget = (): void => {
    if (!address) {
      return;
    }

    const status: Partial<ActionStatus> = {
      account: address,
      action: 'forget'
    };

    try {
      keyring.forgetAccount(address);
      status.status = 'success';
      status.message = t('account forgotten');
    } catch (error) {
      status.status = 'error';
      status.message = error.message;
    }
  };

  const _onGenesisChange = (genesisHash: string | null): void => {
    const account = keyring.getPair(address);

    account && keyring.saveAccountMeta(account, { ...account.meta, genesisHash });

    setGenesisHash(genesisHash);
  };

  const _onFavorite = (): void => toggleFavorite(address);

  return (
    <tr className={className}>
      <td className='top'>
        <AddressSmall
          isLink
          onClickName={toggleEditName}
          overrideName={
            isEditingName
              ? (
                <Input
                  autoFocus
                  className='name--input'
                  defaultValue={accName}
                  onBlur={_saveName}
                  onChange={setAccName}
                  onEnter={_saveName}
                  withLabel={false}
                />
              )
              : undefined
          }
          toggle={isEditingName}
          value={address}
        />
        {isBackupOpen && (
          <Backup
            address={address}
            key='modal-backup-account'
            onClose={toggleBackup}
          />
        )}
        {isDeriveOpen && (
          <Derive
            from={address}
            key='modal-derive-account'
            onClose={toggleDerive}
          />
        )}
        {isForgetOpen && (
          <Forget
            address={address}
            key='modal-forget-account'
            onClose={toggleForget}
            onForget={_onForget}
          />
        )}
        {isIdentityOpen && (
          <Identity
            address={address}
            key='modal-identity'
            onClose={toggleIdentity}
          />
        )}
        {isPasswordOpen && (
          <ChangePass
            address={address}
            key='modal-change-pass'
            onClose={togglePassword}
          />
        )}
        {isTransferOpen && (
          <Transfer
            key='modal-transfer'
            onClose={toggleTransfer}
            senderId={address}
          />
        )}
        {isRecoverAccountOpen && (
          <RecoverAccount
            address={address}
            key='recover-account'
            onClose={toggleRecoverAccount}
          />
        )}
        {isRecoverSetupOpen && (
          <RecoverSetup
            address={address}
            key='recover-setup'
            onClose={toggleRecoverSetup}
          />
        )}
      </td>
      <td className='middle'>
        {/* <AddressInfo
          address={address}
          withBalance
          withBalanceToggle
          withExtended={false}
        /> */}
        <Balance className='accountBox--all'
          label={`PCX`}
          params={address} />

      </td>
      <td className='middle'>
        {/* <AddressInfo
          address={address}
          withBalance={false}
          withExtended
        /> */}
        <Balance className='accountBox--all'
          label={`PCX`}
          params={address} />

      </td>
      <td className='number middle samewidth'>
        {isAccountChecked ? <Button
          isPrimary
          label={t('')}
          // isSecondary={true}
          onClick={noop}
        >
          <img src={buttonChecked}
            width='17px' />
        </Button>
          : <Button
            isBasic={true}
            // isSecondary={true}
            label={t('Change')}
            onClick={() => {
              store.set('accountMain', address);
              onToggleAccountChecked && onToggleAccountChecked(address);
            }}
          />}
        <Popup
          className='theme--default'
          onClose={toggleSettings}
          open={isSettingsOpen}
          position='bottom right'
          trigger={
            <Button
              icon='setting'
              onClick={toggleSettings}
              size='small'
            />
          }
        >
          <Menu
            onClick={toggleSettings}
            text
            vertical
          >
            <Menu.Item
              disabled={!api.api.tx.identity?.setIdentity}
              onClick={toggleIdentity}
            >
              {t('Set on-chain identity')}
            </Menu.Item>
            {/* <Menu.Item
              disabled={!isEditable || isExternal}
              onClick={toggleDerive}
            >
              {t('Derive account via derivation path')}
            </Menu.Item> */}
            <Menu.Item
              disabled={!isEditable || isExternal || isDevelopment}
              onClick={toggleBackup}
            >
              {t('Create a backup file for this account')}
            </Menu.Item>
            <Menu.Item
              disabled={!isEditable || isExternal || isDevelopment}
              onClick={togglePassword}
            >
              {t("Change this account's password")}
            </Menu.Item>
            <Menu.Item
              disabled={!isEditable || isDevelopment}
              onClick={toggleForget}
            >
              {t('Forget this account')}
            </Menu.Item>
            {/* {api.api.tx.recovery?.createRecovery && (
              <>
                <Menu.Divider />
                {!recoveryInfo && (
                  <Menu.Item onClick={toggleRecoverSetup}>
                    {t('Make recoverable')}
                  </Menu.Item>
                )}
                <Menu.Item onClick={toggleRecoverAccount}>
                  {t('Initiate recovery for another')}
                </Menu.Item>
              </>
            )} */}
            {/* {!api.isDevelopment && (
              <>
                <Menu.Divider />
                <ChainLock
                  className='accounts--network-toggle'
                  genesisHash={genesisHash}
                  onChange={_onGenesisChange}
                  preventDefault
                />
              </>
            )} */}
          </Menu>
        </Popup>
      </td>
    </tr>
  );
}

export default styled(Account)`
  .accounts--Account-buttons {
    text-align: right;
  }

  .tags--toggle {
    cursor: pointer;
    width: 100%;
    min-height: 1.5rem;

    label {
      cursor: pointer;
    }
  }

  .name--input {
    width: 16rem;
  }

  .samewidth button:first-child {
    min-width: 6.5rem;
  }
`;
