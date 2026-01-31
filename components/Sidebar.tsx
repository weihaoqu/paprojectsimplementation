import Link from 'next/link';
import { BookOpen, Code, Shield, Network, Terminal, FileCode, Lock, Cpu, Eye } from 'lucide-react';

const modules = [
  { id: 1, title: 'Static Taint Analysis', icon: Shield, href: '/modules/1' },
  { id: 2, title: 'Information Flow Control', icon: Lock, href: '/modules/2' },
  { id: 3, title: 'Cache Side-Channel', icon: Cpu, href: '/modules/3' },
  { id: 4, title: 'Privacy Compliance', icon: Eye, href: '/modules/4' },
  { id: 5, title: 'Symbolic Execution', icon: Terminal, href: '/modules/5' },
  { id: 6, title: 'Secret Scanner', icon: FileCode, href: '/modules/6' },
  { id: 7, title: 'CFI Auditor', icon: Network, href: '/modules/7' },
  { id: 8, title: 'Memory Safety', icon: BugIcon, href: '/modules/8' },
  { id: 9, title: 'Taint Lite', icon: Shield, href: '/modules/9' },
];

function BugIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 2 1.88 1.88" />
            <path d="M14.12 3.88 16 2" />
            <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
            <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
            <path d="M12 20v-9" />
            <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
            <path d="M6 13H2" />
            <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
            <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
            <path d="M22 13h-4" />
            <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
    )
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-400" />
          CS336 Portal
        </h1>
        <p className="text-gray-400 text-xs mt-1">Program Analysis for Security</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {modules.map((module) => (
          <Link
            key={module.id}
            href={module.href}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors group"
          >
            <module.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
            {module.title}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500">
          Built with Next.js & OCaml
        </div>
      </div>
    </aside>
  );
}
