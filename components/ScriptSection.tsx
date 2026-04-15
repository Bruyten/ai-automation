import { VideoConcept } from '../types';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  concepts: VideoConcept[];
}

export default function ScriptSection({ concepts }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyScript = (concept: VideoConcept) => {
    const full = concept.scenes
      .map(s => `[Scene ${s.sceneNumber}: ${s.label} — ${s.timeRange}]\n${s.script}`)
      .join('\n\n');
    navigator.clipboard.writeText(full);
    setCopiedId(`script-${concept.id}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5">
      {concepts.map((concept, ci) => (
        <div
          key={concept.id}
          className="glass-card rounded-2xl overflow-hidden animate-float-up"
          style={{ animationDelay: `${ci * 100}ms` }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-dark-600/50">
            <div className="flex items-center gap-2">
              <span className="text-sm">🎬</span>
              <h3 className="text-sm font-bold text-brand-200">
                Video {concept.id}: {concept.title}
              </h3>
            </div>
            <button
              onClick={() => copyScript(concept)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-600 hover:bg-dark-500 text-dark-200 hover:text-brand-200 transition-all text-xs"
            >
              {copiedId === `script-${concept.id}` ? (
                <><Check size={12} className="text-neon-green" /> Copied</>
              ) : (
                <><Copy size={12} /> Copy Script</>
              )}
            </button>
          </div>

          <div className="p-5 space-y-4">
            {concept.scenes.map((scene) => (
              <div key={scene.sceneNumber} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-8 rounded-full ${
                    scene.sceneNumber === 1 ? 'bg-neon-pink' :
                    scene.sceneNumber === 2 ? 'bg-brand-400' : 'bg-neon-green'
                  }`} />
                  <div>
                    <p className="text-xs font-semibold text-dark-100">
                      Scene {scene.sceneNumber}: {scene.label}
                    </p>
                    <p className="text-[10px] text-dark-300">{scene.timeRange}</p>
                  </div>
                </div>
                <div className="ml-4 pl-3 border-l-2 border-dark-600">
                  <p className="text-sm text-brand-100 leading-relaxed whitespace-pre-wrap">
                    {scene.script}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
