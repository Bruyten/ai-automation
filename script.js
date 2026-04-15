// AI Automation Script Engine
document.addEventListener('DOMContentLoaded', () => {
    // Component References
    const form = document.getElementById('automation-form');
    const loadTemplateBtn = document.getElementById('load-template');
    const introPlaceholder = document.getElementById('intro-placeholder');
    const loadingSpinner = document.getElementById('loading-spinner');
    const workspaceContainer = document.getElementById('workspace-container');
    const workspaceTabs = document.getElementById('workspace-tabs');
    const workspaceCanvas = document.getElementById('workspace-canvas');
    const activeTabIndicator = document.getElementById('active-tab-indicator');
    const copyBtn = document.getElementById('copy-btn');
    const exportJsonBtn = document.getElementById('export-json-btn');

    let activeTab = 'concepts';
    let currentData = {};

    // Sample Input Data
    const sampleData = {
        product_name: "Workflow n8n Automator",
        description: "Pre-assembled workspace operations optimizing small company backend loops autonomously without supervision.",
        audience: "Solo Consultants, Busy Owners",
        benefits: "Save 15 hours weekly, Eliminate communication mix-ups",
        pain_points: "Manual repetitive routines, Missing follow-ups",
        offer_type: "Paid Digital Product",
        cta: "Download ready blueprint files via link"
    };

    // Tab Information
    const tabs = [
        { id: 'concepts', label: '🔥 Concepts', icon: 'fa-solid fa-lightbulb' },
        { id: 'scripts', label: '🎬 Scripts', icon: 'fa-solid fa-clapperboard' },
        { id: 'visuals', label: '🎥 Visual Plan', icon: 'fa-solid fa-film' },
        { id: 'prompts', label: '🎨 AI Prompts', icon: 'fa-solid fa-wand-magic' },
        { id: 'editing', label: '✂️ Editing', icon: 'fa-solid fa-scissors' },
        { id: 'hooks', label: '🧠 Hooks', icon: 'fa-solid fa-magnet' },
        { id: 'caption', label: '📱 Captions', icon: 'fa-solid fa-align-left' },
        { id: 'funnel', label: '🔗 Funnels', icon: 'fa-solid fa-circle-nodes' },
        { id: 'json', label: '🤖 JSON Node', icon: 'fa-solid fa-code' },
        { id: 'workflow', label: '⚙️ Execution', icon: 'fa-solid fa-arrows-spin' }
    ];

    // Initialize Navigation
    function initTabs() {
        workspaceTabs.innerHTML = tabs.map(tab => `
            <button data-tab="${tab.id}" class="tab-btn px-3 py-2 text-xs rounded-lg font-medium transition cursor-pointer flex items-center space-x-1 border border-transparent hover:bg-slate-800 text-slate-400">
                <i class="${tab.icon} text-slate-500"></i>
                <span>${tab.label}</span>
            </button>
        `).join('');

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.getAttribute('data-tab');
                switchTab(target);
            });
        });
    }

    function switchTab(tabId) {
        activeTab = tabId;
        const currentTabConfig = tabs.find(t => t.id === tabId);
        
        activeTabIndicator.innerHTML = `
            <i class="${currentTabConfig.icon} text-violet-400"></i>
            <span>${currentTabConfig.label.replace(/^[^\s]+\s/, '')} Overview</span>
        `;

        document.querySelectorAll('.tab-btn').forEach(btn => {
            if(btn.getAttribute('data-tab') === tabId) {
                btn.className = "tab-btn px-3 py-2 text-xs rounded-lg font-medium transition cursor-pointer flex items-center space-x-1 border border-slate-700/60 bg-slate-800/80 text-violet-400";
            } else {
                btn.className = "tab-btn px-3 py-2 text-xs rounded-lg font-medium transition cursor-pointer flex items-center space-x-1 border border-transparent hover:bg-slate-800 text-slate-400";
            }
        });

        renderContent();
    }

    // Trigger Generation Process
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        introPlaceholder.classList.add('hidden');
        workspaceContainer.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');

        // Compile state values
        currentData = {
            product_name: document.getElementById('product_name').value,
            description: document.getElementById('description').value,
            audience: document.getElementById('audience').value,
            benefits: document.getElementById('benefits').value,
            pain_points: document.getElementById('pain_points').value,
            offer_type: document.getElementById('offer_type').value,
            cta: document.getElementById('cta').value
        };

        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
            workspaceContainer.classList.remove('hidden');
            initTabs();
            switchTab('concepts');
        }, 1200);
    });

    // Populate Fields
    loadTemplateBtn.addEventListener('click', () => {
        document.getElementById('product_name').value = sampleData.product_name;
        document.getElementById('description').value = sampleData.description;
        document.getElementById('audience').value = sampleData.audience;
        document.getElementById('benefits').value = sampleData.benefits;
        document.getElementById('pain_points').value = sampleData.pain_points;
        document.getElementById('offer_type').value = sampleData.offer_type;
        document.getElementById('cta').value = sampleData.cta;
    });

    // Rendering Logic
    function renderContent() {
        const prod = currentData.product_name || 'N/A';
        const aud = currentData.audience || 'N/A';
        const ben = currentData.benefits || 'N/A';
        const ctaText = currentData.cta || 'Link in bio';

        let html = '';

        switch (activeTab) {
            case 'concepts':
                html = `
                    <div class="space-y-6">
                        <h4 class="text-slate-200 font-semibold text-sm border-l-2 border-violet-500 pl-2">Top Performing Hook Layouts</h4>
                        <div class="grid md:grid-cols-3 gap-4">
                            <div class="bg-slate-950 p-4 border border-slate-800 rounded-xl hover:border-slate-700/50 transition">
                                <span class="text-xs font-semibold uppercase text-violet-400">Concept 1: Pattern Interrupt</span>
                                <h5 class="text-slate-100 font-bold mt-1 text-sm">Stop doing things manually.</h5>
                                <p class="text-xs text-slate-400 mt-2">Visually striking text overlay calling out standard workflow limitations explicitly.</p>
                            </div>
                            <div class="bg-slate-950 p-4 border border-slate-800 rounded-xl hover:border-slate-700/50 transition">
                                <span class="text-xs font-semibold uppercase text-indigo-400">Concept 2: Educational Frame</span>
                                <h5 class="text-slate-100 font-bold mt-1 text-sm">3 secrets tools don't tell you.</h5>
                                <p class="text-xs text-slate-400 mt-2">Guiding viewers smoothly into evaluating organizational habits critically.</p>
                            </div>
                            <div class="bg-slate-950 p-4 border border-slate-800 rounded-xl hover:border-slate-700/50 transition">
                                <span class="text-xs font-semibold uppercase text-sky-400">Concept 3: Aspirational Transition</span>
                                <h5 class="text-slate-100 font-bold mt-1 text-sm">This feels illegal to know.</h5>
                                <p class="text-xs text-slate-400 mt-2">Connecting seamless operational excellence through automated integrations directly.</p>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 'scripts':
                html = `
                    <div class="space-y-6 text-sm">
                        <div class="bg-slate-950/40 p-4 border border-slate-800/80 rounded-xl space-y-3">
                            <h5 class="font-bold text-violet-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                                <i class="fa-solid fa-scroll text-xs"></i> Video Script #1: Relatable Angle
                            </h5>
                            <p class="text-slate-300"><strong>[0-3s Hook]:</strong> Attention ${aud}! Ever feel bogged down by operations?</p>
                            <p class="text-slate-300"><strong>[3-15s Body]:</strong> Most struggle with administrative overhead daily. Stop managing logs manually. Introducing ${prod}, specifically created to resolve friction smoothly.</p>
                            <p class="text-slate-300"><strong>[15-20s Outro]:</strong> Simplify business pipelines right now. ${ctaText}.</p>
                        </div>
                    </div>
                `;
                break;

            case 'visuals':
                html = `
                    <div class="space-y-4">
                        <div class="flex items-center space-x-2 text-xs bg-slate-950 px-3 py-2 border border-slate-800 rounded-lg">
                            <i class="fa-solid fa-video text-violet-500"></i>
                            <span class="text-slate-400">Scene Sequence Scheduling</span>
                        </div>
                        <ul class="divide-y divide-slate-800 border border-slate-800 bg-slate-950 rounded-xl overflow-hidden text-sm">
                            <li class="p-4 flex gap-4">
                                <span class="font-bold text-indigo-400">Scene 1</span>
                                <div>
                                    <h6 class="text-slate-100 font-semibold text-xs">Fast cut close-ups of digital clocks.</h6>
                                    <p class="text-slate-400 text-xs mt-1">Reflects time passing urgently. Text Overlay: "Wasting hours?"</p>
                                </div>
                            </li>
                            <li class="p-4 flex gap-4">
                                <span class="font-bold text-indigo-400">Scene 2</span>
                                <div>
                                    <h6 class="text-slate-100 font-semibold text-xs">A neat flowchart forming dynamically.</h6>
                                    <p class="text-slate-400 text-xs mt-1">Illustrating systemized precision.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                `;
                break;

            case 'prompts':
                html = `
                    <div class="space-y-4">
                        <div class="flex justify-between items-center mb-2">
                            <h5 class="text-slate-300 text-xs font-semibold tracking-wider uppercase">Direct AI Prompt Copy</h5>
                        </div>
                        <div class="workspace-canvas-pre p-4 text-slate-300 text-xs rounded-xl border border-slate-800/80 leading-relaxed font-mono select-all">
                            /imagine prompt: cinematic 4k overhead angle, sleek workspaces arranging interfaces quickly, glowing blue accents, high-quality professional lighting --ar 9:16 --v 6.0
                        </div>
                    </div>
                `;
                break;

            case 'editing':
                html = `
                    <div class="space-y-4 text-sm">
                        <div class="border-l-4 border-emerald-500 bg-emerald-500/5 p-4 rounded-r-lg">
                            <h6 class="font-bold text-emerald-400 text-xs mb-1">CapCut / Premiere Workflow Instructions</h6>
                            <p class="text-slate-400 text-xs">Keep transition pacing dense. Audio selection: trending electronic synthwave tracks.</p>
                        </div>
                    </div>
                `;
                break;

            case 'hooks':
                html = `
                    <div class="grid md:grid-cols-2 gap-3 text-sm">
                        <div class="p-3 bg-slate-950 border border-slate-800/80 rounded-lg text-slate-300">
                            <strong>1. Pain Point:</strong> Still arranging logs manually in 2026?
                        </div>
                        <div class="p-3 bg-slate-950 border border-slate-800/80 rounded-lg text-slate-300">
                            <strong>2. Direct:</strong> Secret weapon for ${aud}.
                        </div>
                    </div>
                `;
                break;

            case 'caption':
                html = `
                    <div class="space-y-3 text-sm">
                        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <p class="text-slate-300 font-semibold mb-2">TikTok & Reels Ready Text:</p>
                            <div class="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-xs font-mono select-all">
                                Efficiency elevated. 🚀 Discover ${prod} designed for scalable output. Tap instructions to start! #productivity #growth
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 'funnel':
                html = `
                    <div class="space-y-4 text-sm">
                        <div class="flex flex-col md:flex-row gap-4">
                            <div class="bg-slate-950 p-4 border border-slate-800 rounded-lg flex-1">
                                <h6 class="text-violet-400 font-bold text-xs mb-1">Top Funnel (TOFU)</h6>
                                <p class="text-slate-400 text-xs">Attract views through quick visual representation of problems.</p>
                            </div>
                            <div class="bg-slate-950 p-4 border border-slate-800 rounded-lg flex-1">
                                <h6 class="text-indigo-400 font-bold text-xs mb-1">Bottom Funnel (BOFU)</h6>
                                <p class="text-slate-400 text-xs">Convert directly through landing page CTA redirects immediately.</p>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 'json':
                const jsonPayload = {
                    input: currentData,
                    video_specs: {
                        duration: "20 seconds",
                        platform: "TikTok",
                        framerate: 60
                    }
                };
                html = `
                    <div class="space-y-3">
                        <div class="workspace-canvas-pre p-4 text-emerald-400 text-xs rounded-xl border border-slate-800/80 leading-relaxed font-mono whitespace-pre select-all">${JSON.stringify(jsonPayload, null, 2)}</div>
                    </div>
                `;
                break;

            case 'workflow':
                html = `
                    <div class="space-y-4 text-sm text-slate-300">
                        <div class="relative pl-6 border-l border-slate-800 space-y-6">
                            <div class="relative">
                                <span class="absolute -left-[30px] flex items-center justify-center w-5 h-5 rounded-full bg-violet-600 text-[10px] font-bold text-white">1</span>
                                <h6 class="font-bold text-white text-xs">Input Node</h6>
                                <p class="text-slate-400 text-xs mt-0.5">Captures variables automatically.</p>
                            </div>
                            <div class="relative">
                                <span class="absolute -left-[30px] flex items-center justify-center w-5 h-5 rounded-full bg-violet-600 text-[10px] font-bold text-white">2</span>
                                <h6 class="font-bold text-white text-xs">Video Compiler Loop</h6>
                                <p class="text-slate-400 text-xs mt-0.5">Processes prompts to external rendering tools autonomously.</p>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        workspaceCanvas.innerHTML = html;
    }

    // Clipboard Support
    copyBtn.addEventListener('click', () => {
        const textToCopy = workspaceCanvas.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const defaultText = copyBtn.innerHTML;
            copyBtn.innerHTML = `<i class="fa-solid fa-check text-green-500"></i> <span class="text-green-500">Copied!</span>`;
            setTimeout(() => { copyBtn.innerHTML = defaultText; }, 1500);
        });
    });

    exportJsonBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "automation_blueprint.json");
        dlAnchorElem.click();
    });
});