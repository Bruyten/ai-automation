import { VideoConcept } from '../types';
import { Copy, Check, Wand2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  concepts: VideoConcept[];
}

export default function AIPromptSection({ concepts }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="glass-card rounded-xl p-4 border-l-4 border-brand-500">
        <p className="text-xs text-dark-100 leading-relaxed">
          <span className="font-semibold text-brand-200">💡 Usage:</span> Copy these prompts into your AI video generator
          (Runway ML, Pika Labs, Kling AI, or similar). Each prompt is optimized for 3-5 second vertical clips at 1080×1920 resolution.
        </p>
      </div>

      {concepts.map((concept, ci) => (
        <div
          key={concept.id}
          className="glass-card rounded-2xl overflow-hidden animate-float-up"
          style={{ animationDelay: `${ci * 100}ms` }}
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-dark-600/50">
            <Wand2 size={14} className="text-brand-400" />
            <h3 className="text-sm font-bold text-brand-200">
              AI Prompts — Video {concept.id}
            </h3>
          </div>

          <div className="p-5 space-y-3">
            {concept.scenes.map((scene) => {
              const id = `prompt-${concept.id}-${scene.sceneNumber}`;
              return (
                <div
                  key={scene.sceneNumber}
                  className="rounded-xl bg-dark-800/80 border border-dark-600/50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-dark-600/30">
                    <span className="text-xs font-semibold text-dark-100">
                      Scene {scene.sceneNumber}: {scene.label}
                    </span>
                    <button
                      onClick={() => copyPrompt(scene.aiPrompt, id)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-dark-600 hover:bg-dark-500 text-dark-200 hover:text-brand-200 transition-all text-[10px]"
                    >
                      {copiedId === id ? (
                        <><Check size={10} className="text-neon-green" /> Copied</>
                      ) : (
                        <><Copy size={10} /> Copy</>
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neon-green/80 font-mono leading-relaxed">
                      {scene.aiPrompt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
