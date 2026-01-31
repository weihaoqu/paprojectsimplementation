'use client';

import React, { useState } from 'react';
import CodeEditor from '../CodeEditor';
import { AlertTriangle, CheckCircle, Search } from 'lucide-react';

interface Finding {
  line: number;
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  astNode: string;
}

export default function SecretScannerLab() {
  const [code, setCode] = useState('const API_KEY = "sk_live_123456789";\nconst debug = true;\n\nfunction connect() {\n  const password = "password123";\n}');
  const [findings, setFindings] = useState<Finding[]>([]);

  const scan = () => {
    const newFindings: Finding[] = [];
    const lines = code.split('\n');

    lines.forEach((line, idx) => {
      // Mock AST-like detection logic
      if (line.includes('API_KEY') || line.includes('sk_live')) {
        newFindings.push({
          line: idx + 1,
          type: 'Hardcoded Secret',
          message: 'Potential API Key detected in variable declaration.',
          severity: 'high',
          astNode: 'VariableDeclarator > StringLiteral'
        });
      }
      if (line.includes('password') && line.includes('"')) {
        newFindings.push({
          line: idx + 1,
          type: 'Hardcoded Credential',
          message: 'Potential password detected string literal.',
          severity: 'high',
          astNode: 'VariableDeclarator > StringLiteral'
        });
      }
      if (line.includes('debug = true')) {
        newFindings.push({
          line: idx + 1,
          type: 'Insecure Configuration',
          message: 'Debug mode enabled in potential production code.',
          severity: 'medium',
          astNode: 'AssignmentExpression > BooleanLiteral'
        });
      }
    });

    setFindings(newFindings);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Source Code</h3>
          <button
            onClick={scan}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            <Search className="w-4 h-4" />
            Scan Code
          </button>
        </div>
        <div className="flex-1">
          <CodeEditor 
            initialValue={code} 
            onChange={(val) => setCode(val || '')} 
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-gray-700">Scanner Results (Mock AST Analysis)</h3>
        <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-y-auto">
          {findings.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <CheckCircle className="w-12 h-12 mb-2 text-gray-300" />
              <p>No issues detected (or scan not run)</p>
            </div>
          ) : (
            <div className="space-y-3">
              {findings.map((f, i) => (
                <div key={i} className={`p-4 rounded-md border-l-4 shadow-sm bg-white ${f.severity === 'high' ? 'border-red-500' : 'border-yellow-500'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${f.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                      <span className="font-bold text-gray-800">{f.type}</span>
                    </div>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">Line {f.line}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{f.message}</p>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase">Triggered Node:</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-purple-700 font-mono">{f.astNode}</code>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
