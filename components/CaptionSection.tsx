import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  captions: { platform: string; caption: string }[];
}

const platformIcons: Record<string, string> = {
  'TikTok': '🎵',
  'Instagram Reels': '📸',
  'YouTube Shorts': '▶️',
  'Twitter/X': '🐦',
};

const platformColors: Record<string, string> = {
  'TikTok': 'border-neon-pink/30 bg-neon-pink/5',
  'Instagram Reels': 'border-brand-500/30 bg-brand-500/5',
  'YouTube Shorts': 'border-red-500/30 bg-red-500/5',
  'Twitter/X': 'border-neon-blue/30 bg-neon-blue/5',
};

export default function CaptionSection({ captions }: Props) {
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  const copyCaption = (caption: string, platform: string) => {
    navigator.clipboard.writeText(caption);
    setCopiedPlatform(platform);
    setTimeout(() => setCopiedPlatform(null), 2000);
  };

  return (
    <div className="space-y-4">
      {captions.map((item, i) => (
        <div
          key={item.platform}
          className={`glass-card rounded-2xl overflow-hidden animate-float-up ${platformColors[item.platform] || ''}`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-dark-600/30">
            <div className="flex items-center gap-2">
              <span className="text-base">{platformIcons[item.platform] || '📝'}</span>
              <h3 className="text-sm font-bold text-brand-200">{item.platform}</h3>
            </div>
            <button
              onClick={() => copyCaption(item.caption, item.platform)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-700/80 hover:bg-dark-600 text-dark-200 hover:text-brand-200 transition-all text-xs"
            >
              {copiedPlatform === item.platform ? (
                <><Check size={12} className="text-neon-green" /> Copied</>
              ) : (
                <><Copy size={12} /> Copy</>
              )}
            </button>
          </div>
          <div className="p-5">
            <p className="text-sm text-brand-100/90 leading-relaxed whitespace-pre-wrap font-mono">
              {item.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
