'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Entry' }, type: 'input' },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'Basic Block 1' } },
  { id: '3', position: { x: 400, y: 100 }, data: { label: 'Basic Block 2' } },
  { id: '4', position: { x: 250, y: 200 }, data: { label: 'Exit' }, type: 'output' },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
];

interface CFGVisualizerProps {
  nodes?: Node[];
  edges?: Edge[];
}

export default function CFGVisualizer({ nodes: propNodes, edges: propEdges }: CFGVisualizerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    if (propNodes) setNodes(propNodes);
    if (propEdges) setEdges(propEdges);
  }, [propNodes, propEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-[400px] border border-gray-200 rounded-lg bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
