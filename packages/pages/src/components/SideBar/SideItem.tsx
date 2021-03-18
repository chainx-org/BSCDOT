import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NodeItem } from "./index";

interface Props {
  node: NodeItem;
  id: number;
  recordType: number;
  statusNode: any;
}

function SideItem({ node, id, recordType, statusNode }: Props): React.ReactElement<Props> {
  return (
    <li className={`navItem ${recordType.toString() === id.toString() ? "statusRisk" : ""}`} onClick={() => statusNode(node, id)}>
      <NavLink to={node.link} exact activeClassName="selected">
        {recordType.toString() === id.toString() ? <>{node.icon_after}</> : <>{node.icon}</>}
        <span>{node.nodeName}</span>
      </NavLink>
    </li>
  );
}

export default SideItem;
