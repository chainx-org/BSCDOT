import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NodeItem } from './index';

interface Props{
  node: NodeItem;
  id: number;
}

function SideItem({node, id}: Props): React.ReactElement<Props>{
  const [recordType, setRecordType] = useState(0);

  function statusNode(node: NodeItem, index: number) {
    setRecordType(index)
  }


  return (
    <li className={`navItem ${recordType === id ? "statusRisk" : ''}`} onClick={() => statusNode(node, id)}>
      <NavLink to={node.link} exact activeClassName="selected">
        {node.icon}
        <span>{node.nodeName}</span>
      </NavLink>
    </li>
  )
}

export default SideItem
