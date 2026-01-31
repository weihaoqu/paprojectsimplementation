export default function Home() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to CS336</h1>
        <p className="text-lg text-gray-600">
          Program Analysis for Security & Privacy
        </p>
        <div className="mt-6 prose text-gray-500">
          <p>
            This interactive portal is designed to help you master the techniques of static analysis.
            You will learn how to build tools that automatically reason about code behavior to identify
            vulnerabilities like SQL Injection, XSS, and Information Leaks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">Modules</h3>
          <p className="text-sm text-blue-700">9 core modules covering Taint Analysis, IFC, Symbolic Execution, and more.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h3 className="font-semibold text-green-900 mb-2">Interactive Labs</h3>
          <p className="text-sm text-green-700">Hands-on playgrounds to visualize CFGs, lattices, and analysis traces.</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h3 className="font-semibold text-purple-900 mb-2">Live Analysis</h3>
          <p className="text-sm text-purple-700">Run real OCaml-based analysis logic directly in your browser.</p>
        </div>
      </div>
    </div>
  );
}