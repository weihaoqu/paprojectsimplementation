'use client';

import React, { useState } from 'react';
import { ArrowRight, AlertOctagon, RefreshCw } from 'lucide-react';

interface Instruction {
  id: number;
  code: string;
  type: 'source' | 'assign' | 'sink' | 'clean';
}

const instructions: Instruction[] = [
  { id: 1, code: 'x = get_user_input()', type: 'source' },
  { id: 2, code: 'y = x', type: 'assign' },
  { id: 3, code: 'z = "constant"', type: 'clean' },
  { id: 4, code: 'log(z)', type: 'sink' },
  { id: 5, code: 'log(y)', type: 'sink' },
];

export default function TaintLiteLab() {
  const [pc, setPc] = useState(0); // Program Counter (index of next instruction)
  const [taintedVars, setTaintedVars] = useState<Set<string>>(new Set());
  const [logs, setLogs] = useState<string[]>([]);

  const reset = () => {
    setPc(0);
    setTaintedVars(new Set());
    setLogs([]);
  };

  const step = () => {
    if (pc >= instructions.length) return;

    const instr = instructions[pc];
    const newTainted = new Set(taintedVars);
    let logMsg = '';

    // Simple parsing logic
    const parts = instr.code.split(' ');
    const targetVar = parts[0]; // For assignments
    const sourceVar = parts[2]; // For assignments (simple) or arg for sinks

    switch (instr.type) {
      case 'source':
        newTainted.add(targetVar);
        logMsg = `[Source] '${targetVar}' is now TAINTED.`;
        break;
      case 'assign':
        // Check if right-hand side is tainted
        // In "y = x", parts[2] is 'x'
        if (taintedVars.has(sourceVar)) {
          newTainted.add(targetVar);
          logMsg = `[Propagate] Taint flowed from '${sourceVar}' to '${targetVar}'.`;
        } else {
          newTainted.delete(targetVar); // Overwrite with clean
          logMsg = `[Assign] '${targetVar}' assigned clean value from '${sourceVar}'.`;
        }
        break;
      case 'clean':
        newTainted.delete(targetVar);
        logMsg = `[Clean] '${targetVar}' is now CLEAN.`;
        break;
      case 'sink':
        // format: log(z) -> var is 'z' (roughly)
        const arg = instr.code.match(/\(([^)]+)\)/)?.[1] || '';
        if (taintedVars.has(arg)) {
          logMsg = `❌ VIOLATION! Tainted data '${arg}' reached a sink!`;
        } else {
          logMsg = `✅ Safe. '${arg}' reaching sink is clean.`;
        }
        break;
    }

    setTaintedVars(newTainted);
    setLogs(prev => [...prev, logMsg]);
    setPc(pc + 1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200 h-[500px]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Execution Trace</h3>
          <button onClick={reset} className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>
        
        <div className="flex-1 bg-white rounded border border-gray-200 overflow-hidden flex flex-col">
          {instructions.map((inst, idx) => (
            <div 
              key={inst.id} 
              className={`px-4 py-2 flex justify-between items-center border-b border-gray-50 last:border-0 ${
                idx === pc ? 'bg-blue-100 border-l-4 border-l-blue-500' : 'text-gray-600'
              }`}
            >
              <code className="font-mono text-sm">{inst.code}</code>
              {idx === pc && <span className="text-xs text-blue-700 font-bold">NEXT</span>}
            </div>
          ))}
        </div>

        <button
          onClick={step}
          disabled={pc >= instructions.length}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
        >
          Step Execution <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Variable State</h3>
          <div className="grid grid-cols-3 gap-2">
            {['x', 'y', 'z'].map(v => (
              <div key={v} className={`p-3 rounded border text-center ${
                taintedVars.has(v) ? 'bg-red-100 border-red-300 text-red-800' : 'bg-green-100 border-green-300 text-green-800'
              }`}>
                <div className="font-bold text-lg">{v}</div>
                <div className="text-xs uppercase font-bold">{taintedVars.has(v) ? 'Tainted' : 'Clean'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-700 mb-2">Analysis Log</h3>
          <div className="flex-1 bg-gray-900 rounded p-4 overflow-y-auto text-sm font-mono space-y-1">
            {logs.length === 0 && <span className="text-gray-500">Waiting to start...</span>}
            {logs.map((log, i) => (
              <div key={i} className={`${log.includes('VIOLATION') ? 'text-red-400 font-bold' : 'text-green-400'}`}>
                {log.includes('VIOLATION') && <AlertOctagon className="inline w-3 h-3 mr-1" />}
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
