'use client';

import React, { useState } from 'react';
import { Clock, Database, Activity } from 'lucide-react';

interface CacheLine {
  owner: 'attacker' | 'victim' | 'empty';
  address: number | null;
}

interface HistoryItem {
  id: number;
  actor: string;
  action: string;
  result: string;
}

export default function CacheLab() {
  const [cache, setCache] = useState<CacheLine[]>(Array(4).fill({ owner: 'empty', address: null }));
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Mapping: Address % 4 = Set Index
  
  const prime = () => {
    const newCache = cache.map((_, idx) => ({
      owner: 'attacker' as const,
      address: 100 + idx // Attacker addresses
    }));
    setCache(newCache);
    addHistory('Attacker', 'Prime', 'Filled entire cache');
  };

  const victimAccess = (addr: number) => {
    const setIndex = addr % 4;
    const newCache = [...cache];
    // Victim evicts whatever is there
    newCache[setIndex] = { owner: 'victim', address: addr };
    setCache(newCache);
    addHistory('Victim', `Access ${addr}`, `Mapped to Set ${setIndex}, Evicted ${cache[setIndex].owner}`);
  };

  const probe = (setIndex: number) => {
    const line = cache[setIndex];
    // If owner is still attacker, it's a HIT (Fast). 
    // If owner is victim (or empty/evicted), it's a MISS (Slow) - effectively we have to fetch from memory.
    // In Prime+Probe, Attacker wants to see if *their* data is still there.
    
    const isHit = line.owner === 'attacker';
    const time = isHit ? 'FAST (Cycle count: 10)' : 'SLOW (Cycle count: 200)';
    const inference = isHit ? 'Victim did NOT access this set' : 'Victim ACCESSED this set!';
    
    addHistory('Attacker', `Probe Set ${setIndex}`, `${time} -> ${inference}`);
  };

  const addHistory = (actor: string, action: string, result: string) => {
    setHistory(prev => [{ actor, action, result, id: Date.now() }, ...prev].slice(0, 5));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" /> Cache State (Direct Mapped)
          </h3>
          <div className="mt-4 space-y-2">
            {cache.map((line, idx) => (
              <div key={idx} className={`p-3 border rounded flex justify-between items-center ${
                line.owner === 'attacker' ? 'bg-red-100 border-red-300' : 
                line.owner === 'victim' ? 'bg-blue-100 border-blue-300' : 'bg-gray-100'
              }`}>
                <span className="font-mono text-sm text-gray-500">Set {idx}</span>
                <span className={`font-bold ${line.owner === 'attacker' ? 'text-red-700' : 'text-blue-700'}`}>
                  {line.owner === 'empty' ? 'Empty' : `${line.owner.toUpperCase()} [0x${line.address}]`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-gray-700">Attacker Actions</h4>
          <button onClick={prime} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            1. Prime (Fill Cache)
          </button>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(idx => (
              <button key={idx} onClick={() => probe(idx)} className="flex-1 bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded hover:bg-red-200 text-sm">
                Probe {idx}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-gray-700">Victim Actions (Simulated)</h4>
          <div className="flex gap-2">
            <button onClick={() => victimAccess(0xA0)} className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition">
              Access 0xA0 (Set 0)
            </button>
            <button onClick={() => victimAccess(0xB1)} className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition">
              Access 0xB1 (Set 1)
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-green-600" /> Activity Log
        </h3>
        <div className="space-y-3">
          {history.map((h, i) => (
            <div key={i} className="bg-white p-3 rounded shadow-sm border border-gray-100 text-sm">
              <div className="flex justify-between mb-1">
                <span className={`font-bold ${h.actor === 'Attacker' ? 'text-red-600' : 'text-blue-600'}`}>{h.actor}</span>
                <span className="text-gray-400">{h.action}</span>
              </div>
              <div className="text-gray-700">{h.result}</div>
            </div>
          ))}
          {history.length === 0 && <p className="text-gray-400 italic">No activity yet.</p>}
        </div>
      </div>
    </div>
  );
}
