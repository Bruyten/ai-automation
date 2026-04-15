import { VideoConcept } from '../types';
import { Scissors, Music, Type, ZoomIn, Layers } from 'lucide-react';

interface Props {
  concepts: VideoConcept[];
}

export default function EditingSection({ concepts }: Props) {
  return (
    <div className="space-y-5">
      <div className="glass-card rounded-xl p-4 border-l-4 border-neon-orange">
        <p className="text-xs text-dark-100 leading-relaxed">
          <span className="font-semibold text-neon-orange">✂️ CapCut-Ready Instructions:</span> These editing notes are designed
          for CapCut or similar editors. Follow the timing, transitions, and effects for each scene.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <Scissors size={14} />, label: 'Cuts', value: '9 total', color: 'text-neon-pink' },
          { icon: <Music size={14} />, label: 'Audio', value: 'Trending', color: 'text-brand-400' },
          { icon: <Type size={14} />, label: 'Captions', value: 'Auto-sync', color: 'text-neon-green' },
          { icon: <ZoomIn size={14} />, label: 'Effects', value: 'Per-scene', color: 'text-neon-orange' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-3 text-center">
            <div className={`${stat.color} flex justify-center mb-1`}>{stat.icon}</div>
            <p className="text-[10px] text-dark-300">{stat.label}</p>
            <p className="text-xs font-semibold text-brand-200">{stat.value}</p>
          </div>
        ))}
      </div>

      {concepts.map((concept, ci) => (
        <div
          key={concept.id}
          className="glass-card rounded-2xl overflow-hidden animate-float-up"
          style={{ animationDelay: `${ci * 100}ms` }}
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-dark-600/50">
            <Layers size={14} className="text-neon-orange" />
            <h3 className="text-sm font-bold text-brand-200">
              Editing Plan — Video {concept.id}
            </h3>
          </div>

          <div className="p-5 space-y-3">
            {concept.scenes.map((scene) => (
              <div
                key={scene.sceneNumber}
                className="flex gap-3 p-3 rounded-xl bg-dark-800/60 border border-dark-600/30"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                  scene.sceneNumber === 1 ? 'bg-neon-pink/15' :
                  scene.sceneNumber === 2 ? 'bg-brand-500/15' : 'bg-neon-green/15'
                }`}>
                  {scene.sceneNumber === 1 ? '🎯' : scene.sceneNumber === 2 ? '🎭' : '🚀'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-semibold text-brand-200">
                      Scene {scene.sceneNumber}: {scene.label}
                    </p>
                    <span className="text-[10px] text-dark-300 px-1.5 py-0.5 bg-dark-700 rounded">
                      {scene.timeRange}
                    </span>
                  </div>
                  <p className="text-xs text-dark-100 leading-relaxed">{scene.editingNotes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
