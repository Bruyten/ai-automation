import { VideoConcept } from '../types';
import { Play, Clock, Eye } from 'lucide-react';

interface Props {
  concept: VideoConcept;
  index: number;
}

const sceneColors = [
  { bg: 'bg-neon-pink/10', border: 'border-neon-pink/30', text: 'text-neon-pink', dot: 'bg-neon-pink' },
  { bg: 'bg-brand-500/10', border: 'border-brand-500/30', text: 'text-brand-300', dot: 'bg-brand-400' },
  { bg: 'bg-neon-green/10', border: 'border-neon-green/30', text: 'text-neon-green', dot: 'bg-neon-green' },
];

export default function VideoConceptCard({ concept, index }: Props) {
  return (
    <div
      className="glass-card rounded-2xl p-5 space-y-4 animate-float-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-600/30 text-brand-300 text-xs font-bold">
              V{concept.id}
            </span>
            <h3 className="text-sm font-bold text-brand-100">{concept.title}</h3>
          </div>
          <p className="text-xs text-dark-200 leading-relaxed">{concept.angle}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neon-green/10 border border-neon-green/20">
          <Play size={10} className="text-neon-green fill-neon-green" />
          <span className="text-[10px] font-semibold text-neon-green">15-20s</span>
        </div>
      </div>

      <div className="px-3 py-2 rounded-xl bg-dark-800/80 border border-dark-600/50">
        <p className="text-xs text-dark-200 mb-0.5">Hook:</p>
        <p className="text-sm font-medium text-brand-100 italic">"{concept.hook}"</p>
      </div>

      <div className="space-y-2.5">
        {concept.scenes.map((scene, si) => (
          <div
            key={si}
            className={`${sceneColors[si].bg} border ${sceneColors[si].border} rounded-xl p-3 space-y-2`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${sceneColors[si].dot}`} />
              <span className={`text-xs font-semibold ${sceneColors[si].text}`}>
                Scene {scene.sceneNumber}: {scene.label}
              </span>
              <div className="flex items-center gap-1 ml-auto text-dark-300">
                <Clock size={10} />
                <span className="text-[10px]">{scene.timeRange}</span>
              </div>
            </div>
            <p className="text-xs text-brand-100/80 leading-relaxed">{scene.script}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Eye size={12} className="text-dark-300" />
        <span className="text-[10px] text-dark-300">Optimized for TikTok, Reels & Shorts</span>
      </div>
    </div>
  );
}
