export default function TopBar() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          Interactive Learning Environment
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Student Mode</span>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          S
        </div>
      </div>
    </header>
  );
}
