// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';
import styled from 'styled-components';

declare type FnType = Function;
export declare function isFunction(value: unknown): value is FnType;
type Input$Type = 'number' | 'password' | 'text';

interface Props {
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onEnter?: () => void | boolean;
  onEscape?: () => void;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
  onKeyUp?: (event: React.KeyboardEvent<Element>) => void;
  onKeyPress?: (event: React.KeyboardEvent<Element>) => void;
  onPaste?: (event: React.ClipboardEvent<Element>) => void;
  placeholder?: string;
  type?: Input$Type;
  value?: string | null;
  tokenName?: string | undefined;
}


function Input ({ autoFocus = false, children, className, icon, onKeyPress, onBlur, onChange, onEnter, onEscape, onKeyDown, onKeyUp, onPaste, placeholder, type = 'text', value, tokenName }: Props): React.ReactElement<Props> {

  const _onBlur = useCallback(
    () => onBlur && onBlur(),
    [onBlur]
  );

  const _onChange = useCallback(
    ({ target }: React.SyntheticEvent<HTMLInputElement>): void =>
      onChange && onChange((target as HTMLInputElement).value),
    [onChange]
  );

  const _onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void =>
      onKeyDown && onKeyDown(event),
    [onKeyDown]
  );

  const _onKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      onKeyUp && onKeyUp(event);

      if (onEnter && event.keyCode === 13) {
        (event.target as HTMLInputElement).blur();
        isFunction(onEnter) && onEnter();
      }

      if (onEscape && event.keyCode === 27) {
        (event.target as HTMLInputElement).blur();
        onEscape();
      }
    },
    [onEnter, onEscape, onKeyUp]
  );

  const _onPaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>): void =>
      onPaste && onPaste(event),
    [onPaste]
  );

  return (
    <div className={`ui-input-layer ${className}`}>
      <input
        className={` ${className}`}
        autoFocus={autoFocus}
        value={value}
        onBlur={_onBlur}
        onChange={_onChange}
        onKeyDown={_onKeyDown}
        onKeyUp={_onKeyUp}
        placeholder={placeholder}
        type={type}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
        onPaste={_onPaste}
        onKeyPress={onKeyPress}
      />
        {
          tokenName ? <span className="flagtitle">{tokenName}</span>: null
        }
      {icon}
      {children}
    </div>
  );
}

export default React.memo(styled(Input)`
  &.ui-input-layer {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      height: 100%;
      border: 0;
      outline: none;
      background: transparent;
      &:focus {
        outline: none;
        border: 0;
      }
    }
    .flagtitle {
      padding: 16px;
      font-size: 14px;
      color: #444C5E;
    }
  }

`);

