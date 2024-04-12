import React from 'react';
import "./home.css"

export default () => {
  const onDragStart = (event, nodeType,lebel) => {
    event.dataTransfer.setData('application/reactflow-nodeType', nodeType);
    event.dataTransfer.setData('application/reactflow-lebel', lebel);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className='node_div'>
      <div  className="dndnode input node" onDragStart={(event) => onDragStart(event, 'input','filter')} draggable>
        filter Node
      </div>
      <div className="dndnode node" onDragStart={(event) => onDragStart(event, 'default','wait')} draggable>
      wait Node
      </div>
      <div className="dndnode node" onDragStart={(event) => onDragStart(event, 'default','convert')} draggable>
      convert Node
      </div>
      <div className="dndnode output node" onDragStart={(event) => onDragStart(event, 'output','send')} draggable>
      send Node
      </div>
    </aside>
  );
};