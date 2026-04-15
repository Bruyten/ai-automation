export interface ProductInput {
  productName: string;
  productDescription: string;
  targetAudience: string;
  keyBenefits: string;
  painPoints: string;
  offerType: string;
  callToAction: string;
  productImages: string;
  optionalClips: string;
}

export interface Scene {
  sceneNumber: number;
  label: string;
  timeRange: string;
  script: string;
  visual: string;
  aiPrompt: string;
  editingNotes: string;
}

export interface VideoConcept {
  id: number;
  title: string;
  angle: string;
  hook: string;
  scenes: Scene[];
}

export interface GeneratedContent {
  input: ProductInput;
  videoConcepts: VideoConcept[];
  hooks: string[];
  captions: { platform: string; caption: string }[];
  funnelStrategy: string[];
  automationJSON: object;
  workflowSteps: WorkflowStep[];
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  details: string[];
  tools: string[];
  icon: string;
}
