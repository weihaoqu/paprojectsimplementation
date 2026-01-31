'use client';

import React, { useState } from 'react';
import LatticeExplorer from '../visualizers/LatticeExplorer';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const levels = ['bottom', 'public', 'confidential', 'secret', 'top'];

// Simple dominance logic for this specific lattice
// Bottom < Public < (Secret, Confidential) < Top
// Secret and Confidential are incomparable.
const canFlowTo = (from: string, to: string) => {
  if (from === to) return true;
  if (from === 'bottom') return true;
  if (to === 'top') return true;
  
  if (from === 'public') {
    return ['secret', 'confidential'].includes(to);
  }
  
  return false;
};

export default function LatticeLab() {
  const [source, setSource] = useState('public');
  const [dest, setDest] = useState('secret');
  const [result, setResult] = useState<{ allowed: boolean; message: string } | null>(null);
  const [path, setPath] = useState<string[]>([]);

  const checkFlow = () => {
    const allowed = canFlowTo(source, dest);
    setResult({
      allowed,
      message: allowed 
        ? `Flow Allowed: ${source} ⊑ ${dest}` 
        : `Flow Denied: ${source} ⋢ ${dest} (Information Leak!)`
    });
    
    // Visualize the path if allowed, or just the nodes if not
    if (allowed) {
        // Simple heuristic for visualization path
        const p = [source, dest];
        if (source === 'bottom' && dest !== 'bottom') p.push('public');
        if (dest === 'top' && source !== 'top') p.push('secret'); // simplistic
        setPath([source, dest]); // For now just highlight start and end
    } else {
        setPath([source, dest]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
      <div className="flex flex-col gap-6 p-4 bg-white rounded-lg border border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Check Information Flow</h3>
          <p className="text-sm text-gray-500 mb-4">
            Select a source security level and a destination container. 
            The system will check if the flow preserves non-interference.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">From (Source)</label>
              <select 
                value={source}
                onChange={(e) => { setSource(e.target.value); setResult(null); }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              >
                {levels.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
              </select>
            </div>
            <div className="flex justify-center pt-5">
              <ArrowRight className="text-gray-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">To (Destination)</label>
              <select 
                value={dest}
                onChange={(e) => { setDest(e.target.value); setResult(null); }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              >
                {levels.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={checkFlow}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Verify Flow
          </button>
        </div>

        {result && (
          <div className={`mt-4 p-4 rounded-md flex items-start gap-3 ${result.allowed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {result.allowed ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <div>
              <p className="font-medium">{result.allowed ? 'Safe' : 'Violation'}</p>
              <p className="text-sm mt-1 opacity-90">{result.message}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-700 mb-2">Lattice Visualization</h3>
        <LatticeExplorer activePath={path} />
      </div>
    </div>
  );
}
