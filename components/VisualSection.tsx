import { VideoConcept } from '../types';
import { Eye, Palette } from 'lucide-react';

interface Props {
  concepts: VideoConcept[];
}

export default function VisualSection({ concepts }: Props) {
  return (
    <div className="space-y-5">
      {concepts.map((concept, ci) => (
        <div
          key={concept.id}
          className="glass-card rounded-2xl overflow-hidden animate-float-up"
          style={{ animationDelay: `${ci * 100}ms` }}
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-dark-600/50">
            <Eye size={14} className="text-brand-400" />
            <h3 className="text-sm font-bold text-brand-200">
              Visual Plan — Video {concept.id}
            </h3>
          </div>

          <div className="p-5 space-y-4">
            {concept.scenes.map((scene) => (
              <div
                key={scene.sceneNumber}
                className="rounded-xl border border-dark-500/50 overflow-hidden"
              >
                <div className={`px-4 py-2 flex items-center gap-2 ${
                  scene.sceneNumber === 1 ? 'bg-neon-pink/10 border-b border-neon-pink/20' :
                  scene.sceneNumber === 2 ? 'bg-brand-500/10 border-b border-brand-500/20' :
                  'bg-neon-green/10 border-b border-neon-green/20'
                }`}>
                  <Palette size={12} className={
                    scene.sceneNumber === 1 ? 'text-neon-pink' :
                    scene.sceneNumber === 2 ? 'text-brand-400' : 'text-neon-green'
                  } />
                  <span className="text-xs font-semibold text-brand-200">
                    Scene {scene.sceneNumber}: {scene.label} ({scene.timeRange})
                  </span>
                </div>
                <div className="p-4 bg-dark-800/50">
                  <p className="text-sm text-brand-100/80 leading-relaxed">{scene.visual}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
