import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  hooks: string[];
}

export default function HooksSection({ hooks }: Props) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyHook = (hook: string, idx: number) => {
    navigator.clipboard.writeText(hook);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hooks.join('\n'));
    setCopiedIdx(-1);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-dark-200">10 hook variations optimized for scroll-stopping power</p>
        <button
          onClick={copyAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-600 hover:bg-dark-500 text-dark-200 hover:text-brand-200 transition-all text-xs border border-dark-500"
        >
          {copiedIdx === -1 ? (
            <><Check size={12} className="text-neon-green" /> All Copied</>
          ) : (
            <><Copy size={12} /> Copy All</>
          )}
        </button>
      </div>

      <div className="grid gap-2.5">
        {hooks.map((hook, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-3.5 flex items-center gap-3 group hover:border-brand-500/30 transition-all animate-float-up cursor-pointer"
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => copyHook(hook, i)}
          >
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-600/20 flex items-center justify-center">
              <span className="text-xs font-bold text-brand-400">{i + 1}</span>
            </div>
            <p className="flex-1 text-sm text-brand-100">{hook}</p>
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {copiedIdx === i ? (
                <Check size={14} className="text-neon-green" />
              ) : (
                <Copy size={14} className="text-dark-300" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
