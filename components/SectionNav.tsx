interface Section {
  id: string;
  label: string;
  icon: string;
  shortLabel: string;
}

const sections: Section[] = [
  { id: 'concepts', label: 'Video Concepts', icon: '🔥', shortLabel: 'Concepts' },
  { id: 'scripts', label: 'Full Scripts', icon: '🎬', shortLabel: 'Scripts' },
  { id: 'visuals', label: 'Visual Build Plan', icon: '🎥', shortLabel: 'Visuals' },
  { id: 'prompts', label: 'AI Video Prompts', icon: '🎨', shortLabel: 'AI Prompts' },
  { id: 'editing', label: 'Editing Plan', icon: '✂️', shortLabel: 'Editing' },
  { id: 'hooks', label: 'Hook Variations', icon: '🧠', shortLabel: 'Hooks' },
  { id: 'captions', label: 'Caption + CTA', icon: '📱', shortLabel: 'Captions' },
  { id: 'funnel', label: 'Funnel Strategy', icon: '🔗', shortLabel: 'Funnel' },
  { id: 'json', label: 'Automation JSON', icon: '🤖', shortLabel: 'JSON' },
  { id: 'workflow', label: 'Workflow Plan', icon: '⚙️', shortLabel: 'Workflow' },
];

interface Props {
  activeSection: string;
  onSelect: (id: string) => void;
}

export default function SectionNav({ activeSection, onSelect }: Props) {
  return (
    <div className="flex overflow-x-auto gap-1.5 pb-2 scrollbar-none -mx-2 px-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSelect(section.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border
            ${activeSection === section.id
              ? 'bg-brand-700/40 text-brand-200 border-brand-600/50 shadow-lg shadow-brand-900/30'
              : 'bg-dark-700/50 text-dark-200 border-dark-500/50 hover:bg-dark-600 hover:text-dark-100 hover:border-dark-400'
            }`}
        >
          <span className="text-sm">{section.icon}</span>
          <span className="hidden sm:inline">{section.label}</span>
          <span className="sm:hidden">{section.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}

export { sections };
