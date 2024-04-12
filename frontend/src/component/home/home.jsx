import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Slidebar';
import './home.css';
import { saveWorkflow } from "../../action/workflowaction"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
let id = 0;
const getId = () => `dndnode_${id++}`;
const flowKey = 'example-flow';

const home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const SaveRestore = () => { }
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      dispatch(saveWorkflow(JSON.stringify(flow)))

    }
  }, [reactFlowInstance])
  function executionPage() {
    navigate('/execution')
  }
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow-nodeType');
      const lebel = event.dataTransfer.getData('application/reactflow-lebel');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: lebel,
        type,
        position,
        data: { label: `${lebel}` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );
  return (
    <div className="dndflow" style={{ width: '80vw', height: '70vh', backgroundColor: '#F5F5F5' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            // nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Panel position="top">
              <button onClick={onSave}>save Workflow</button>
              <button className="btn-1" onClick={executionPage}>Execute Workflow</button>
            </Panel>

          </ReactFlow>
          <Sidebar />
        </div>

      </ReactFlowProvider>
    </div>
  )
}

export default home