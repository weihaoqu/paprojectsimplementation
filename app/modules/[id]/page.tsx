import { getModule } from "@/lib/modules";
import { notFound } from "next/navigation";

import InteractiveLab from "@/components/InteractiveLab";
import LatticeLab from "@/components/labs/LatticeLab";
import CacheLab from "@/components/labs/CacheLab";
import SecretScannerLab from "@/components/labs/SecretScannerLab";
import TaintLiteLab from "@/components/labs/TaintLiteLab";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ModulePage({ params }: PageProps) {
  const { id } = await params;
  const module = getModule(id);

  if (!module) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{module.description}</p>
      </div>

      <div className="grid gap-6">
        {module.lessons.map((lesson, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Lesson {index + 1}: {lesson.title}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Objective</span>
                <p className="text-gray-700 mt-1">{lesson.objective}</p>
              </div>
              
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Content</span>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  {lesson.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-4">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Key Takeaway</span>
                <p className="text-blue-900 text-sm mt-1">{lesson.keyTakeaways}</p>
              </div>

              {lesson.deepDive && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wide flex items-center gap-1">
                    <span className="text-lg leading-none">🔍</span> Deep Dive
                  </span>
                  <div className="mt-2 text-sm text-gray-600 space-y-2">
                    <p>{lesson.deepDive.explanation}</p>
                    {lesson.deepDive.example && (
                      <div className="bg-gray-800 text-gray-200 p-3 rounded font-mono text-xs overflow-x-auto border border-gray-700">
                        <strong>Example:</strong> {lesson.deepDive.example}
                      </div>
                    )}
                    {lesson.deepDive.analogy && (
                      <div className="bg-amber-50 text-amber-900 p-3 rounded text-xs italic border border-amber-100">
                        💡 <strong>Analogy:</strong> {lesson.deepDive.analogy}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {id === "1" && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Lab: Taint Analysis Playground</h2>
          <InteractiveLab />
        </div>
      )}

      {id === "2" && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Lab: Information Flow Checker</h2>
          <LatticeLab />
        </div>
      )}

      {id === "3" && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Lab: Prime+Probe Simulator</h2>
          <CacheLab />
        </div>
      )}

      {id === "6" && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Lab: Secret Scanner Playground</h2>
          <SecretScannerLab />
        </div>
      )}

      {id === "9" && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Lab: Taint Propagation Trace</h2>
          <TaintLiteLab />
        </div>
      )}
    </div>
  );
}
