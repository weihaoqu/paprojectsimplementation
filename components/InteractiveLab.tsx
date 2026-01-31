'use client';

import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import CFGVisualizer from './visualizers/CFGVisualizer';
import { analyzeCode, AnalysisResult } from '@/lib/analysisService';
import { Play } from 'lucide-react';

export default function InteractiveLab() {
  const [code, setCode] = useState('// Try defining a "taint" variable to see the flow\nlet x = source();\nsink(x);');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await analyzeCode(code, 'taint');
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Code Input</h3>
          <button
            onClick={handleRun}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Play className="w-4 h-4" />
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
        <div className="flex-1">
          <CodeEditor 
            initialValue={code} 
            onChange={(val) => setCode(val || '')} 
          />
        </div>
        {result && (
          <div className={`p-4 rounded-md border ${result.status === 'success' && result.vulnerabilities ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <p className={`font-medium ${result.status === 'success' && result.vulnerabilities ? 'text-red-800' : 'text-green-800'}`}>
              {result.message}
            </p>
            {result.vulnerabilities && (
              <ul className="list-disc list-inside mt-2 text-sm text-red-700">
                {result.vulnerabilities.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-gray-700">Analysis Visualization</h3>
        <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden bg-white">
          <CFGVisualizer 
            nodes={result?.graph?.nodes} 
            edges={result?.graph?.edges} 
          />
        </div>
      </div>
    </div>
  );
}
