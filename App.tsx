import { useState, useCallback } from 'react';

// Types
interface ProductInput {
  productName: string;
  description: string;
  targetAudience: string;
  keyBenefits: string;
  painPoints: string;
  offerType: string;
  callToAction: string;
  productImages: string;
  optionalClips: string;
}

interface Scene {
  number: number;
  title: string;
  duration: string;
  script: string;
  visualDescription: string;
  aiPrompt: string;
  editingNotes: string;
}

interface VideoConcept {
  id: number;
  title: string;
  angle: string;
  hookType: string;
}

interface Hook {
  id: number;
  text: string;
  type: string;
}

interface AutomationJSON {
  metadata: {
    generatedAt: string;
    productName: string;
    version: string;
  };
  videoConcepts: VideoConcept[];
  scripts: {
    videoId: number;
    scenes: Scene[];
  }[];
  visualBuildPlan: Scene[];
  aiVideoPrompts: Scene[];
  editingPlan: {
    software: string;
    steps: string[];
    timing: string;
    captions: string;
    effects: string[];
    music: string;
  }[];
  hooks: Hook[];
  captionAndCTA: {
    platform: string;
    caption: string;
    hashtags: string[];
    cta: string;
    postingTime: string;
  }[];
  funnelStrategy: {
    stage: string;
    action: string;
    tool: string;
    metric: string;
  }[];
  automationWorkflow: WorkflowStep[];
}

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  tools: string[];
  inputFields?: string[];
  outputFields?: string[];
}

// Default empty state
const emptyInput: ProductInput = {
  productName: '',
  description: '',
  targetAudience: '',
  keyBenefits: '',
  painPoints: '',
  offerType: '',
  callToAction: '',
  productImages: '',
  optionalClips: '',
};

export default function App() {
  const [input, setInput] = useState<ProductInput>(emptyInput);
  const [generatedContent, setGeneratedContent] = useState<AutomationJSON | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Generate content based on input
  const generateContent = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const content = createGeneratedContent(input);
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 1500);
  }, [input]);

  // Copy to clipboard
  const copyToClipboard = useCallback((text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  }, []);

  // Export JSON
  const exportJSON = useCallback(() => {
    if (!generatedContent) return;
    const blob = new Blob([JSON.stringify(generatedContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${input.productName.replace(/\s+/g, '_')}_automation.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [generatedContent, input.productName]);

  // Reset form
  const resetForm = useCallback(() => {
    setInput(emptyInput);
    setGeneratedContent(null);
    setActiveSection(0);
  }, []);

  const sections = [
    { id: 0, title: '🔥 Video Concepts', icon: '💡' },
    { id: 1, title: '🎬 Full Scripts', icon: '📝' },
    { id: 2, title: '🎥 Visual Build Plan', icon: '🎨' },
    { id: 3, title: '🎨 AI Video Prompts', icon: '🤖' },
    { id: 4, title: '✂️ Editing Plan', icon: '✂️' },
    { id: 5, title: '🧠 Hooks', icon: '🪝' },
    { id: 6, title: '📱 Caption + CTA', icon: '📲' },
    { id: 7, title: '🔗 Funnel Strategy', icon: '🎯' },
    { id: 8, title: '🤖 Automation JSON', icon: '⚙️' },
    { id: 9, title: '⚙️ Workflow Execution', icon: '🔄' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
                <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M15 10l5 5-5 5" />
                  <path d="M4 4v7a4 4 0 004 4h12" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Content Automation Engine</h1>
                <p className="text-sm text-purple-300">Generate viral short-form videos + automation workflows</p>
              </div>
            </div>
            {generatedContent && (
              <button
                onClick={exportJSON}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-violet-500 hover:to-indigo-500"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export JSON
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-lg font-semibold text-white">📋 Product Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Product Name *</label>
                  <input
                    type="text"
                    value={input.productName}
                    onChange={(e) => setInput({ ...input, productName: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="e.g., SleepWell Pro"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Product Description *</label>
                  <textarea
                    value={input.description}
                    onChange={(e) => setInput({ ...input, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="Describe what your product does..."
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Target Audience *</label>
                  <input
                    type="text"
                    value={input.targetAudience}
                    onChange={(e) => setInput({ ...input, targetAudience: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="e.g., Busy professionals 25-45"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Key Benefits *</label>
                  <textarea
                    value={input.keyBenefits}
                    onChange={(e) => setInput({ ...input, keyBenefits: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="List the main benefits..."
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Pain Points *</label>
                  <textarea
                    value={input.painPoints}
                    onChange={(e) => setInput({ ...input, painPoints: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="What problems does it solve?"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Offer Type *</label>
                  <input
                    type="text"
                    value={input.offerType}
                    onChange={(e) => setInput({ ...input, offerType: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="e.g., 50% off, Free trial, Bundle deal"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Call To Action *</label>
                  <input
                    type="text"
                    value={input.callToAction}
                    onChange={(e) => setInput({ ...input, callToAction: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="e.g., Link in bio, Shop now"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Product Images (URLs)</label>
                  <textarea
                    value={input.productImages}
                    onChange={(e) => setInput({ ...input, productImages: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="Paste image URLs..."
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-purple-200">Optional Clips (URLs)</label>
                  <textarea
                    value={input.optionalClips}
                    onChange={(e) => setInput({ ...input, optionalClips: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    placeholder="Paste video clip URLs..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={generateContent}
                    disabled={isGenerating || !input.productName}
                    className="flex-1 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-semibold text-white transition-all hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Generating...
                      </span>
                    ) : (
                      '🚀 Generate Content'
                    )}
                  </button>
                  <button
                    onClick={resetForm}
                    className="rounded-lg border border-white/20 px-4 py-3 font-medium text-white/70 transition-all hover:bg-white/10"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            {!generatedContent ? (
              <div className="flex h-full min-h-[600px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20">
                  <svg className="h-10 w-10 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M15 10l5 5-5 5" />
                    <path d="M4 4v7a4 4 0 004 4h12" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">Ready to Create Viral Content</h3>
                <p className="mb-6 max-w-md text-white/60">
                  Fill in your product details and generate complete video scripts, AI prompts, 
                  editing plans, and automation workflows in seconds.
                </p>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3">
                    <span className="text-xl">🎬</span>
                    <span className="text-sm text-white/80">3 Video Concepts</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3">
                    <span className="text-xl">📝</span>
                    <span className="text-sm text-white/80">Scene-by-Scene Scripts</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3">
                    <span className="text-xl">🤖</span>
                    <span className="text-sm text-white/80">AI Video Prompts</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-3">
                    <span className="text-xl">⚙️</span>
                    <span className="text-sm text-white/80">n8n Automation Workflow</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                {/* Section Tabs */}
                <div className="border-b border-white/10">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-all ${
                          activeSection === section.id
                            ? 'border-b-2 border-violet-500 text-white'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <span className="mr-2">{section.icon}</span>
                        {section.title.split(' ').slice(1).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Content */}
                <div className="p-6">
                  {activeSection === 0 && <VideoConceptsSection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 1 && <FullScriptsSection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 2 && <VisualBuildSection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 3 && <AIVideoPromptsSection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 4 && <EditingPlanSection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 5 && <HooksSection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 6 && <CaptionCTASection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 7 && <FunnelStrategySection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 8 && <AutomationJSONSection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                  {activeSection === 9 && <WorkflowExecutionSection content={generatedContent} onCopy={copyToClipboard} copied={copiedSection} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Content Generation Function
function createGeneratedContent(input: ProductInput): AutomationJSON {
  const now = new Date().toISOString();
  
  return {
    metadata: {
      generatedAt: now,
      productName: input.productName || 'Unknown Product',
      version: '1.0.0',
    },
    videoConcepts: [
      {
        id: 1,
        title: 'The Problem-Solution Reveal',
        angle: 'Start with relatable struggle, reveal product as hero',
        hookType: 'Pattern Interrupt + Pain Point',
      },
      {
        id: 2,
        title: 'Before/After Transformation',
        angle: 'Show dramatic contrast, position product as catalyst',
        hookType: 'Visual Shock + Curiosity Gap',
      },
      {
        id: 3,
        title: 'The Secret They Dont Know',
        angle: 'Position as insider knowledge, create FOMO',
        hookType: 'Exclusivity + Urgency',
      },
    ],
    scripts: [
      {
        videoId: 1,
        scenes: [
          {
            number: 1,
            title: 'Hook',
            duration: '0-3 sec',
            script: `Stop scrolling if you're tired of ${input.painPoints.split(',')[0] || 'this problem'}.`,
            visualDescription: 'Quick zoom on frustrated person, text overlay pops',
            aiPrompt: `Close-up shot of frustrated person looking at camera, sudden eye contact, dramatic lighting, TikTok style, 9:16 aspect ratio`,
            editingNotes: 'Hard cut at 0.5s, text appears with pop animation',
          },
          {
            number: 2,
            title: 'Problem + Value',
            duration: '3-15 sec',
            script: `I spent months dealing with ${input.painPoints}. Then I found ${input.productName}. ${input.keyBenefits.split(',')[0] || 'It changed everything'}.`,
            visualDescription: 'Montage of struggle, then product reveal with glow effect',
            aiPrompt: `Split screen: left side shows struggle/frustration, right side shows relief/happiness, product in center with subtle glow, cinematic lighting, 9:16`,
            editingNotes: 'Smooth transition at 3s, product reveal with shine effect at 8s',
          },
          {
            number: 3,
            title: 'Solution + CTA',
            duration: '15-20 sec',
            script: `${input.offerType}. Link in bio. Comment "${input.callToAction}" if you want this.`,
            visualDescription: 'Product beauty shot, CTA text, arrow pointing down',
            aiPrompt: `Product hero shot on clean background, soft lighting, premium feel, text overlay space at bottom, 9:16 aspect ratio, commercial quality`,
            editingNotes: 'CTA text pulses, arrow bounces, end card at 18s',
          },
        ],
      },
      {
        videoId: 2,
        scenes: [
          {
            number: 1,
            title: 'Hook',
            duration: '0-3 sec',
            script: `This is what ${input.targetAudience} need to see RIGHT NOW.`,
            visualDescription: 'Fast text animation, urgent energy',
            aiPrompt: `Bold text animation on dark background, urgent red/orange colors, motion graphics style, TikTok trending aesthetic, 9:16`,
            editingNotes: 'Text slams in, shake effect, whoosh sound',
          },
          {
            number: 2,
            title: 'Problem + Value',
            duration: '3-15 sec',
            script: `Before ${input.productName}: ${input.painPoints}. After: ${input.keyBenefits}. No joke.`,
            visualDescription: 'Before/after split, dramatic contrast',
            aiPrompt: `Before after comparison, left side dull colors and chaos, right side bright colors and order, clear dividing line, 9:16 aspect ratio`,
            editingNotes: 'Wipe transition, color grade shift, satisfaction sound',
          },
          {
            number: 3,
            title: 'Solution + CTA',
            duration: '15-20 sec',
            script: `Grab ${input.offerType} before it's gone. Tap the link. Follow for more.`,
            visualDescription: 'Urgency graphics, countdown feel',
            aiPrompt: `Product with urgency elements, countdown timer graphic, limited stock indicator, warm inviting colors, 9:16 commercial style`,
            editingNotes: 'Timer animation, urgency pulse, end with logo',
          },
        ],
      },
      {
        videoId: 3,
        scenes: [
          {
            number: 1,
            title: 'Hook',
            duration: '0-3 sec',
            script: `Nobody talks about this but ${input.targetAudience} need to know.`,
            visualDescription: 'Whisper-style, intimate framing',
            aiPrompt: `Close intimate shot, person leaning toward camera like sharing secret, soft lighting, trustworthy expression, 9:16 TikTok style`,
            editingNotes: 'Subtle zoom in, hush sound effect',
          },
          {
            number: 2,
            title: 'Problem + Value',
            duration: '3-15 sec',
            script: `${input.description} Most people struggle with ${input.painPoints}. But ${input.productName} fixes it with ${input.keyBenefits}.`,
            visualDescription: 'Educational graphics, clean explanations',
            aiPrompt: `Clean educational graphics, icons appearing, smooth animations, professional explainer style, brand colors, 9:16 aspect ratio`,
            editingNotes: 'Icons pop in sequence, smooth transitions',
          },
          {
            number: 3,
            title: 'Solution + CTA',
            duration: '15-20 sec',
            script: `Try it risk-free. ${input.offerType}. Link below. Save this for later.`,
            visualDescription: 'Trust badges, guarantee visuals',
            aiPrompt: `Trust badges and guarantees displayed, checkmarks, secure payment icons, professional trustworthy aesthetic, 9:16`,
            editingNotes: 'Badges animate in, final CTA holds 2 sec',
          },
        ],
      },
    ],
    visualBuildPlan: [
      {
        number: 1,
        title: 'Opening Hook Visual',
        duration: '0-3 sec',
        script: 'Pattern interrupt visual',
        visualDescription: 'Quick cuts, bold text, eye contact moment',
        aiPrompt: 'Dynamic opening shot with movement, bold typography overlay space, high contrast, 9:16 vertical format',
        editingNotes: 'Fast pacing, attention-grabbing movement',
      },
      {
        number: 2,
        title: 'Problem Visualization',
        duration: '3-8 sec',
        script: 'Show the struggle',
        visualDescription: 'Relatable scenario, frustration visible',
        aiPrompt: 'Person experiencing common problem, relatable setting, natural lighting, authentic emotion, 9:16',
        editingNotes: 'Slightly desaturated, slower motion',
      },
      {
        number: 3,
        title: 'Product Introduction',
        duration: '8-12 sec',
        script: 'Product enters frame',
        visualDescription: 'Clean product shot, hero lighting',
        aiPrompt: 'Product reveal with dramatic lighting, clean background, premium presentation, 9:16 commercial quality',
        editingNotes: 'Brightness increase, color pop',
      },
      {
        number: 4,
        title: 'Benefit Demonstration',
        duration: '12-17 sec',
        script: 'Show results',
        visualDescription: 'Before/after or benefit visualization',
        aiPrompt: 'Clear demonstration of product benefits, satisfied user, bright positive lighting, 9:16',
        editingNotes: 'Smooth transitions, satisfaction cues',
      },
      {
        number: 5,
        title: 'CTA End Card',
        duration: '17-20 sec',
        script: 'Clear call to action',
        visualDescription: 'Text overlay, arrow, branding',
        aiPrompt: 'Clean end card with text space, arrow pointing down, brand logo area, 9:16 vertical',
        editingNotes: 'Pulsing CTA, hold for 2 seconds',
      },
    ],
    aiVideoPrompts: [
      {
        number: 1,
        title: 'Scene 1 - Hook Shot',
        duration: '3 seconds',
        script: 'Opening attention grabber',
        visualDescription: 'Sudden movement, direct eye contact, text pop',
        aiPrompt: `Generate a 3-second vertical video: Close-up of person making direct eye contact with camera, sudden realization expression, dramatic lighting shift, TikTok viral style, 9:16 aspect ratio, high contrast, professional quality`,
        editingNotes: 'Add text overlay: "STOP SCROLLING"',
      },
      {
        number: 2,
        title: 'Scene 2 - Problem Shot',
        duration: '5 seconds',
        script: 'Relatable struggle moment',
        visualDescription: 'Frustration, problem visualization',
        aiPrompt: `Generate a 5-second vertical video: Person experiencing ${input.painPoints.split(',')[0] || 'frustration'}, authentic emotion, natural setting, slightly desaturated colors, 9:16 aspect ratio, cinematic quality`,
        editingNotes: 'Add subtle shake effect, desaturate 20%',
      },
      {
        number: 3,
        title: 'Scene 3 - Product Reveal',
        duration: '4 seconds',
        script: 'Product introduction',
        visualDescription: 'Clean product shot, hero moment',
        aiPrompt: `Generate a 4-second vertical video: ${input.productName} product reveal, rotating shot, clean white background, professional product photography lighting, premium feel, 9:16 aspect ratio, commercial quality`,
        editingNotes: 'Add shine effect, brightness boost',
      },
      {
        number: 4,
        title: 'Scene 4 - Benefit Shot',
        duration: '5 seconds',
        script: 'Show transformation',
        visualDescription: 'Happy user, results visible',
        aiPrompt: `Generate a 5-second vertical video: Person experiencing benefits of ${input.productName}, genuine smile, bright warm lighting, success moment, 9:16 aspect ratio, authentic lifestyle feel`,
        editingNotes: 'Color grade warm, add sparkle effects',
      },
      {
        number: 5,
        title: 'Scene 5 - CTA Shot',
        duration: '3 seconds',
        script: 'Call to action',
        visualDescription: 'Clear CTA graphics, urgency',
        aiPrompt: `Generate a 3-second vertical video: Clean background with space for text overlay, subtle animation, arrow pointing down, brand colors, 9:16 aspect ratio, minimal design`,
        editingNotes: 'Add animated text, pulsing arrow',
      },
    ],
    editingPlan: [
      {
        software: 'CapCut',
        steps: [
          'Import all generated video clips',
          'Arrange in sequence: Hook → Problem → Product → Benefit → CTA',
          'Trim each clip to exact timing (3-5 seconds each)',
          'Add transitions between scenes',
          'Overlay text captions',
          'Add background music',
          'Apply color grading',
          'Export in 9:16 format',
        ],
        timing: 'Total: 20 seconds (0-3 hook, 3-15 value, 15-20 CTA)',
        captions: 'Auto-generate with CapCut, style: Bold white text with black outline, position: Lower third',
        effects: [
          'Zoom in on hook (0-3s)',
          'Text pop animations',
          'Smooth transitions between scenes',
          'Subtle shake on problem moment',
          'Brightness boost on product reveal',
          'Pulse effect on CTA',
        ],
        music: 'Trending TikTok sound - upbeat, motivational, 120-140 BPM, fade out at 18s',
      },
      {
        software: 'Premiere Pro (Alternative)',
        steps: [
          'Create 9:16 sequence (1080x1920)',
          'Import and organize clips in bins',
          'Build rough cut with timing markers',
          'Add adjustment layers for effects',
          'Create caption track',
          'Mix audio levels',
          'Color correction and grading',
          'Export H.264, 1080x1920, 30fps',
        ],
        timing: 'Same 20-second structure',
        captions: 'Essential Graphics template, animated text, brand colors',
        effects: [
          'Lumetri Color for grading',
          'Warp Stabilizer if needed',
          'Motion graphics for text',
          'Audio ducking for voiceover',
        ],
        music: 'Licensed track or royalty-free, -18dB background level',
      },
    ],
    hooks: [
      { id: 1, text: `Stop scrolling if you're tired of ${input.painPoints.split(',')[0] || 'this'}.`, type: 'Pattern Interrupt' },
      { id: 2, text: `This is what ${input.targetAudience} need to see RIGHT NOW.`, type: 'Audience Call-Out' },
      { id: 3, text: 'Nobody talks about this but you need to know.', type: 'Curiosity Gap' },
      { id: 4, text: `I wish I knew about ${input.productName} sooner.`, type: 'Regret/FOMO' },
      { id: 5, text: 'POV: You finally found the solution.', type: 'POV Format' },
      { id: 6, text: `3 reasons why ${input.targetAudience} are switching to this.`, type: 'List Format' },
      { id: 7, text: 'This changed everything for me.', type: 'Transformation' },
      { id: 8, text: `Don't buy ${input.productName.split(' ')[0] || 'this'} until you watch this.`, type: 'Reverse Psychology' },
      { id: 9, text: 'The secret ${input.targetAudience} dont want you to know.', type: 'Exclusivity' },
      { id: 10, text: `Watch till the end if you want ${input.keyBenefits.split(',')[0] || 'results'}.`, type: 'Retention Hook' },
    ],
    captionAndCTA: [
      {
        platform: 'TikTok',
        caption: `POV: You finally found ${input.productName} 🎯\n\n${input.description.substring(0, 100)}...\n\n${input.offerType} - link in bio! 👆`,
        hashtags: ['#fyp', '#viral', `#${input.productName.replace(/\s+/g, '')}`, '#trending', '#musthave'],
        cta: 'Link in bio + Comment for details',
        postingTime: '7-9 PM local time (peak engagement)',
      },
      {
        platform: 'Instagram Reels',
        caption: `This is the ${input.productName} glow up you didn't know you needed ✨\n\n${input.keyBenefits}\n\n${input.offerType} 🔗 in bio`,
        hashtags: ['#reels', '#explore', '#viral', '#trending', '#productlaunch'],
        cta: 'Link in bio + Save for later',
        postingTime: '6-8 PM or 11 AM-1 PM',
      },
      {
        platform: 'YouTube Shorts',
        caption: `${input.productName} changed the game 🎮\n\n${input.description.substring(0, 80)}\n\n${input.offerType} - check description!`,
        hashtags: ['#shorts', '#viral', '#trending', '#youtube', '#fyp'],
        cta: 'Check description + Subscribe',
        postingTime: '2-4 PM or 7-9 PM',
      },
    ],
    funnelStrategy: [
      {
        stage: 'Awareness (Top of Funnel)',
        action: 'Viral short-form content on TikTok/Reels/Shorts',
        tool: 'Organic + Paid social ads',
        metric: 'Views, Reach, Engagement Rate',
      },
      {
        stage: 'Interest (Middle of Funnel)',
        action: 'Profile visit, bio link click',
        tool: 'Linktree/Beacons landing page',
        metric: 'CTR, Profile Visits, Link Clicks',
      },
      {
        stage: 'Consideration (Middle of Funnel)',
        action: 'Email capture, lead magnet download',
        tool: 'Email automation (Klaviyo/ConvertKit)',
        metric: 'Opt-in Rate, Email Opens',
      },
      {
        stage: 'Conversion (Bottom of Funnel)',
        action: 'Product purchase, offer redemption',
        tool: 'Shopify/WooCommerce store',
        metric: 'Conversion Rate, AOV, ROAS',
      },
      {
        stage: 'Retention (Post-Purchase)',
        action: 'Email sequences, retargeting ads',
        tool: 'SMS + Email marketing',
        metric: 'Repeat Purchase Rate, LTV',
      },
    ],
    automationWorkflow: [
      {
        step: 1,
        title: 'Input Source Configuration',
        description: 'Set up data input method for product information',
        tools: ['Google Sheets', 'Airtable', 'Manual Form Trigger'],
        inputFields: ['product_name', 'description', 'target_audience', 'key_benefits', 'pain_points', 'offer_type', 'cta', 'product_images', 'optional_clips'],
      },
      {
        step: 2,
        title: 'Trigger Setup',
        description: 'Define automation trigger conditions',
        tools: ['n8n Webhook', 'Google Sheets Trigger', 'Manual Execute'],
        outputFields: ['trigger_timestamp', 'product_id', 'execution_id'],
      },
      {
        step: 3,
        title: 'Data Formatting Node',
        description: 'Map input fields into standardized variables for AI processing',
        tools: ['n8n Set Node', 'Code Node (JavaScript)'],
        inputFields: ['Raw input data from trigger'],
        outputFields: ['formatted_product_name', 'formatted_description', 'formatted_audience', 'formatted_benefits', 'formatted_pain_points', 'formatted_offer', 'formatted_cta', 'formatted_images'],
      },
      {
        step: 4,
        title: 'AI Processing Node',
        description: 'Send complete prompt to LLM (LM Arena/OpenAI/Claude) with injected variables',
        tools: ['HTTP Request Node', 'LM Arena API', 'OpenAI API'],
        inputFields: ['All formatted variables', 'Master prompt template'],
        outputFields: ['full_structured_response', 'json_output', 'scripts', 'scenes', 'ai_prompts', 'captions'],
      },
      {
        step: 5,
        title: 'JSON Parsing Node',
        description: 'Extract and structure AI output into usable components',
        tools: ['n8n JSON Parse', 'Code Node'],
        inputFields: ['Raw AI response'],
        outputFields: ['parsed_scripts', 'parsed_scenes', 'parsed_video_prompts', 'parsed_captions', 'parsed_hooks', 'parsed_workflow'],
      },
      {
        step: 6,
        title: 'AI Video Generation Loop',
        description: 'Iterate through each scene prompt and generate video clips',
        tools: ['RunwayML API', 'Pika Labs API', 'Stable Video Diffusion'],
        inputFields: ['Scene prompts from parsed output'],
        outputFields: ['scene_1_video_url', 'scene_2_video_url', 'scene_3_video_url', 'scene_4_video_url', 'scene_5_video_url'],
      },
      {
        step: 7,
        title: 'File Storage Organization',
        description: 'Store generated assets in organized folder structure',
        tools: ['Google Drive API', 'AWS S3', 'Local Storage'],
        outputFields: ['/Product Name/Video 1/scene1.mp4', '/Product Name/Video 1/scene2.mp4', '/Product Name/Video 1/scene3.mp4', 'script.txt', 'captions.txt'],
      },
      {
        step: 8,
        title: 'Video Editing Stage',
        description: 'Assemble clips with timing, captions, effects, and music',
        tools: ['CapCut API', 'FFmpeg', 'Descript API'],
        inputFields: ['All scene videos', 'Timing data', 'Caption text', 'Music track'],
        outputFields: ['final_edited_video.mp4', 'thumbnail.jpg'],
      },
      {
        step: 9,
        title: 'Output Delivery',
        description: 'Prepare final deliverables for posting',
        tools: ['Email API', 'Slack Notification', 'Direct Upload'],
        outputFields: ['Ready-to-post video', 'Caption + hashtags', 'Posting schedule', 'Analytics tracking link'],
      },
      {
        step: 10,
        title: 'Scaling Logic Implementation',
        description: 'Enable batch processing and daily content production',
        tools: ['n8n Schedule Trigger', 'Queue System', 'Rate Limiting'],
        inputFields: ['Multiple product rows', 'Daily content quota'],
        outputFields: ['Batch processed videos', 'Content calendar', 'Performance dashboard'],
      },
    ],
  };
}

// Section Components
function VideoConceptsSection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const textToCopy = content.videoConcepts.map(v => `${v.title}\nAngle: ${v.angle}\nHook Type: ${v.hookType}`).join('\n\n');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">3 Viral Video Concepts</h3>
        <button
          onClick={() => onCopy(textToCopy, 'concepts')}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
        >
          {copied === 'concepts' ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {content.videoConcepts.map((concept) => (
          <div key={concept.id} className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-violet-500/50">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20">
              <span className="text-lg">{concept.id}</span>
            </div>
            <h4 className="mb-2 font-semibold text-white">{concept.title}</h4>
            <p className="mb-2 text-sm text-white/70"><span className="text-purple-300">Angle:</span> {concept.angle}</p>
            <p className="text-sm text-white/70"><span className="text-purple-300">Hook:</span> {concept.hookType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FullScriptsSection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const getScriptText = (video: typeof content.scripts[0]) => {
    return video.scenes.map(s => `Scene ${s.number} (${s.duration}): ${s.script}`).join('\n\n');
  };

  return (
    <div className="space-y-6">
      {content.scripts.map((video) => (
        <div key={video.videoId} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-white">Video {video.videoId} Script</h4>
            <button
              onClick={() => onCopy(getScriptText(video), `script-${video.videoId}`)}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
            >
              {copied === `script-${video.videoId}` ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <div className="space-y-3">
            {video.scenes.map((scene) => (
              <div key={scene.number} className="rounded-lg bg-black/20 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-300">
                    Scene {scene.number}
                  </span>
                  <span className="text-xs text-white/50">{scene.duration}</span>
                </div>
                <p className="text-white/90">{scene.script}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualBuildSection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const textToCopy = content.visualBuildPlan.map(s => `Scene ${s.number} (${s.duration}): ${s.visualDescription}`).join('\n\n');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Scene-by-Scene Visual Plan</h3>
        <button
          onClick={() => onCopy(textToCopy, 'visual')}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
        >
          {copied === 'visual' ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>
      <div className="space-y-3">
        {content.visualBuildPlan.map((scene) => (
          <div key={scene.number} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white">
              {scene.number}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h4 className="font-semibold text-white">{scene.title}</h4>
                <span className="text-xs text-white/50">{scene.duration}</span>
              </div>
              <p className="text-sm text-white/70">{scene.visualDescription}</p>
              <p className="mt-2 text-xs text-purple-300"><span className="font-medium">AI Prompt:</span> {scene.aiPrompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIVideoPromptsSection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const textToCopy = content.aiVideoPrompts.map(s => `Scene ${s.number}: ${s.aiPrompt}`).join('\n\n');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">AI Video Generation Prompts</h3>
        <button
          onClick={() => onCopy(textToCopy, 'prompts')}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
        >
          {copied === 'prompts' ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>
      <p className="text-sm text-white/60">Use these prompts with RunwayML, Pika Labs, or Stable Video Diffusion</p>
      <div className="space-y-3">
        {content.aiVideoPrompts.map((prompt) => (
          <div key={prompt.number} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs font-medium text-indigo-300">
                Scene {prompt.number}
              </span>
              <span className="text-xs text-white/50">{prompt.duration}</span>
            </div>
            <p className="mb-2 font-medium text-white">{prompt.title}</p>
            <div className="rounded-lg bg-black/30 p-3 font-mono text-sm text-green-400">
              {prompt.aiPrompt}
            </div>
            <p className="mt-2 text-xs text-white/50"><span className="text-purple-300">Editing:</span> {prompt.editingNotes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditingPlanSection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const textToCopy = content.editingPlan.map(p => `${p.software}:\nSteps: ${p.steps.join('\n')}\nTiming: ${p.timing}\nCaptions: ${p.captions}\nEffects: ${p.effects.join(', ')}\nMusic: ${p.music}`).join('\n\n');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">CapCut-Ready Editing Instructions</h3>
        <button
          onClick={() => onCopy(textToCopy, 'editing')}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
        >
          {copied === 'editing' ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>
      {content.editingPlan.map((plan, idx) => (
        <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <span className="text-xl">🎬</span> {plan.software}
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h5 className="mb-2 text-sm font-medium text-purple-300">Steps</h5>
              <ol className="space-y-1 text-sm text-white/80">
                {plan.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-violet-400">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="mb-1 text-sm font-medium text-purple-300">Timing</h5>
                <p className="text-sm text-white/80">{plan.timing}</p>
              </div>
              <div>
                <h5 className="mb-1 text-sm font-medium text-purple-300">Captions</h5>
                <p className="text-sm text-white/80">{plan.captions}</p>
              </div>
              <div>
                <h5 className="mb-1 text-sm font-medium text-purple-300">Effects</h5>
                <div className="flex flex-wrap gap-1">
                  {plan.effects.map((effect, i) => (
                    <span key={i} className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/80">{effect}</span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="mb-1 text-sm font-medium text-purple-300">Music</h5>
                <p className="text-sm text-white/80">{plan.music}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HooksSection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const textToCopy = content.hooks.map(h => `${h.type}: ${h.text}`).join('\n\n');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">10 Viral Hook Variations</h3>
        <button
          onClick={() => onCopy(textToCopy, 'hooks')}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
        >
          {copied === 'hooks' ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {content.hooks.map((hook) => (
          <div key={hook.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-violet-500/50">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-sm font-bold text-violet-300">
              {hook.id}
            </div>
            <div className="flex-1">
              <p className="text-sm text-white/90">{hook.text}</p>
              <p className="mt-1 text-xs text-purple-300">{hook.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaptionCTASection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Platform-Specific Captions + CTAs</h3>
      {content.captionAndCTA.map((item, idx) => (
        <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-white">{item.platform}</h4>
            <button
              onClick={() => onCopy(`${item.caption}\n\n${item.cta}\n\nHashtags: ${item.hashtags.join(' ')}`, `caption-${idx}`)}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
            >
              {copied === `caption-${idx}` ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <div className="rounded-lg bg-black/30 p-3">
            <p className="whitespace-pre-wrap text-sm text-white/90">{item.caption}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {item.hashtags.map((tag, i) => (
              <span key={i} className="rounded bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300">{tag}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-white/70"><span className="text-purple-300">CTA:</span> {item.cta}</span>
            <span className="text-white/50"><span className="text-purple-300">Best Time:</span> {item.postingTime}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FunnelStrategySection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const textToCopy = content.funnelStrategy.map(f => `${f.stage}:\nAction: ${f.action}\nTool: ${f.tool}\nMetric: ${f.metric}`).join('\n\n');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Complete Funnel Strategy</h3>
        <button
          onClick={() => onCopy(textToCopy, 'funnel')}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
        >
          {copied === 'funnel' ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-indigo-600"></div>
        <div className="space-y-4">
          {content.funnelStrategy.map((stage, idx) => (
            <div key={idx} className="relative flex gap-4 pl-12">
              <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                {idx + 1}
              </div>
              <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4">
                <h4 className="mb-2 font-semibold text-white">{stage.stage}</h4>
                <div className="grid gap-2 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-purple-300">Action</p>
                    <p className="text-sm text-white/80">{stage.action}</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300">Tool</p>
                    <p className="text-sm text-white/80">{stage.tool}</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300">Metric</p>
                    <p className="text-sm text-white/80">{stage.metric}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationJSONSection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const jsonString = JSON.stringify(content, null, 2);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Complete Automation JSON Output</h3>
        <button
          onClick={() => onCopy(jsonString, 'json')}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
        >
          {copied === 'json' ? '✓ Copied!' : '📋 Copy JSON'}
        </button>
      </div>
      <p className="text-sm text-white/60">Use this JSON for API integrations, n8n workflows, or custom automation systems</p>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <div className="max-h-96 overflow-auto p-4">
          <pre className="text-xs font-mono text-green-400">{jsonString}</pre>
        </div>
      </div>
    </div>
  );
}

function WorkflowExecutionSection({ content, onCopy, copied }: { content: AutomationJSON; onCopy: (text: string, id: string) => void; copied: string | null }) {
  const textToCopy = content.automationWorkflow.map(s => `Step ${s.step}: ${s.title}\n${s.description}\nTools: ${s.tools.join(', ')}${s.inputFields ? `\nInput: ${s.inputFields.join(', ')}` : ''}${s.outputFields ? `\nOutput: ${s.outputFields.join(', ')}` : ''}`).join('\n\n');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">n8n Workflow Execution Plan</h3>
        <button
          onClick={() => onCopy(textToCopy, 'workflow')}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-all hover:bg-white/20"
        >
          {copied === 'workflow' ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>
      <p className="text-sm text-white/60">Step-by-step automation workflow for n8n, Make, or similar tools</p>
      <div className="space-y-3">
        {content.automationWorkflow.map((step) => (
          <div key={step.step} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white">
                {step.step}
              </div>
              <div>
                <h4 className="font-semibold text-white">{step.title}</h4>
                <p className="text-sm text-white/60">{step.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {step.tools.map((tool, i) => (
                <span key={i} className="rounded bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300">{tool}</span>
              ))}
            </div>
            {step.inputFields && (
              <div className="mt-3">
                <p className="text-xs text-purple-300">Input Fields:</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {step.inputFields.map((field, i) => (
                    <span key={i} className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">{field}</span>
                  ))}
                </div>
              </div>
            )}
            {step.outputFields && (
              <div className="mt-3">
                <p className="text-xs text-purple-300">Output Fields:</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {step.outputFields.map((field, i) => (
                    <span key={i} className="rounded bg-green-500/20 px-2 py-0.5 text-xs text-green-300">{field}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Workflow Goal Summary */}
      <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
        <h4 className="mb-2 flex items-center gap-2 font-semibold text-white">
          <span>🎯</span> Final Workflow Goal
        </h4>
        <p className="text-sm text-white/80">
          This workflow enables <strong>minimal human input</strong>, <strong>repeatable video generation</strong>, 
          and <strong>scalable daily content production</strong>. Each product can generate 3 complete videos 
          with scripts, AI prompts, editing instructions, and ready-to-post captions automatically.
        </p>
      </div>
    </div>
  );
}
