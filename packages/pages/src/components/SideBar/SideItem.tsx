import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NodeItem } from "./index";
import { useLocation } from "react-router-dom";
interface Props {
  node: NodeItem;
  id: number;
  recordType: number;
  statusNode: any;
  pathname: any;
}

function SideItem({ node, id, recordType, statusNode,pathname }: Props): React.ReactElement<Props> {
  console.log(pathname.toString() === node.link)
  return (
    // <li className={`navItem ${recordType.toString() === id.toString() ? "statusRisk" : ""}`} onClick={() => statusNode(node, id)}>
    <li className={`navItem ${pathname.toString() === node.link ? "statusRisk" : ""}`}>
      <NavLink to={node.link} exact activeClassName="selected">
        {pathname.toString() === node.link ? <>{node.icon_after}</> : <>{node.icon}</>}
        <span>{node.nodeName}</span>
      </NavLink>
    </li>
  );
}

export default SideItem;
