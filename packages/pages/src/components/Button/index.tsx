import Icon from "../Icon";
import React, { useCallback } from "react";
import styled from "styled-components";

export interface ButtonProps {
  className?: string;
  onClick?: () => void | Promise<void>;
  text?: string;
  icon?: string;
  img?: string;
  label?: React.ReactNode;
  isBasic?: boolean;
  isFull?: boolean;
  disabled?: boolean;
}

function Button({ className, onClick, text, img, icon, label, isBasic, isFull, disabled }: ButtonProps): React.ReactElement<ButtonProps> {
  const _onClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <button disabled={disabled} className={`ui-button${label ? ' hasLabel' : ''}${isBasic ? ' isBasic': ''} ${className}${isFull? ' isFull': ''}${disabled? ' disabled': ''}`} onClick={_onClick}>
      {icon && <Icon icon={icon}/>}
      {text}
      {label}
      {img && <img src={img} alt="" />}
    </button>
  );
}

export default React.memo(styled(Button)`
  text-align: center;
  vertical-align: middle;
  border: 0;
  outline: none;
  background: transparent;
  cursor: pointer;
  &.isConfirm {
    width: 212px;
    height: 52px;
    margin: 0 auto;
    background: #51abad;
    border-radius: 10px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #ffffff;
    opacity: 1;
    &:hover {
      opacity: 0.9;
    }
  }

  &:not(.hasLabel) {
    padding: 0 0.7em;
  }

  &.isBasic {
    border: 1px solid #fff;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }

  &.isFull {
    display: block;
    width: 100%;
    background: white;
    padding: 0.6rem;
    border-radius: 0.25rem;
    &:hover{
      background: #e1b15b;
    }
  }
  .ui--Icon {
    border-radius: 50%;
    box-sizing: content-box;
    height: 1rem;
    margin: -0.5rem 0;
    padding: 0.5rem;
    width: 1rem;
  }

  &.disabled{
    cursor: not-allowed;
  }

`);
