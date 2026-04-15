import { useState, useRef, useCallback } from 'react';
import { ProductInput, GeneratedContent } from './types';
import { generateContent } from './engine';
import InputForm from './components/InputForm';
import SectionNav from './components/SectionNav';
import VideoConceptCard from './components/VideoConceptCard';
import ScriptSection from './components/ScriptSection';
import VisualSection from './components/VisualSection';
import AIPromptSection from './components/AIPromptSection';
import EditingSection from './components/EditingSection';
import HooksSection from './components/HooksSection';
import CaptionSection from './components/CaptionSection';
import FunnelSection from './components/FunnelSection';
import JSONSection from './components/JSONSection';
import WorkflowSection from './components/WorkflowSection';
import {
  Sparkles, Zap, Film, Brain, Download,
  ArrowUp, BarChart3, Video, FileText, Workflow
} from 'lucide-react';

export default function App() {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState('concepts');
  const [showInput, setShowInput] = useState(true);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback((input: ProductInput) => {
    setIsGenerating(true);

    // Simulate processing delay for UX
    setTimeout(() => {
      const result = generateContent(input);
      setContent(result);
      setIsGenerating(false);
      setActiveSection('concepts');

      // Scroll to output on mobile
      setTimeout(() => {
        if (window.innerWidth < 1024) {
          outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }, 1500);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const downloadAll = () => {
    if (!content) return;
    const fullExport = {
      generated_at: new Date().toISOString(),
      engine: 'ViralForge AI v2.0',
      ...content.automationJSON,
      hooks: content.hooks,
      captions: content.captions,
      funnel_strategy: content.funnelStrategy,
      workflow_steps: content.workflowSteps.map(s => ({
        step: s.step,
        title: s.title,
        description: s.description,
        details: s.details,
        tools: s.tools,
      })),
    };
    const blob = new Blob([JSON.stringify(fullExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viralforge-${content.input.productName.replace(/\s/g, '-').toLowerCase()}-full-export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderSection = () => {
    if (!content) return null;

    switch (activeSection) {
      case 'concepts':
        return (
          <div className="space-y-4">
            {content.videoConcepts.map((concept, i) => (
              <VideoConceptCard key={concept.id} concept={concept} index={i} />
            ))}
          </div>
        );
      case 'scripts':
        return <ScriptSection concepts={content.videoConcepts} />;
      case 'visuals':
        return <VisualSection concepts={content.videoConcepts} />;
      case 'prompts':
        return <AIPromptSection concepts={content.videoConcepts} />;
      case 'editing':
        return <EditingSection concepts={content.videoConcepts} />;
      case 'hooks':
        return <HooksSection hooks={content.hooks} />;
      case 'captions':
        return <CaptionSection captions={content.captions} />;
      case 'funnel':
        return <FunnelSection strategy={content.funnelStrategy} />;
      case 'json':
        return <JSONSection data={content.automationJSON} />;
      case 'workflow':
        return <WorkflowSection steps={content.workflowSteps} />;
      default:
        return null;
    }
  };

  const sectionTitles: Record<string, { title: string; icon: React.ReactNode }> = {
    concepts: { title: 'Video Concepts', icon: <Film size={16} /> },
    scripts: { title: 'Full Scripts (Scene-Based)', icon: <FileText size={16} /> },
    visuals: { title: 'Visual Build Plan', icon: <Video size={16} /> },
    prompts: { title: 'AI Video Prompts', icon: <Sparkles size={16} /> },
    editing: { title: 'Editing Plan (CapCut-Ready)', icon: <Zap size={16} /> },
    hooks: { title: 'Hook Variations', icon: <Brain size={16} /> },
    captions: { title: 'Caption + CTA', icon: <FileText size={16} /> },
    funnel: { title: 'Funnel Strategy', icon: <BarChart3 size={16} /> },
    json: { title: 'Automation JSON Output', icon: <Download size={16} /> },
    workflow: { title: 'Workflow Execution Plan', icon: <Workflow size={16} /> },
  };

  const stats = content ? [
    { label: 'Video Concepts', value: content.videoConcepts.length, icon: '🎬' },
    { label: 'Total Scenes', value: content.videoConcepts.reduce((acc, c) => acc + c.scenes.length, 0), icon: '🎥' },
    { label: 'Hook Variants', value: content.hooks.length, icon: '🧠' },
    { label: 'Platforms', value: content.captions.length, icon: '📱' },
    { label: 'Workflow Steps', value: content.workflowSteps.length, icon: '⚙️' },
    { label: 'AI Prompts', value: content.videoConcepts.reduce((acc, c) => acc + c.scenes.length, 0), icon: '🎨' },
  ] : [];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 via-neon-green to-neon-blue flex items-center justify-center shadow-lg shadow-brand-900/50">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold gradient-text tracking-tight">ViralForge AI</h1>
              <p className="text-[10px] text-dark-300 -mt-0.5">Content Automation Engine v2.0</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {content && (
              <button
                onClick={downloadAll}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-green/10 text-neon-green text-xs font-medium border border-neon-green/30 hover:bg-neon-green/20 transition-all"
              >
                <Download size={12} />
                Export All
              </button>
            )}
            <button
              onClick={() => setShowInput(!showInput)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-700 text-dark-100 text-xs border border-dark-500 hover:bg-dark-600 transition-all"
            >
              {showInput ? 'Show Output' : 'Show Input'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Empty State */}
      {!content && !isGenerating && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/15 border border-brand-500/20 text-xs text-brand-300 mb-6">
              <Sparkles size={12} />
              AI-Powered Short-Form Video Content Engine
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              <span className="gradient-text">Generate Viral Videos</span>
              <br />
              <span className="text-brand-100">On Complete Autopilot</span>
            </h2>

            <p className="text-sm sm:text-base text-dark-200 max-w-2xl mx-auto leading-relaxed mb-8">
              Enter your product details below. Get 3 complete video concepts with scripts,
              AI generation prompts, editing plans, captions, funnel strategy, and a full
              n8n automation workflow — ready to execute.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-dark-200">
              {[
                { icon: '🎬', label: '3 Video Concepts' },
                { icon: '🧠', label: '10 Hook Variants' },
                { icon: '🎨', label: '9 AI Prompts' },
                { icon: '📱', label: '4 Platform Captions' },
                { icon: '⚙️', label: 'Full n8n Workflow' },
                { icon: '🤖', label: 'Automation JSON' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-700/50 border border-dark-600/50">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Input */}
          <div className={`lg:w-[380px] flex-shrink-0 ${!showInput && content ? 'hidden lg:block' : ''}`}>
            <div className="lg:sticky lg:top-20">
              <div className="glass-card rounded-2xl p-5 glow-border">
                <InputForm onGenerate={handleGenerate} isGenerating={isGenerating} />
              </div>

              {/* Quick Stats */}
              {content && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {stats.slice(0, 3).map((stat, i) => (
                    <div key={i} className="glass-card rounded-xl p-3 text-center animate-float-up" style={{ animationDelay: `${i * 100}ms` }}>
                      <span className="text-lg">{stat.icon}</span>
                      <p className="text-lg font-bold text-brand-200 mt-1">{stat.value}</p>
                      <p className="text-[9px] text-dark-300 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Output */}
          <div
            ref={outputRef}
            className={`flex-1 min-w-0 ${showInput && !content ? 'hidden lg:block' : ''}`}
          >
            {isGenerating && (
              <div className="glass-card rounded-2xl p-12 text-center space-y-6 animate-float-up">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-brand-600/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-neon-green border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles size={20} className="text-brand-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-200">Generating Content Engine</h3>
                  <p className="text-sm text-dark-200 mt-1">Building 3 video concepts, scripts, AI prompts, and workflow...</p>
                </div>
                <div className="flex justify-center gap-1">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-brand-500 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {content && !isGenerating && (
              <div className="space-y-4">
                {/* Stats Bar */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="glass-card rounded-xl p-2.5 text-center animate-float-up lg:hidden first:block sm:first:block"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <span className="text-sm">{stat.icon}</span>
                      <p className="text-sm font-bold text-brand-200">{stat.value}</p>
                      <p className="text-[8px] text-dark-300">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Product Badge */}
                <div className="glass-card rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-neon-green flex items-center justify-center text-white text-xs font-bold">
                      {content.input.productName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-brand-200">{content.input.productName}</h3>
                      <p className="text-[10px] text-dark-300">Content package generated</p>
                    </div>
                  </div>
                  <button
                    onClick={downloadAll}
                    className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neon-green/10 text-neon-green text-[10px] font-medium border border-neon-green/30"
                  >
                    <Download size={10} />
                    Export
                  </button>
                </div>

                {/* Section Navigation */}
                <SectionNav activeSection={activeSection} onSelect={setActiveSection} />

                {/* Section Title */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-brand-400">{sectionTitles[activeSection]?.icon}</span>
                  <h2 className="text-base font-bold text-brand-200">
                    {sectionTitles[activeSection]?.title}
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-600/20 text-brand-400 font-medium">
                    Section {Object.keys(sectionTitles).indexOf(activeSection) + 1}/10
                  </span>
                </div>

                {/* Active Section Content */}
                {renderSection()}
              </div>
            )}

            {!content && !isGenerating && (
              <div className="hidden lg:flex glass-card rounded-2xl p-12 items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-dark-700/50 flex items-center justify-center mx-auto">
                    <Film size={24} className="text-dark-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-dark-200">Ready to Generate</h3>
                    <p className="text-sm text-dark-300 mt-1">
                      Fill in the product details on the left and click generate
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      {content && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-xl bg-brand-600/80 backdrop-blur-sm text-white flex items-center justify-center shadow-lg shadow-brand-900/50 hover:bg-brand-500 transition-all z-40 border border-brand-500/30"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}
