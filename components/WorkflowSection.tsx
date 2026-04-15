import { WorkflowStep } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  steps: WorkflowStep[];
}

const stepAccents = [
  'border-neon-blue/40',
  'border-neon-pink/40',
  'border-brand-400/40',
  'border-neon-green/40',
  'border-neon-orange/40',
  'border-neon-blue/40',
  'border-brand-500/40',
  'border-neon-pink/40',
  'border-neon-green/40',
  'border-brand-300/40',
];

export default function WorkflowSection({ steps }: Props) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setExpandedStep(expandedStep === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-xl p-4 border-l-4 border-neon-blue">
        <p className="text-xs text-dark-100 leading-relaxed">
          <span className="font-semibold text-neon-blue">⚙️ n8n Workflow Execution Plan:</span> Follow these 10 steps
          to build a fully automated content production pipeline. Each step maps to one or more n8n nodes.
        </p>
      </div>

      {/* Visual flow indicator */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => toggle(i)}
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all
                ${expandedStep === i
                  ? 'bg-brand-600/40 border border-brand-500 scale-110 shadow-lg shadow-brand-900/30'
                  : 'bg-dark-700/60 border border-dark-500/50 hover:bg-dark-600'
                }`}
            >
              {step.icon}
            </button>
            {i < steps.length - 1 && (
              <div className="w-3 h-0.5 bg-dark-500 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`glass-card rounded-xl overflow-hidden border-l-3 ${stepAccents[i]} animate-float-up`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-dark-700/30 transition-all text-left"
            >
              <span className="text-lg flex-shrink-0">{step.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-dark-300 bg-dark-600 px-1.5 py-0.5 rounded">
                    STEP {step.step}
                  </span>
                  <h4 className="text-sm font-semibold text-brand-200 truncate">{step.title}</h4>
                </div>
                <p className="text-xs text-dark-200 mt-0.5 truncate">{step.description}</p>
              </div>
              {expandedStep === i ? (
                <ChevronUp size={16} className="text-dark-300 flex-shrink-0" />
              ) : (
                <ChevronDown size={16} className="text-dark-300 flex-shrink-0" />
              )}
            </button>

            {expandedStep === i && (
              <div className="px-4 pb-4 space-y-3 border-t border-dark-600/30 pt-3">
                <div className="space-y-1.5">
                  {step.details.map((detail, di) => (
                    <div key={di} className="flex items-start gap-2">
                      <span className="text-neon-green text-xs mt-0.5">▸</span>
                      <p className="text-xs text-brand-100/80 leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {step.tools.map((tool, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] px-2 py-1 rounded-md bg-dark-600/80 text-dark-100 border border-dark-500/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Final goal */}
      <div className="glass-card rounded-xl p-5 border border-neon-green/30 bg-neon-green/5 space-y-3">
        <h4 className="text-sm font-bold text-neon-green flex items-center gap-2">
          🎯 Final Workflow Goal
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            '✅ Minimal human input required',
            '✅ Repeatable video generation',
            '✅ Scalable content production',
            '✅ Multi-platform distribution',
            '✅ Automated A/B testing',
            '✅ Performance-driven optimization',
          ].map((goal, i) => (
            <p key={i} className="text-xs text-brand-100">{goal}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
