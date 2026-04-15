interface Props {
  strategy: string[];
}

const stepColors = [
  'from-neon-pink/20 to-transparent border-neon-pink/30',
  'from-brand-500/20 to-transparent border-brand-500/30',
  'from-neon-green/20 to-transparent border-neon-green/30',
  'from-neon-orange/20 to-transparent border-neon-orange/30',
  'from-neon-blue/20 to-transparent border-neon-blue/30',
  'from-brand-400/20 to-transparent border-brand-400/30',
];

export default function FunnelSection({ strategy }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-dark-200 mb-2">Complete funnel strategy from awareness to conversion</p>

      <div className="relative space-y-3">
        {/* Connector line */}
        <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-neon-pink via-brand-500 to-neon-green opacity-20" />

        {strategy.map((step, i) => (
          <div
            key={i}
            className={`relative glass-card rounded-xl p-4 pl-12 border-l-2 bg-gradient-to-r ${stepColors[i % stepColors.length]} animate-float-up`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-dark-700 border-2 border-brand-500 flex items-center justify-center z-10">
              <span className="text-[8px] font-bold text-brand-300">{i + 1}</span>
            </div>
            <p className="text-sm text-brand-100 leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
