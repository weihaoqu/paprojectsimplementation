'use client';

import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const latticeNodes: Node[] = [
  { id: 'top', position: { x: 250, y: 0 }, data: { label: 'TOP (⊤)' }, style: { background: '#fee2e2', border: '1px solid #ef4444' } },
  { id: 'secret', position: { x: 150, y: 100 }, data: { label: 'Secret' } },
  { id: 'confidential', position: { x: 350, y: 100 }, data: { label: 'Confidential' } },
  { id: 'public', position: { x: 250, y: 200 }, data: { label: 'Public' } },
  { id: 'bottom', position: { x: 250, y: 300 }, data: { label: 'BOTTOM (⊥)' }, style: { background: '#dcfce7', border: '1px solid #22c55e' } },
];

const latticeEdges: Edge[] = [
  { id: 'e1', source: 'top', target: 'secret', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2', source: 'top', target: 'confidential', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3', source: 'secret', target: 'public', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4', source: 'confidential', target: 'public', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e5', source: 'public', target: 'bottom', markerEnd: { type: MarkerType.ArrowClosed } },
];

interface LatticeExplorerProps {
  activePath?: string[];
}

export default function LatticeExplorer({ activePath = [] }: LatticeExplorerProps) {
  // Simple check: is this node/edge part of the active path?
  // For nodes: ID is in activePath.
  // For edges: source AND target are in activePath.

  const getStyle = (id: string, defaultColor: string, defaultBorder: string) => {
    const isActive = activePath.includes(id);
    return {
      background: isActive ? '#dbeafe' : defaultColor,
      border: isActive ? '2px solid #2563eb' : defaultBorder,
      fontWeight: isActive ? 'bold' : 'normal',
    };
  };

  const nodes: Node[] = [
    { id: 'top', position: { x: 250, y: 0 }, data: { label: 'TOP (⊤)' }, style: getStyle('top', '#fee2e2', '1px solid #ef4444') },
    { id: 'secret', position: { x: 150, y: 100 }, data: { label: 'Secret' }, style: getStyle('secret', '#ffffff', '1px solid #e5e7eb') },
    { id: 'confidential', position: { x: 350, y: 100 }, data: { label: 'Confidential' }, style: getStyle('confidential', '#ffffff', '1px solid #e5e7eb') },
    { id: 'public', position: { x: 250, y: 200 }, data: { label: 'Public' }, style: getStyle('public', '#ffffff', '1px solid #e5e7eb') },
    { id: 'bottom', position: { x: 250, y: 300 }, data: { label: 'BOTTOM (⊥)' }, style: getStyle('bottom', '#dcfce7', '1px solid #22c55e') },
  ];

  const edges: Edge[] = [
    { id: 'e1', source: 'top', target: 'secret', markerEnd: { type: MarkerType.ArrowClosed }, animated: activePath.includes('top') && activePath.includes('secret') },
    { id: 'e2', source: 'top', target: 'confidential', markerEnd: { type: MarkerType.ArrowClosed }, animated: activePath.includes('top') && activePath.includes('confidential') },
    { id: 'e3', source: 'secret', target: 'public', markerEnd: { type: MarkerType.ArrowClosed }, animated: activePath.includes('secret') && activePath.includes('public') },
    { id: 'e4', source: 'confidential', target: 'public', markerEnd: { type: MarkerType.ArrowClosed }, animated: activePath.includes('confidential') && activePath.includes('public') },
    { id: 'e5', source: 'public', target: 'bottom', markerEnd: { type: MarkerType.ArrowClosed }, animated: activePath.includes('public') && activePath.includes('bottom') },
  ];

  return (
    <div className="h-[400px] border border-gray-200 rounded-lg bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="bottom-right"
      >
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
