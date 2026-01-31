'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
}

export default function CodeEditor({ 
  initialValue = '// Write your code here...', 
  language = 'javascript',
  onChange 
}: CodeEditorProps) {
  return (
    <div className="h-[400px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={initialValue}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
