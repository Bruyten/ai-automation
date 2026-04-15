import { useMemo, useState } from "react";

type ProductInput = {
  productName: string;
  productDescription: string;
  targetAudience: string;
  keyBenefits: string[];
  painPoints: string[];
  offerType: string;
  cta: string;
  productImages: string;
  optionalClips: string;
};

type Scene = {
  timestamp: string;
  visual: string;
  script: string;
  onScreenText: string;
  audio: string;
};

type VideoConcept = {
  id: number;
  title: string;
  angle: string;
  hook: string;
  scenes: Scene[];
};

type GeneratedOutput = {
  concepts: VideoConcept[];
  hooks: string[];
  captions: { primary: string; alt1: string; alt2: string };
  visualPlan: any[];
  aiPrompts: any[];
  editingPlan: any;
  funnel: any;
  automationJson: any;
  workflow: any;
};

const EXAMPLES: Record<string, ProductInput> = {
  skincare: {
    productName: "GlowBeam LED Mask",
    productDescription: "At-home red light therapy mask that reduces wrinkles and acne in 10 minutes a day. FDA-cleared, dermatologist recommended.",
    targetAudience: "Women 28-45 who spend on skincare but hate expensive spa treatments",
    keyBenefits: ["Visible glow in 7 days", "Reduces fine lines", "Clears hormonal acne", "10 min/day at home"],
    painPoints: ["Wasting $200+/month on serums that don't work", "No time for spa appointments", "Filter-dependent selfies", "Harsh chemicals irritating skin"],
    offerType: "30-day risk-free trial + free shipping",
    cta: "Tap Shop Now",
    productImages: "Product on vanity, before/after skin, woman wearing mask",
    optionalClips: "Time-lapse of 7 days, dermatologist clip"
  },
  fitness: {
    productName: "HydraFuel",
    productDescription: "Zero-sugar electrolyte powder that hydrates 3x faster than water. Designed for busy professionals and gym goers.",
    targetAudience: "Men and women 25-40, into fitness, always tired, drink coffee all day",
    keyBenefits: ["3x faster hydration", "No crash, no sugar", "Mental clarity", "Tastes amazing"],
    painPoints: ["3pm energy crash", "Brain fog in meetings", "Water doesn't cut it", "Sugary sports drinks"],
    offerType: "Buy 1 Get 1 Free - Today Only",
    cta: "Get Yours",
    productImages: "Stick pack, mixing in water, gym bottle",
    optionalClips: "Gym sweat clip, office desk"
  },
  digital: {
    productName: "Notion Creator OS",
    productDescription: "Pre-built Notion system to plan, write, and schedule 30 days of TikTok content in 2 hours. For creators who want to post daily.",
    targetAudience: "Faceless creators, UGC creators, side hustlers trying to grow on TikTok",
    keyBenefits: ["30 days planned in 2 hours", "Never run out of ideas", "Viral hook database included", "Auto-scheduling templates"],
    painPoints: ["Staring at blank page", "Inconsistent posting", "No time to batch content", "Algorithm hates them"],
    offerType: "$27 one-time (normally $97)",
    cta: "Download Instantly",
    productImages: "Dashboard screenshot, phone mockup",
    optionalClips: "Screen recording"
  }
};

function generateOutput(input: ProductInput): GeneratedOutput {
  const { productName, productDescription, targetAudience, keyBenefits, painPoints, offerType, cta } = input;
  
  const audienceCallout = targetAudience.split(" ")[0] || "You";
  const mainPain = painPoints[0] || "wasting time and money";
  const mainBenefit = keyBenefits[0] || "results fast";
  const secondaryBenefit = keyBenefits[1] || keyBenefits[0] || "it just works";
  
  // CONCEPT 1: The Pain Flip
  const concept1: VideoConcept = {
    id: 1,
    title: "The Pain Flip",
    angle: "Call out the exact pain, flip to solution",
    hook: `POV: you're ${mainPain}`,
    scenes: [
      {
        timestamp: "0-3s",
        visual: "Close-up, frustrated face, messy bathroom counter with products",
        script: `If you're ${mainPain.toLowerCase()}, stop scrolling.`,
        onScreenText: `STOP DOING THIS`,
        audio: "Trending 'oh no' audio or original voice, urgent tone"
      },
      {
        timestamp: "3-15s",
        visual: "Quick cuts: wasted money, tired face, then product reveal",
        script: `I was spending hundreds on ${productName.split(' ')[0].toLowerCase()} stuff that didn't work. Found this — ${productDescription.split('.')[0].toLowerCase()}. ${targetAudience.includes('women') || targetAudience.includes('Women') ? 'My friend' : 'My buddy'} made me try it. ${secondaryBenefit} in like a week.`,
        onScreenText: `${mainBenefit.toUpperCase()} • ${secondaryBenefit.toUpperCase()}`,
        audio: "Voiceover, conversational, then product demo sounds"
      },
      {
        timestamp: "15-20s",
        visual: "Product in hand, smiling, showing results",
        script: `It's literally ${keyBenefits[2]?.toLowerCase() || 'so easy'}. ${offerType}. ${cta} before it's gone. Comment '${productName.split(' ')[0].toUpperCase()}' and I'll send link.`,
        onScreenText: `${offerType} 👇`,
        audio: "Upbeat outro, clear CTA"
      }
    ]
  };

  // CONCEPT 2: The Secret Reveal
  const concept2: VideoConcept = {
    id: 2,
    title: "The Secret Reveal",
    angle: "What they don't want you to know",
    hook: `They don't want you to know this`,
    scenes: [
      {
        timestamp: "0-3s",
        visual: "Finger over lips 'shh', quick zoom",
        script: `Your ${audienceCallout.toLowerCase()} skincare brand doesn't want you to know this.`,
        onScreenText: `SECRET 🤫`,
        audio: "Whisper trend audio"
      },
      {
        timestamp: "3-15s",
        visual: "Show product, then split screen before/after or demo",
        script: `${productName} does ${mainBenefit.toLowerCase()} without the ${mainPain.split(' ').slice(0,3).join(' ')}. It's why ${targetAudience.includes('dermatologist') ? 'derms' : 'influencers'} are switching. Takes ${keyBenefits.find(b => b.includes('min') || b.includes('hour')) || '10 minutes'}.`,
        onScreenText: `WHY NO ONE TALKS ABOUT THIS`,
        audio: "Confessional tone, building curiosity"
      },
      {
        timestamp: "15-20s",
        visual: "Unboxing or using product, link sticker",
        script: `I linked it below. ${offerType ? offerType.split(' - ')[0] + '.' : ''} Try it, or keep ${mainPain.toLowerCase()}. Your call. Follow for more real reviews.`,
        onScreenText: `LINK IN BIO • FOLLOW`,
        audio: "Casual, non-salesy close"
      }
    ]
  };

  // CONCEPT 3: The 3-Second Transformation
  const concept3: VideoConcept = {
    id: 3,
    title: "3-Second Test",
    angle: "Show, don't tell - transformation first",
    hook: `Watch this`,
    scenes: [
      {
        timestamp: "0-3s",
        visual: "Before shot, timer appears",
        script: `3 seconds. Watch.`,
        onScreenText: `3...2...1...`,
        audio: "Countdown beep, trending sound"
      },
      {
        timestamp: "3-15s",
        visual: "Fast transformation, product usage, results",
        script: `That's ${productName}. No filter. ${keyBenefits.slice(0,2).join(', ')}. I use it ${keyBenefits.find(b => b.includes('day') || b.includes('week'))?.toLowerCase() || 'daily'} and ${mainPain.includes('money') ? 'stopped wasting money' : 'actually see a difference'}.`,
        onScreenText: `${productName.toUpperCase()}`,
        audio: "Satisfying transition sound"
      },
      {
        timestamp: "15-20s",
        visual: "Hold product to camera, point down",
        script: `${offerType.includes('Free') ? 'They have a deal on right now.' : 'Worth every penny.'} ${cta}. Comment if you want my routine.`,
        onScreenText: `${cta.toUpperCase()} ↓`,
        audio: "Clear, friendly"
      }
    ]
  };

  const concepts = [concept1, concept2, concept3];

  const hooks = [
    `POV: you're ${mainPain.toLowerCase()}`,
    `Stop doing this if you're ${audienceCallout.toLowerCase()}`,
    `They don't want you to know about ${productName}`,
    `I wish someone told me this sooner`,
    `This replaced $200 of my routine`,
    `Unpopular opinion: ${mainPain} is a scam`,
    `3 seconds to ${mainBenefit.toLowerCase()}`,
    `Don't buy ${productName.split(' ')[0]} until you watch this`,
    `The reason your ${mainPain.split(' ').slice(-2).join(' ')} isn't working`,
    `I tested ${productName} for 7 days`
  ];

  const captions = {
    primary: `${concept1.hook}. ${productDescription} ${mainBenefit}, ${secondaryBenefit}. ${offerType} 👇\n\n${cta} - link in bio\n\n#${productName.replace(/\s+/g, '')} #${targetAudience.split(' ')[0].toLowerCase()}tok #lifehack`,
    alt1: `not gatekeeping this anymore. ${keyBenefits.join(' • ')}\n\ncomment "${productName.split(' ')[0]}" for link`,
    alt2: `your sign to stop ${mainPain.toLowerCase()}. link below ⬇️`
  };

  const visualPlan = concepts.map(c => ({
    concept: c.title,
    scenes: c.scenes.map(s => ({
      time: s.timestamp,
      shot: s.visual,
      text: s.onScreenText,
      broll: s.timestamp === "3-15s" ? "product demo, lifestyle, UGC style" : "talking head"
    }))
  }));

  const aiPrompts = concepts.flatMap(c => 
    c.scenes.map((s, i) => ({
      concept: c.id,
      scene: i + 1,
      prompt: `${s.visual}. ${productName} context. UGC style, iPhone 15, natural lighting, 9:16 vertical, TikTok aesthetic, authentic not commercial. ${s.timestamp.includes('0-3') ? 'Pattern interrupt, fast zoom' : s.timestamp.includes('3-15') ? 'Product demonstration' : 'Clean product shot, smiling creator'}. --ar 9:16 --style raw`
    }))
  );

  const editingPlan = {
    app: "CapCut Desktop or Mobile",
    timeline: "19-21 seconds total",
    cuts: [
      "0:00-0:02.5 - Hook, 110% speed, 1.2x zoom in at 1s",
      "0:02.5-0:14 - Problem/value, jump cuts every 1.5s, add captions word-by-word",
      "0:14-0:20 - CTA, slow to 95%, steady shot"
    ],
    captions: {
      style: "Bold, white with black outline, 2-3 words max per screen",
      animation: "Pop in, 0.1s",
      position: "Center or lower third"
    },
    effects: ["Auto velocity on hook", "Green screen for product text overlay", "Subtle shake on 'stop scrolling'"],
    audio: "Trending sound at 15% volume under voiceover, or original audio",
    export: "1080x1920, 30fps, 8-12MB"
  };

  const funnel = {
    tiktok: "Post 3 concepts in 24h, test hooks. Best performer gets $20/day Spark Ad",
    landing: "1-page, mobile-first. Above fold: video + headline '${mainBenefit} in ${keyBenefits.find(b => /\d/.test(b)) || 'days'}'. Below: 3 benefits, social proof, ${offerType}",
    email: "If digital: deliver + 3-day nurture. If physical: abandoned cart at 1h, 24h",
    retargeting: "Viewers 3s+ → testimonial video. Clickers → offer stack video"
  };

  const automationJson = {
    version: "1.0",
    product: {
      name: productName,
      description: productDescription,
      audience: targetAudience,
      benefits: keyBenefits,
      pains: painPoints,
      offer: offerType,
      cta
    },
    output: {
      concepts: concepts.map(c => ({
        id: c.id,
        title: c.title,
        angle: c.angle,
        hook: c.hook,
        script_full: c.scenes.map(s => s.script).join(' '),
        scenes: c.scenes
      })),
      hooks,
      captions,
      ai_video_prompts: aiPrompts,
      editing: editingPlan
    },
    metadata: {
      generated_at: new Date().toISOString(),
      format: "tiktok_9x16",
      duration_target: "19-21s"
    }
  };

  const workflow = {
    trigger: "Google Sheets 'New Row' or Manual",
    nodes: [
      { step: 1, name: "Input", action: "Watch Google Sheet columns: product_name, description, audience, benefits (comma), pains (comma), offer, cta, images" },
      { step: 2, name: "Set Variables", action: "Map sheet data to workflow variables" },
      { step: 3, name: "LLM Call", action: "POST to LLM with master prompt + variables. Model: GPT-4o or Claude 3.5. Temperature 0.8" },
      { step: 4, name: "Parse JSON", action: "Extract scripts, scenes, prompts, captions from LLM response" },
      { step: 5, name: "Loop Scenes", action: "For each of 9 scenes (3 concepts x 3 scenes)" },
      { step: 6, name: "Generate Video", action: "POST prompt to Runway Gen-3 or Pika. Duration 4s, 9:16" },
      { step: 7, name: "Wait & Download", action: "Poll API, download mp4 to Drive: /{product_name}/concept_{n}/scene_{n}.mp4" },
      { step: 8, name: "Save Assets", action: "Write script.txt, captions.txt, prompts.json to same folder" },
      { step: 9, name: "Notify", action: "Slack/Discord: 'Videos ready for {productName} - edit in CapCut'" },
      { step: 10, name: "Scale", action: "Process next row. Batch 5 products/day = 15 videos" }
    ]
  };

  return { concepts, hooks, captions, visualPlan, aiPrompts, editingPlan, funnel, automationJson, workflow };
}

export default function App() {
  const [input, setInput] = useState<ProductInput>(EXAMPLES.skincare);
  const [activeExample, setActiveExample] = useState("skincare");
  const [generated, setGenerated] = useState<GeneratedOutput | null>(null);
  const [activeTab, setActiveTab] = useState<"concepts" | "scripts" | "visual" | "prompts" | "editing" | "hooks" | "captions" | "funnel" | "json" | "workflow">("concepts");
  const [copied, setCopied] = useState<string | null>(null);

  const output = useMemo(() => generated || generateOutput(input), [generated, input]);

  const updateField = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) => {
    setInput(prev => ({ ...prev, [key]: value }));
    setGenerated(null);
  };

  const updateArray = (key: "keyBenefits" | "painPoints", index: number, value: string) => {
    const arr = [...input[key]];
    arr[index] = value;
    updateField(key, arr);
  };

  const addArrayItem = (key: "keyBenefits" | "painPoints") => {
    updateField(key, [...input[key], ""]);
  };

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const loadExample = (key: string) => {
    setInput(EXAMPLES[key]);
    setActiveExample(key);
    setGenerated(null);
  };

  const handleGenerate = () => {
    setGenerated(generateOutput(input));
    setActiveTab("concepts");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <div>
              <div className="text-[15px] font-semibold tracking-tight">ViralShift AI</div>
              <div className="text-[11px] text-zinc-500 -mt-1">Short-Form Automation Engine</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-[11px] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              TikTok • Reels • Shorts
            </span>
            <button onClick={handleGenerate} className="rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-black hover:bg-zinc-200 transition">
              Generate
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-zinc-900 lg:grid-cols-[460px_1fr] xl:grid-cols-[520px_1fr]">
        {/* INPUT PANEL */}
        <section className="bg-[#0f0f10] lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:overflow-y-auto">
          <div className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-zinc-500">Product Input</h2>
              <div className="flex gap-1.5">
                {Object.keys(EXAMPLES).map(key => (
                  <button
                    key={key}
                    onClick={() => loadExample(key)}
                    className={`rounded-md px-2.5 py-1 text-[11px] capitalize transition ${
                      activeExample === key 
                        ? "bg-white text-black" 
                        : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Product Name", key: "productName", placeholder: "GlowBeam LED Mask" },
                { label: "Product Description", key: "productDescription", type: "textarea", placeholder: "What it is and what it does in one sentence" },
                { label: "Target Audience", key: "targetAudience", placeholder: "Women 28-45 who..." },
              ].map(field => (
                <div key={field.key}>
                  <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={input[field.key as keyof ProductInput] as string}
                      onChange={e => updateField(field.key as keyof ProductInput, e.target.value)}
                      placeholder={field.placeholder}
                      rows={2}
                      className="w-full resize-none rounded-xl border border-zinc-800 bg-[#161617] px-3.5 py-2.5 text-[14px] outline-none placeholder:text-zinc-600 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                    />
                  ) : (
                    <input
                      value={input[field.key as keyof ProductInput] as string}
                      onChange={e => updateField(field.key as keyof ProductInput, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-zinc-800 bg-[#161617] px-3.5 py-2.5 text-[14px] outline-none placeholder:text-zinc-600 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                    />
                  )}
                </div>
              ))}

              {/* Benefits */}
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">Key Benefits</label>
                <div className="space-y-2">
                  {input.keyBenefits.map((b, i) => (
                    <input
                      key={i}
                      value={b}
                      onChange={e => updateArray("keyBenefits", i, e.target.value)}
                      placeholder={`Benefit ${i + 1}`}
                      className="w-full rounded-xl border border-zinc-800 bg-[#161617] px-3.5 py-2 text-[13px] outline-none placeholder:text-zinc-600 focus:border-zinc-700"
                    />
                  ))}
                </div>
                <button onClick={() => addArrayItem("keyBenefits")} className="mt-2 text-[12px] text-zinc-500 hover:text-zinc-300">+ Add benefit</button>
              </div>

              {/* Pains */}
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">Pain Points</label>
                <div className="space-y-2">
                  {input.painPoints.map((p, i) => (
                    <input
                      key={i}
                      value={p}
                      onChange={e => updateArray("painPoints", i, e.target.value)}
                      placeholder={`Pain ${i + 1}`}
                      className="w-full rounded-xl border border-zinc-800 bg-[#161617] px-3.5 py-2 text-[13px] outline-none placeholder:text-zinc-600 focus:border-zinc-700"
                    />
                  ))}
                </div>
                <button onClick={() => addArrayItem("painPoints")} className="mt-2 text-[12px] text-zinc-500 hover:text-zinc-300">+ Add pain</button>
              </div>

              {[
                { label: "Offer Type", key: "offerType", placeholder: "30-day trial + free shipping" },
                { label: "Call To Action", key: "cta", placeholder: "Tap Shop Now" },
              ].map(field => (
                <div key={field.key}>
                  <label className="mb-1.5 block text-[12px] font-medium text-zinc-400">{field.label}</label>
                  <input
                    value={input[field.key as keyof ProductInput] as string}
                    onChange={e => updateField(field.key as keyof ProductInput, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-zinc-800 bg-[#161617] px-3.5 py-2.5 text-[14px] outline-none placeholder:text-zinc-600 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-medium text-zinc-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M3 12h18"/></svg>
                3-Scene Structure
              </div>
              <div className="space-y-1.5 text-[12px] text-zinc-500">
                <div className="flex gap-2"><span className="text-zinc-600">0-3s</span> <span>Hook: pattern interrupt</span></div>
                <div className="flex gap-2"><span className="text-zinc-600">3-15s</span> <span>Problem + value + proof</span></div>
                <div className="flex gap-2"><span className="text-zinc-600">15-20s</span> <span>Solution + dual CTA</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* OUTPUT PANEL */}
        <section className="min-h-screen bg-[#0c0c0d]">
          {/* Tabs */}
          <div className="sticky top-[57px] z-30 border-b border-zinc-900 bg-[#0c0c0d]/90 backdrop-blur-xl">
            <div className="flex items-center gap-1 overflow-x-auto px-4 py-2.5 scrollbar-none">
              {[
                { id: "concepts", label: "1. Concepts", icon: "🎬" },
                { id: "scripts", label: "2. Scripts", icon: "✍️" },
                { id: "visual", label: "3. Visual", icon: "🎥" },
                { id: "prompts", label: "4. AI Prompts", icon: "🎨" },
                { id: "editing", label: "5. Editing", icon: "✂️" },
                { id: "hooks", label: "6. Hooks", icon: "🧠" },
                { id: "captions", label: "7. Captions", icon: "📱" },
                { id: "funnel", label: "8. Funnel", icon: "🔗" },
                { id: "json", label: "9. JSON", icon: "🤖" },
                { id: "workflow", label: "10. Workflow", icon: "⚙️" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-[12px] font-medium transition ${
                    activeTab === tab.id
                      ? "bg-white text-black"
                      : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-8">
            {/* SECTION 1: CONCEPTS */}
            {activeTab === "concepts" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">🔥 SECTION 1: VIDEO CONCEPTS</h1>
                  <p className="mt-1 text-[13px] text-zinc-500">3 proven angles, each built for retention</p>
                </div>

                {output.concepts.map((concept) => (
                  <div key={concept.id} className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#141416]">
                    <div className="border-b border-zinc-800 bg-zinc-900/50 px-5 py-3.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-zinc-500">CONCEPT {concept.id}</span>
                            <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-300">{concept.angle}</span>
                          </div>
                          <h3 className="mt-1.5 text-[17px] font-semibold">{concept.title}</h3>
                          <p className="text-[13px] text-zinc-500">Hook: "{concept.hook}"</p>
                        </div>
                        <button
                          onClick={() => copy(concept.scenes.map(s => s.script).join(' '), `concept-${concept.id}`)}
                          className="text-[12px] text-zinc-500 hover:text-white"
                        >
                          {copied === `concept-${concept.id}` ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                    <div className="divide-y divide-zinc-800/50">
                      {concept.scenes.map((scene, i) => (
                        <div key={i} className="grid grid-cols-[80px_1fr] gap-4 p-5 sm:grid-cols-[100px_1fr_200px]">
                          <div>
                            <div className="text-[11px] font-mono text-zinc-500">{scene.timestamp}</div>
                            <div className="mt-1 text-[11px] uppercase tracking-wide text-zinc-600">
                              {i === 0 ? "HOOK" : i === 1 ? "VALUE" : "CTA"}
                            </div>
                          </div>
                          <div>
                            <p className="text-[14px] leading-snug text-zinc-200">"{scene.script}"</p>
                            <p className="mt-2 text-[12px] text-zinc-500">{scene.visual}</p>
                          </div>
                          <div className="hidden sm:block">
                            <div className="rounded-lg bg-black/50 px-3 py-2 font-mono text-[11px] text-emerald-400">
                              {scene.onScreenText}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 2: SCRIPTS */}
            {activeTab === "scripts" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">🎬 SECTION 2: FULL SCRIPTS (SCENE-BASED)</h1>
                  <p className="mt-1 text-[13px] text-zinc-500">Word-for-word, ready to record</p>
                </div>
                {output.concepts.map(c => (
                  <div key={c.id} className="rounded-2xl border border-zinc-800 bg-[#141416] p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-[15px] font-semibold">Video {c.id}: {c.title}</h3>
                      <button onClick={() => copy(c.scenes.map(s => `[${s.timestamp}] ${s.script}`).join('\n\n'), `script-${c.id}`)} className="text-[12px] text-zinc-500 hover:text-white">
                        {copied === `script-${c.id}` ? "Copied!" : "Copy script"}
                      </button>
                    </div>
                    <div className="space-y-3 font-mono text-[13px] leading-relaxed">
                      {c.scenes.map((s, i) => (
                        <div key={i}>
                          <span className="text-zinc-600">[{s.timestamp}]</span> <span className="text-zinc-200">{s.script}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 3: VISUAL */}
            {activeTab === "visual" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">🎥 SECTION 3: VISUAL BUILD PLAN</h1>
                  <p className="mt-1 text-[13px] text-zinc-500">Scene-by-scene shot list</p>
                </div>
                {output.visualPlan.map((v: any, i: number) => (
                  <div key={i} className="rounded-2xl border border-zinc-800 bg-[#141416] p-5">
                    <h3 className="mb-3 text-[15px] font-semibold">{v.concept}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[13px]">
                        <thead className="text-left text-[11px] uppercase tracking-wide text-zinc-500">
                          <tr className="border-b border-zinc-800">
                            <th className="pb-2 pr-4">Time</th>
                            <th className="pb-2 pr-4">Shot</th>
                            <th className="pb-2 pr-4">On-Screen Text</th>
                            <th className="pb-2">B-Roll</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {v.scenes.map((s: any, j: number) => (
                            <tr key={j}>
                              <td className="py-2.5 pr-4 font-mono text-zinc-500">{s.time}</td>
                              <td className="py-2.5 pr-4 text-zinc-300">{s.shot}</td>
                              <td className="py-2.5 pr-4"><span className="rounded bg-zinc-900 px-2 py-1 font-mono text-[11px] text-emerald-400">{s.text}</span></td>
                              <td className="py-2.5 text-zinc-500">{s.broll}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 4: PROMPTS */}
            {activeTab === "prompts" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">🎨 SECTION 4: AI VIDEO PROMPTS</h1>
                  <p className="mt-1 text-[13px] text-zinc-500">Runway, Pika, Luma ready</p>
                </div>
                <div className="grid gap-3">
                  {output.aiPrompts.map((p: any, i: number) => (
                    <div key={i} className="group relative rounded-xl border border-zinc-800 bg-[#141416] p-4 hover:border-zinc-700">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-zinc-500">CONCEPT {p.concept} • SCENE {p.scene}</span>
                        <button onClick={() => copy(p.prompt, `prompt-${i}`)} className="opacity-0 transition group-hover:opacity-100 text-[11px] text-zinc-500 hover:text-white">
                          {copied === `prompt-${i}` ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <p className="text-[13px] leading-snug text-zinc-300">{p.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 5: EDITING */}
            {activeTab === "editing" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">✂️ SECTION 5: EDITING PLAN</h1>
                  <p className="mt-1 text-[13px] text-zinc-500">CapCut-ready instructions</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-[#141416] p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-zinc-500">Timeline</h4>
                      <p className="text-[14px]">{output.editingPlan.timeline}</p>
                      <div className="mt-4 space-y-2">
                        {output.editingPlan.cuts.map((cut: string, i: number) => (
                          <div key={i} className="text-[13px] text-zinc-400">• {cut}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-zinc-500">Captions</h4>
                      <p className="text-[13px] text-zinc-300">{output.editingPlan.captions.style}</p>
                      <p className="mt-1 text-[12px] text-zinc-500">Animation: {output.editingPlan.captions.animation}</p>
                      
                      <h4 className="mb-2 mt-4 text-[12px] font-semibold uppercase tracking-wide text-zinc-500">Effects</h4>
                      <div className="space-y-1">
                        {output.editingPlan.effects.map((e: string, i: number) => (
                          <div key={i} className="text-[13px] text-zinc-400">• {e}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-zinc-800 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-zinc-500">Export: {output.editingPlan.export}</span>
                      <button onClick={() => copy(JSON.stringify(output.editingPlan, null, 2), 'editing')} className="text-[12px] text-zinc-500 hover:text-white">
                        {copied === 'editing' ? "Copied!" : "Copy plan"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 6: HOOKS */}
            {activeTab === "hooks" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">🧠 SECTION 6: HOOKS</h1>
                  <p className="mt-1 text-[13px] text-zinc-500">10 pattern-interrupt variations</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {output.hooks.map((hook, i) => (
                    <div key={i} className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-[#141416] px-4 py-3 hover:border-zinc-700">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-zinc-600">{String(i+1).padStart(2,'0')}</span>
                        <span className="text-[14px]">{hook}</span>
                      </div>
                      <button onClick={() => copy(hook, `hook-${i}`)} className="opacity-0 transition group-hover:opacity-100 text-[11px] text-zinc-500 hover:text-white">
                        {copied === `hook-${i}` ? "✓" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 7: CAPTIONS */}
            {activeTab === "captions" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">📱 SECTION 7: CAPTION + CTA</h1>
                </div>
                {Object.entries(output.captions).map(([key, caption]) => (
                  <div key={key} className="rounded-2xl border border-zinc-800 bg-[#141416] p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-[13px] font-medium uppercase tracking-wide text-zinc-500">{key}</h3>
                      <button onClick={() => copy(caption, `caption-${key}`)} className="text-[12px] text-zinc-500 hover:text-white">
                        {copied === `caption-${key}` ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-zinc-200">{caption}</p>
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 8: FUNNEL */}
            {activeTab === "funnel" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">🔗 SECTION 8: FUNNEL STRATEGY</h1>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(output.funnel).map(([key, value]) => (
                    <div key={key} className="rounded-2xl border border-zinc-800 bg-[#141416] p-5">
                      <h3 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-zinc-500">{key}</h3>
                      <p className="text-[14px] leading-snug text-zinc-300">{value as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 9: JSON */}
            {activeTab === "json" && (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-[22px] font-semibold tracking-tight">🤖 SECTION 9: AUTOMATION JSON OUTPUT</h1>
                    <p className="mt-1 text-[13px] text-zinc-500">Plug into n8n, Zapier, or custom workflow</p>
                  </div>
                  <button onClick={() => copy(JSON.stringify(output.automationJson, null, 2), 'json')} className="rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-black hover:bg-zinc-200">
                    {copied === 'json' ? "Copied!" : "Copy JSON"}
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0a0a0b] p-5 text-[12px] leading-relaxed">
                  <code className="font-mono text-zinc-300">{JSON.stringify(output.automationJson, null, 2)}</code>
                </pre>
              </div>
            )}

            {/* SECTION 10: WORKFLOW */}
            {activeTab === "workflow" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">⚙️ SECTION 10: WORKFLOW EXECUTION PLAN</h1>
                  <p className="mt-1 text-[13px] text-zinc-500">n8n implementation, step-by-step</p>
                </div>
                
                <div className="rounded-2xl border border-zinc-800 bg-[#141416] p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h8v8H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold">n8n Workflow Structure</h3>
                      <p className="text-[12px] text-zinc-500">Trigger → Format → AI → Generate → Store → Notify</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {output.workflow.nodes.map((node: any) => (
                      <div key={node.step} className="group relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-[11px] font-mono text-zinc-400 group-hover:border-white group-hover:text-white transition">
                            {node.step}
                          </div>
                          {node.step < 10 && <div className="mt-1 h-full w-px bg-zinc-800" />}
                        </div>
                        <div className="pb-6">
                          <div className="flex items-center gap-2">
                            <h4 className="text-[14px] font-medium">{node.name}</h4>
                            <span className="text-[11px] text-zinc-600">Step {node.step}</span>
                          </div>
                          <p className="mt-1 text-[13px] leading-snug text-zinc-400">{node.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl bg-black/50 p-4">
                    <h4 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-zinc-500">Scaling Logic</h4>
                    <p className="text-[13px] text-zinc-400">Process multiple products automatically. Batch generate videos. Scale daily content production with minimal human input. Each product = 3 videos x 3 scenes = 9 AI generations. Run overnight.</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Input Source", value: "Google Sheets with columns for all product fields" },
                    { label: "AI Processing", value: "LLM with master prompt, temperature 0.8" },
                    { label: "Output", value: "Drive folder per product with videos + scripts" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-zinc-800 bg-[#141416] p-4">
                      <div className="text-[11px] uppercase tracking-wide text-zinc-500">{item.label}</div>
                      <div className="mt-1.5 text-[13px] text-zinc-300">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}