import { useState } from 'react';
import { ProductInput } from '../types';
import {
  Sparkles, Package, Users, Zap, AlertTriangle,
  Gift, MousePointerClick, Image, Film, ChevronRight
} from 'lucide-react';

interface Props {
  onGenerate: (input: ProductInput) => void;
  isGenerating: boolean;
}

const EXAMPLE_DATA: ProductInput = {
  productName: 'FlowState Pro',
  productDescription: 'An AI-powered productivity app that blocks distractions, auto-schedules your deep work sessions, and tracks your focus score in real-time. Works across all devices.',
  targetAudience: 'Remote workers, freelancers, and entrepreneurs',
  keyBenefits: 'Doubles your productive hours, AI auto-scheduling, Real-time focus tracking, Works on all devices, Eliminates decision fatigue',
  painPoints: 'Constant distractions killing productivity, Can\'t focus for more than 20 minutes, Overwhelmed by endless to-do lists, Wasting time on task switching',
  offerType: 'Free 14-day trial — no credit card required',
  callToAction: 'Start your free trial now',
  productImages: '',
  optionalClips: '',
};

const fields: {
  key: keyof ProductInput;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type: 'input' | 'textarea';
  required: boolean;
}[] = [
  {
    key: 'productName',
    label: 'Product Name',
    placeholder: 'e.g., FlowState Pro',
    icon: <Package size={16} />,
    type: 'input',
    required: true,
  },
  {
    key: 'productDescription',
    label: 'Product Description',
    placeholder: 'Describe what your product does and its key value proposition...',
    icon: <Sparkles size={16} />,
    type: 'textarea',
    required: true,
  },
  {
    key: 'targetAudience',
    label: 'Target Audience',
    placeholder: 'e.g., Remote workers, freelancers, and entrepreneurs',
    icon: <Users size={16} />,
    type: 'input',
    required: true,
  },
  {
    key: 'keyBenefits',
    label: 'Key Benefits (comma-separated)',
    placeholder: 'e.g., Saves 3 hours/day, AI automation, Real-time analytics',
    icon: <Zap size={16} />,
    type: 'textarea',
    required: true,
  },
  {
    key: 'painPoints',
    label: 'Pain Points (comma-separated)',
    placeholder: 'e.g., Wasting time on manual tasks, Information overload, Decision fatigue',
    icon: <AlertTriangle size={16} />,
    type: 'textarea',
    required: true,
  },
  {
    key: 'offerType',
    label: 'Offer Type',
    placeholder: 'e.g., Free trial, 50% off, Limited launch price',
    icon: <Gift size={16} />,
    type: 'input',
    required: false,
  },
  {
    key: 'callToAction',
    label: 'Call To Action',
    placeholder: 'e.g., Click the link in bio, Download now free',
    icon: <MousePointerClick size={16} />,
    type: 'input',
    required: true,
  },
  {
    key: 'productImages',
    label: 'Product Image URLs (comma-separated)',
    placeholder: 'https://example.com/image1.jpg, https://example.com/image2.jpg',
    icon: <Image size={16} />,
    type: 'input',
    required: false,
  },
  {
    key: 'optionalClips',
    label: 'Optional Clip URLs (comma-separated)',
    placeholder: 'https://example.com/clip1.mp4',
    icon: <Film size={16} />,
    type: 'input',
    required: false,
  },
];

export default function InputForm({ onGenerate, isGenerating }: Props) {
  const [form, setForm] = useState<ProductInput>({
    productName: '',
    productDescription: '',
    targetAudience: '',
    keyBenefits: '',
    painPoints: '',
    offerType: '',
    callToAction: '',
    productImages: '',
    optionalClips: '',
  });

  const handleChange = (key: keyof ProductInput, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  const loadExample = () => {
    setForm(EXAMPLE_DATA);
  };

  const requiredFilled = fields
    .filter(f => f.required)
    .every(f => form[f.key].trim().length > 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-brand-200 flex items-center gap-2">
          <span className="text-xl">🎯</span> Product Input
        </h2>
        <button
          type="button"
          onClick={loadExample}
          className="text-xs px-3 py-1.5 rounded-lg bg-dark-600 text-dark-100 hover:bg-dark-500 hover:text-brand-200 transition-all border border-dark-500 hover:border-brand-600"
        >
          Load Example
        </button>
      </div>

      {fields.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium text-dark-100">
            <span className="text-brand-400">{field.icon}</span>
            {field.label}
            {field.required && <span className="text-neon-pink text-xs">*</span>}
          </label>
          {field.type === 'input' ? (
            <input
              type="text"
              value={form[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-xl text-brand-100 placeholder-dark-300 text-sm transition-all hover:border-dark-400"
            />
          ) : (
            <textarea
              value={form[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-xl text-brand-100 placeholder-dark-300 text-sm transition-all hover:border-dark-400 resize-none"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={!requiredFilled || isGenerating}
        className="w-full mt-4 py-3.5 px-6 rounded-xl font-semibold text-sm
          bg-gradient-to-r from-brand-600 via-brand-500 to-neon-green
          text-white shadow-lg shadow-brand-900/50
          hover:shadow-brand-600/30 hover:scale-[1.02]
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          transition-all duration-300 flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating Content Engine...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Generate Full Content Package
            <ChevronRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
