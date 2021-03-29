import Icon from "../Icon";
import React, { useCallback } from "react";
import styled from "styled-components";

export interface ButtonProps {
  className?: string;
  onClick?: () => void | Promise<void>;
  text?: string;
  icon?: any;
  Icons?: any;
  label?: React.ReactNode;
  isBasic?: boolean;
}

function Button({ className, onClick, text, icon, Icons, label, isBasic }: ButtonProps): React.ReactElement<ButtonProps> {
  const _onClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <button className={`ui-button${label ? ' hasLabel' : ''}${isBasic ? ' isBasic' : ''} ${className}`} onClick={_onClick}>
      {text}
      {label}
      {icon && <img src={icon} alt={icon} />}
      {Icons && <Icon icon={icon}/>}
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
  }

  &:not(.hasLabel) {
    padding: 0 0.7em;
    // .ui--Icon {
    //   padding: 0.6rem;
    //   margin: -0.6rem;
    // }
  }

  &.isBasic {
    border: 1px solid #fff;
  }

`);
