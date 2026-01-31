export interface AnalysisResult {
  status: 'success' | 'error';
  message: string;
  graph?: {
    nodes: any[];
    edges: any[];
  };
  vulnerabilities?: string[];
}

export async function analyzeCode(code: string, moduleType: string): Promise<AnalysisResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock logic based on input
  if (code.includes('taint')) {
    return {
      status: 'success',
      message: 'Analysis complete: 1 vulnerability found.',
      vulnerabilities: ['Unsanitized input reaching sink at line 4'],
      graph: {
        nodes: [
          { id: '1', position: { x: 250, y: 0 }, data: { label: 'Source: req.query' }, type: 'input' },
          { id: '2', position: { x: 250, y: 100 }, data: { label: 'var x = input' } },
          { id: '3', position: { x: 250, y: 200 }, data: { label: 'Sink: db.query(x)' }, type: 'output', style: { background: '#fecaca', border: '1px solid #ef4444' } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Tainted Flow', style: { stroke: '#ef4444' } },
        ]
      }
    };
  }

  return {
    status: 'success',
    message: 'Analysis complete: No issues found.',
    graph: {
        nodes: [
          { id: '1', position: { x: 250, y: 0 }, data: { label: 'Start' }, type: 'input' },
          { id: '2', position: { x: 250, y: 100 }, data: { label: 'Process' } },
          { id: '3', position: { x: 250, y: 200 }, data: { label: 'End' }, type: 'output' },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e2-3', source: '2', target: '3' },
        ]
      }
  };
}