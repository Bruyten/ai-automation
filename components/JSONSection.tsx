import { Copy, Check, Download } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: object;
}

export default function JSONSection({ data }: Props) {
  const [copied, setCopied] = useState(false);

  const jsonStr = JSON.stringify(data, null, 2);

  const copyJSON = () => {
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'viralforge-automation.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-xl p-4 border-l-4 border-brand-500">
        <p className="text-xs text-dark-100 leading-relaxed">
          <span className="font-semibold text-brand-200">🤖 Automation-Ready JSON:</span> This structured output
          can be directly consumed by n8n workflows, Zapier, Make.com, or any custom automation pipeline.
          Import this into your workflow's data processing node.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={copyJSON}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 hover:text-brand-200 transition-all text-xs border border-brand-600/30"
        >
          {copied ? (
            <><Check size={12} className="text-neon-green" /> Copied</>
          ) : (
            <><Copy size={12} /> Copy JSON</>
          )}
        </button>
        <button
          onClick={downloadJSON}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neon-green/10 hover:bg-neon-green/20 text-neon-green transition-all text-xs border border-neon-green/30"
        >
          <Download size={12} /> Download .json
        </button>
      </div>

      <div className="json-block max-h-[500px] overflow-auto">
        <pre className="text-neon-green/80 text-[11px] leading-relaxed">
          {jsonStr}
        </pre>
      </div>
    </div>
  );
}
