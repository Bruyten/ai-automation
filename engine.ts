import { ProductInput, VideoConcept, GeneratedContent, WorkflowStep } from './types';

function generateVideoConcepts(input: ProductInput): VideoConcept[] {
  const { productName, productDescription, targetAudience, keyBenefits, painPoints, offerType, callToAction } = input;
  
  const benefitsList = keyBenefits.split(',').map(b => b.trim()).filter(Boolean);
  const painList = painPoints.split(',').map(p => p.trim()).filter(Boolean);
  const mainBenefit = benefitsList[0] || 'transform your results';
  const mainPain = painList[0] || 'struggling with this';
  const secondPain = painList[1] || 'wasting time';
  const _secondBenefit = benefitsList[1] || 'save time';
  void _secondBenefit;

  return [
    {
      id: 1,
      title: 'The "Wait, What?" Pattern Interrupt',
      angle: 'Shock & Curiosity — Lead with an unexpected statement that stops the scroll',
      hook: `Stop ${mainPain.toLowerCase()} — this changes everything.`,
      scenes: [
        {
          sceneNumber: 1,
          label: 'Hook',
          timeRange: '0–3 sec',
          script: `"I can't believe ${targetAudience.toLowerCase()} are still ${mainPain.toLowerCase()}…"`,
          visual: `Close-up shot of someone looking frustrated at their screen. Text overlay: "${mainPain}" with strike-through animation. Dark moody lighting with a single spotlight.`,
          aiPrompt: `Cinematic close-up of a person looking frustrated at a laptop screen in a dark room with dramatic single-source lighting, shallow depth of field, 4K, the mood is tense and relatable, modern minimalist desk setup`,
          editingNotes: 'Quick zoom-in on face. Flash text overlay with glitch effect. Sound: record scratch or bass drop.'
        },
        {
          sceneNumber: 2,
          label: 'Problem + Value',
          timeRange: '3–15 sec',
          script: `"Every day, ${targetAudience.toLowerCase()} waste hours ${secondPain.toLowerCase()}. I was the same until I found ${productName}. ${productDescription.slice(0, 100)}. In just days, I was able to ${mainBenefit.toLowerCase()}. And thousands of others are seeing the same results."`,
          visual: `Split screen: Left side shows the struggle (messy, chaotic). Right side shows the transformation (clean, organized). Product mockup appears center with a subtle glow. Counter animation showing "10,000+ users" fades in.`,
          aiPrompt: `Split-screen comparison shot, left side chaotic and disorganized workspace, right side clean and polished modern workspace with ${productName} on screen, warm golden lighting on the right side, cool blue tones on left, 4K cinematic, professional product photography style`,
          editingNotes: 'Smooth transition wipe from left to right. Add subtle particle effects on the "after" side. Background music builds. Text pop-ups for each benefit.'
        },
        {
          sceneNumber: 3,
          label: 'Solution + CTA',
          timeRange: '15–20 sec',
          script: `"${callToAction} — it's that simple. ${offerType ? offerType + '.' : ''} Drop a '🔥' in the comments if you need this, and follow for more game-changers."`,
          visual: `Product hero shot with animated benefits floating around it. CTA button animation. Profile card with "Follow" prompt. Urgency badge if applicable.`,
          aiPrompt: `Hero product shot of ${productName} floating in a dark void with neon accent lights (green and purple), holographic UI elements floating around it, futuristic tech aesthetic, 4K, clean and premium, lens flare`,
          editingNotes: 'Zoom out reveal. Benefits text flies in one by one. End card with CTA overlay and follow button. Sound: satisfying chime.'
        }
      ]
    },
    {
      id: 2,
      title: 'The "Secret They Don\'t Want You to Know"',
      angle: 'Insider Knowledge — Position the product as a hidden advantage',
      hook: `The ${targetAudience.toLowerCase()} who know about this have an unfair advantage.`,
      scenes: [
        {
          sceneNumber: 1,
          label: 'Hook',
          timeRange: '0–3 sec',
          script: `"There's something top ${targetAudience.toLowerCase()} aren't telling you about…"`,
          visual: `Mysterious dark scene. A glowing screen illuminates someone's face. "CLASSIFIED" stamp animation appears then dissolves. Whisper-style text overlay.`,
          aiPrompt: `Mysterious dark room with a single glowing laptop screen illuminating a person's face from below, noir style, dramatic shadows, 4K cinematic, secretive mood, green matrix-style reflections on face`,
          editingNotes: 'Slow zoom in. "Classified" stamp sound effect. Lower the background music to create tension. Whisper voice effect optional.'
        },
        {
          sceneNumber: 2,
          label: 'Problem + Value',
          timeRange: '3–15 sec',
          script: `"While everyone else is stuck ${mainPain.toLowerCase()}, smart ${targetAudience.toLowerCase()} are using ${productName} to ${mainBenefit.toLowerCase()}. Here's what makes it different: ${benefitsList.slice(0, 3).join(', ')}. The results speak for themselves."`,
          visual: `Rapid montage: frustrated people → discovery moment → using product → celebrating results. Each transition uses a smooth morph effect. Floating testimonial cards appear briefly.`,
          aiPrompt: `Dynamic montage-style composition showing transformation journey, starting with frustration transitioning to discovery and success, multiple exposure effect, vibrant colors transitioning from cold blue to warm gold, 4K, editorial style photography`,
          editingNotes: 'Fast cuts synced to beat drops. Each benefit gets its own text card with icon. Morph transitions between scenes. Energy builds throughout.'
        },
        {
          sceneNumber: 3,
          label: 'Solution + CTA',
          timeRange: '15–20 sec',
          script: `"Don't get left behind. ${callToAction} before everyone catches on. ${offerType ? 'Right now: ' + offerType + '.' : ''} Comment 'INFO' and I'll send you the details."`,
          visual: `Countdown timer visual. Product with "limited" badge. Comment prompt animation. Arrow pointing to bio/link. Social proof counter ticking up.`,
          aiPrompt: `Premium product showcase of ${productName} with countdown timer hologram, luxury dark background with gold accents, exclusive VIP feeling, 4K, depth of field, bokeh lights in background`,
          editingNotes: 'Urgency sound effects (ticking clock). Quick flash frames. CTA text animates in with bounce effect. End with logo/branding.'
        }
      ]
    },
    {
      id: 3,
      title: 'The "Before/After Transformation"',
      angle: 'Visual Proof — Show the dramatic difference the product makes',
      hook: `${mainPain} vs. after discovering ${productName}. The difference is insane.`,
      scenes: [
        {
          sceneNumber: 1,
          label: 'Hook',
          timeRange: '0–3 sec',
          script: `"POV: You just found the one thing that actually works for ${mainPain.toLowerCase()}…"`,
          visual: `POV-style shot — hand reaching toward a glowing product. Screen flickers. "Before" state shown in desaturated colors. Dramatic reveal incoming.`,
          aiPrompt: `First-person POV shot of a hand reaching toward a glowing digital product on a screen, desaturated background transitioning to vivid colors, dramatic lens flare, 4K, cinematic depth of field, anticipation mood`,
          editingNotes: 'POV camera shake. Desaturated filter for "before." Color explosion on reveal. Bass drop sound effect.'
        },
        {
          sceneNumber: 2,
          label: 'Problem + Value',
          timeRange: '3–15 sec',
          script: `"Before ${productName}: ${painList.slice(0, 2).join(', ')}. After ${productName}: ${benefitsList.slice(0, 2).join(', ')}. It's not even close. ${productDescription.slice(0, 80)}. Join the ${Math.floor(Math.random() * 9 + 1)}K+ people who already made the switch."`,
          visual: `Clean before/after split. Left: grey, cluttered, stressful visuals. Right: vibrant, organized, successful visuals. Product centered as the bridge between the two worlds. User count animation.`,
          aiPrompt: `Dramatic before and after split composition, left half in grayscale showing chaos and stress, right half in vivid warm colors showing success and organization, a glowing product bridge connecting both halves, 4K, editorial magazine style, sharp contrast`,
          editingNotes: 'Sliding reveal transition from before to after. Satisfying whoosh sound. Each pain/benefit gets floating text label. Counter animation for social proof.'
        },
        {
          sceneNumber: 3,
          label: 'Solution + CTA',
          timeRange: '15–20 sec',
          script: `"Your transformation starts now. ${callToAction}. ${offerType ? offerType + ' — but not for long.' : ''} Save this for later and follow for more."`,
          visual: `Hero product with radiating light. "Start Now" button animation. Save/bookmark prompt. Follow card. Optional: quick testimonial flash.`,
          aiPrompt: `Inspirational hero shot of ${productName} with radiating golden light beams, motivational atmosphere, sunrise/dawn colors, 4K, aspirational and empowering mood, clean modern aesthetic`,
          editingNotes: 'Slow-mo reveal with light rays. Inspirational music swell. Text animates with glow effect. Bookmark/save icon bounces. Clean end card.'
        }
      ]
    }
  ];
}

function generateHooks(input: ProductInput): string[] {
  const { productName, targetAudience, painPoints, keyBenefits } = input;
  const mainPain = painPoints.split(',')[0]?.trim() || 'this common problem';
  const mainBenefit = keyBenefits.split(',')[0]?.trim() || 'incredible results';

  return [
    `Stop scrolling if you're still ${mainPain.toLowerCase()}…`,
    `${targetAudience} — you NEED to see this.`,
    `I wish someone told me about ${productName} sooner.`,
    `The #1 reason ${targetAudience.toLowerCase()} fail? ${mainPain}. Here's the fix.`,
    `"This can't be real…" — my reaction to ${productName}.`,
    `POV: You finally stop ${mainPain.toLowerCase()} forever.`,
    `${targetAudience} are switching to this and never looking back.`,
    `If you're tired of ${mainPain.toLowerCase()}, watch this.`,
    `How I went from ${mainPain.toLowerCase()} to ${mainBenefit.toLowerCase()} in one week.`,
    `This is the unfair advantage nobody talks about.`,
  ];
}

function generateCaptions(input: ProductInput): { platform: string; caption: string }[] {
  const { productName, callToAction, painPoints, keyBenefits, offerType } = input;
  const mainPain = painPoints.split(',')[0]?.trim() || 'struggling';
  const mainBenefit = keyBenefits.split(',')[0]?.trim() || 'amazing results';

  return [
    {
      platform: 'TikTok',
      caption: `Still ${mainPain.toLowerCase()}? 😤 Not anymore.\n\n${productName} just changed the game → ${mainBenefit.toLowerCase()} ✨\n\n${offerType ? '🔥 ' + offerType : ''}\n\n${callToAction} 👆 Link in bio\n\nDrop a 🔥 if you need this!\n\n#${productName.replace(/\s/g, '')} #viral #gamechanger #fyp #productivity`
    },
    {
      platform: 'Instagram Reels',
      caption: `The secret to ${mainBenefit.toLowerCase()}? 👀\n\nI was stuck ${mainPain.toLowerCase()} until I discovered ${productName}.\n\nHere's what happened:\n✅ ${keyBenefits.split(',').slice(0, 3).map(b => b.trim()).join('\n✅ ')}\n\n${offerType ? '⚡ ' + offerType : ''}\n\n${callToAction} → Link in bio\n\nSave this for later 🔖\n\n#${productName.replace(/\s/g, '')} #reels #transformation #musthave`
    },
    {
      platform: 'YouTube Shorts',
      caption: `${productName} — The Tool That Changed Everything 🚀\n\nIf you're tired of ${mainPain.toLowerCase()}, this is your answer.\n\n${callToAction}\n\n👇 Full breakdown in the comments\n\n#shorts #${productName.replace(/\s/g, '')} #productivity #howto`
    },
    {
      platform: 'Twitter/X',
      caption: `Still ${mainPain.toLowerCase()}?\n\n${productName} fixes that.\n\n→ ${keyBenefits.split(',').slice(0, 3).map(b => b.trim()).join('\n→ ')}\n\n${offerType ? offerType + '\n\n' : ''}${callToAction} 🔗`
    }
  ];
}

function generateFunnelStrategy(input: ProductInput): string[] {
  return [
    `🎯 TOFU (Top of Funnel): Use Video Concept 1 & 3 as discovery content on TikTok & Reels. Optimize for shares and saves. Target broad ${input.targetAudience.toLowerCase()} interests.`,
    `🔄 MOFU (Middle of Funnel): Retarget viewers who watched 50%+ with Video Concept 2 (the "insider" angle). Include social proof and deeper benefit breakdowns.`,
    `💰 BOFU (Bottom of Funnel): Deploy urgency-driven CTA variations. Use countdown offers and limited availability messaging. Direct to landing page with ${input.offerType || 'special offer'}.`,
    `📧 Email/DM Sequence: Capture "INFO" commenters and "link in bio" clickers. Deliver 3-email sequence: Value → Story → Offer. Automate via n8n webhook integration.`,
    `🔁 Retargeting Loop: Non-converters get new creative angle every 3 days. Cycle through all 3 video concepts. Refresh hooks weekly using generated variations.`,
    `📈 Scale Phase: Identify winning video (highest completion rate). Create 5 variations of winning concept. Increase spend on top performer. Test new audiences.`,
  ];
}

function generateAutomationJSON(input: ProductInput, concepts: VideoConcept[]): object {
  return {
    automation_id: `vf_${Date.now()}`,
    version: '2.0',
    engine: 'ViralForge AI',
    generated_at: new Date().toISOString(),
    product: {
      name: input.productName,
      description: input.productDescription,
      audience: input.targetAudience,
      benefits: input.keyBenefits.split(',').map(b => b.trim()),
      pain_points: input.painPoints.split(',').map(p => p.trim()),
      offer: input.offerType,
      cta: input.callToAction,
    },
    assets: {
      images: input.productImages ? input.productImages.split(',').map(i => i.trim()) : [],
      clips: input.optionalClips ? input.optionalClips.split(',').map(c => c.trim()) : [],
    },
    video_concepts: concepts.map(c => ({
      concept_id: c.id,
      title: c.title,
      angle: c.angle,
      hook: c.hook,
      scenes: c.scenes.map(s => ({
        scene: s.sceneNumber,
        time: s.timeRange,
        script: s.script,
        visual_description: s.visual,
        ai_video_prompt: s.aiPrompt,
        editing_instructions: s.editingNotes,
      }))
    })),
    output_config: {
      format: 'mp4',
      resolution: '1080x1920',
      fps: 30,
      duration_target: '15-20s',
      aspect_ratio: '9:16',
      platforms: ['tiktok', 'instagram_reels', 'youtube_shorts'],
    },
    file_structure: {
      root: `/${input.productName.replace(/\s/g, '_')}/`,
      videos: concepts.map(c => ({
        folder: `Video_${c.id}/`,
        files: c.scenes.map(s => `scene${s.sceneNumber}.mp4`),
        script: `script_v${c.id}.txt`,
        caption: `caption_v${c.id}.txt`,
      }))
    }
  };
}

function generateWorkflowSteps(input: ProductInput): WorkflowStep[] {
  return [
    {
      step: 1,
      title: 'Input Source',
      description: 'Configure product data input via Google Sheets or manual trigger',
      details: [
        `Create a Google Sheet with columns: product_name, description, audience, benefits, pain_points, offer, cta, images`,
        `Row 1 headers, Row 2+ = product entries`,
        `Alternative: Use n8n Manual Trigger node with form inputs`,
        `Each row represents one product → generates 3 video concepts`,
      ],
      tools: ['Google Sheets', 'n8n Manual Trigger'],
      icon: '📥',
    },
    {
      step: 2,
      title: 'Trigger Configuration',
      description: 'Set up automation trigger to initiate the workflow',
      details: [
        `Option A: Google Sheets Trigger → "On New Row" event`,
        `Option B: Webhook Trigger → POST endpoint for API integration`,
        `Option C: Schedule Trigger → Process batch at set intervals`,
        `Option D: Manual Trigger → One-click execution for testing`,
      ],
      tools: ['n8n Trigger Nodes', 'Webhook', 'Cron'],
      icon: '⚡',
    },
    {
      step: 3,
      title: 'Data Formatting Node',
      description: 'Map input fields to structured variables for the AI prompt',
      details: [
        `Map: product_name → {{$json.product_name}}`,
        `Map: description → {{$json.description}}`,
        `Map: audience → {{$json.audience}}`,
        `Map: benefits → {{$json.benefits}} (comma-separated → array)`,
        `Map: pain_points → {{$json.pain_points}} (comma-separated → array)`,
        `Map: offer → {{$json.offer}}`,
        `Map: cta → {{$json.cta}}`,
        `Map: images → {{$json.images}} (URL array)`,
        `Validate all required fields are present`,
      ],
      tools: ['n8n Set Node', 'n8n Function Node'],
      icon: '🔧',
    },
    {
      step: 4,
      title: 'AI Processing Node',
      description: 'Send master prompt to LLM with injected product variables',
      details: [
        `Use HTTP Request node or OpenAI/LM Arena node`,
        `Inject all mapped variables into the MASTER PROMPT template`,
        `System prompt: Full ViralForge AI engine prompt`,
        `User prompt: Product-specific data`,
        `Expected output: Complete structured response with scripts, scenes, prompts`,
        `Parse response as JSON for downstream nodes`,
        `Set temperature: 0.8 for creative variation`,
        `Max tokens: 4000+ for complete output`,
      ],
      tools: ['OpenAI API', 'LM Arena', 'Anthropic API', 'n8n AI Node'],
      icon: '🧠',
    },
    {
      step: 5,
      title: 'JSON Parsing Node',
      description: 'Extract structured data from AI response for video generation',
      details: [
        `Parse AI response JSON to extract:`,
        `→ video_concepts[] (3 concepts with scenes)`,
        `→ scripts[] (scene-by-scene scripts)`,
        `→ ai_video_prompts[] (per-scene generation prompts)`,
        `→ captions[] (platform-specific)`,
        `→ hooks[] (10 variations)`,
        `Validate JSON structure`,
        `Handle parsing errors with fallback`,
      ],
      tools: ['n8n JSON Parse', 'n8n Function Node'],
      icon: '📋',
    },
    {
      step: 6,
      title: 'AI Video Generation Loop',
      description: 'Generate video clips for each scene using AI video tools',
      details: [
        `Loop through each video concept (3 total)`,
        `For each concept, loop through scenes (3 scenes each)`,
        `Send ai_video_prompt to video generation API`,
        `Supported APIs: Runway ML Gen-3, Pika Labs, Kling AI`,
        `Generate 3-5 second clips per scene`,
        `Resolution: 1080x1920 (vertical/9:16)`,
        `Store generated clip URLs/files`,
        `Total clips generated: 9 (3 concepts × 3 scenes)`,
        `Add retry logic for failed generations`,
      ],
      tools: ['Runway ML API', 'Pika Labs API', 'Kling AI', 'n8n Loop Node'],
      icon: '🎬',
    },
    {
      step: 7,
      title: 'File Storage & Organization',
      description: 'Organize all generated assets in structured folder hierarchy',
      details: [
        `Create folder: /${input.productName.replace(/\s/g, '_')}/`,
        `Sub-folders: /Video_1/, /Video_2/, /Video_3/`,
        `Store: scene1.mp4, scene2.mp4, scene3.mp4 per video`,
        `Store: script.txt (full scene-by-scene script)`,
        `Store: caption.txt (all platform captions)`,
        `Store: prompts.json (all AI prompts used)`,
        `Store: metadata.json (generation config & timestamps)`,
        `Supported storage: Google Drive, S3, Dropbox`,
      ],
      tools: ['Google Drive API', 'AWS S3', 'n8n File Nodes'],
      icon: '📁',
    },
    {
      step: 8,
      title: 'Video Editing & Assembly',
      description: 'Combine clips with captions, music, and effects',
      details: [
        `Import scene clips into editing pipeline`,
        `Apply per-scene timing from editing plan`,
        `Add auto-captions (word-by-word highlight style)`,
        `Apply zoom/pan animations per editing notes`,
        `Add background music (trending sounds for TikTok)`,
        `Add transitions between scenes`,
        `Overlay CTA graphics on final scene`,
        `Export: 1080x1920, 30fps, H.264, <20 seconds`,
        `Tools: CapCut API, Creatomate, Shotstack`,
      ],
      tools: ['CapCut', 'Creatomate API', 'Shotstack API', 'FFmpeg'],
      icon: '✂️',
    },
    {
      step: 9,
      title: 'Output & Delivery',
      description: 'Prepare final deliverables ready for posting',
      details: [
        `Final deliverable per concept:`,
        `→ 1x fully edited short-form video (.mp4)`,
        `→ 1x caption + CTA (per platform)`,
        `→ 1x thumbnail suggestion`,
        `→ 1x posting schedule recommendation`,
        `Deliver via: Google Drive link, email, Slack notification`,
        `Optional: Auto-post via social media APIs`,
        `Include A/B test variants if multiple hooks generated`,
      ],
      tools: ['Email (SMTP)', 'Slack API', 'Social Media APIs', 'n8n Notification'],
      icon: '🚀',
    },
    {
      step: 10,
      title: 'Scaling & Batch Processing',
      description: 'Scale to process multiple products and batch generate content',
      details: [
        `Multi-product processing: Each Google Sheet row = 1 product`,
        `Batch mode: Process 10+ products per run`,
        `Daily content calendar: Schedule 3 videos/day across platforms`,
        `A/B testing: Generate 2 hook variants per concept`,
        `Performance tracking: Log views, engagement, conversions`,
        `Auto-refresh: Re-generate underperforming content weekly`,
        `Cost optimization: Cache common visual elements`,
        `Team workflow: Approval queue before auto-posting`,
        `Analytics webhook: Feed performance data back for optimization`,
      ],
      tools: ['n8n Scheduler', 'Google Analytics', 'Meta Business API', 'TikTok Business API'],
      icon: '📈',
    },
  ];
}

export function generateContent(input: ProductInput): GeneratedContent {
  const videoConcepts = generateVideoConcepts(input);
  const hooks = generateHooks(input);
  const captions = generateCaptions(input);
  const funnelStrategy = generateFunnelStrategy(input);
  const automationJSON = generateAutomationJSON(input, videoConcepts);
  const workflowSteps = generateWorkflowSteps(input);

  return {
    input,
    videoConcepts,
    hooks,
    captions,
    funnelStrategy,
    automationJSON,
    workflowSteps,
  };
}
