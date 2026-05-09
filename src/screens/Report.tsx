import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Flame, Droplets, Trees, AlertTriangle, 
  MapPin, Camera, ChevronRight, CheckCircle2,
  Trash2, Navigation, CloudLightning,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const schema = z.object({
  type: z.string().min(1, 'Please select an incident type'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

const incidentTypes = [
  { id: 'FIRE', label: 'Fire', icon: Flame, color: 'text-orange-500 bg-orange-50' },
  { id: 'FLOOD', label: 'Flood', icon: Droplets, color: 'text-blue-500 bg-blue-50' },
  { id: 'DEFORESTATION', label: 'Logging', icon: Trees, color: 'text-green-600 bg-green-50' },
  { id: 'POLLUTION', label: 'Pollution', icon: AlertTriangle, color: 'text-purple-500 bg-purple-50' },
  { id: 'WILDLIFE', label: 'Wildlife', icon: AlertCircle, color: 'text-yellow-600 bg-yellow-50' },
  { id: 'WEATHER', label: 'Storm', icon: CloudLightning, color: 'text-slate-600 bg-slate-50' },
];

export const ReportIssue: React.FC = () => {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: '', location: '', description: '' }
  });

  const selectedType = watch('type');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setValue('location', `Wakiso: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
          setIsLocating(false);
        },
        () => {
          alert('Could not detect location. Please enter your District manually.');
          setIsLocating(false);
        }
      );
    } else {
      alert('Geolocation not supported.');
      setIsLocating(false);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('Sending to NEMA:', data);
    setStep(4);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Progress Header */}
      {step < 4 && (
        <div className="flex items-center gap-2 mb-8 px-1">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                step >= s ? "bg-accent-green" : "bg-outline-variant"
              )} 
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-2xl font-black text-on-surface tracking-tight">Environmental Hazard?</h2>
              <p className="text-sm text-outline font-medium">Select the most relevant category</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {incidentTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setValue('type', t.id); nextStep(); }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3 p-6 rounded-[24px] border-2 transition-all active:scale-95",
                    selectedType === t.id ? "border-accent-green bg-accent-green/5" : "border-outline-variant bg-surface"
                  )}
                >
                  <div className={cn("p-4 rounded-2xl shadow-sm", t.color)}>
                    <t.icon size={28} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-black text-on-surface">{t.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-2xl font-black text-on-surface tracking-tight">Location Details</h2>
              <p className="text-sm text-outline font-medium">Pinpoint where help is needed</p>
            </div>

            <div className="space-y-4">
              <button 
                type="button"
                onClick={detectLocation}
                disabled={isLocating}
                className="w-full h-14 bg-accent-green/10 text-accent-green border border-accent-green/20 rounded-2xl flex items-center justify-center gap-3 font-black text-sm active:scale-95 transition-all"
              >
                <Navigation size={20} className={isLocating ? "animate-spin" : ""} />
                {isLocating ? 'Scanning GPS...' : 'Auto-detect District'}
              </button>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  <MapPin size={20} />
                </div>
                <input 
                  {...register('location')}
                  placeholder="e.g. Mbarara, Jinja, or Masaka..."
                  className="w-full h-14 bg-surface-container rounded-2xl pl-12 pr-4 border border-outline-variant text-sm font-bold focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all outline-none"
                />
              </div>
              {errors.location && <p className="text-xs text-error font-bold px-1">{errors.location.message}</p>}
              <p className="text-[11px] text-outline font-medium px-1">Example: Wakiso Central or 0.3476, 32.5825</p>
            </div>

            <div className="flex gap-3 mt-auto pt-8">
              <button type="button" onClick={prevStep} className="flex-1 h-14 bg-surface-container text-on-surface font-black rounded-2xl active:scale-95 transition-all">Back</button>
              <button type="button" onClick={nextStep} className="flex-1 h-14 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all">Continue</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-2xl font-black text-on-surface tracking-tight">Evidence Upload</h2>
              <p className="text-sm text-outline font-medium">Add a description and visual proof</p>
            </div>

            <div className="space-y-6">
              <textarea 
                {...register('description')}
                placeholder="Describe current status (e.g. fire spreading north)..."
                className="w-full h-32 bg-surface-container rounded-2xl p-4 border border-outline-variant text-sm font-medium focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all outline-none resize-none"
              />
              {errors.description && <p className="text-xs text-error font-bold px-1">{errors.description.message}</p>}

              <div className="relative">
                {photo ? (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-accent-green/20">
                    <img src={photo} alt="Upload Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setPhoto(null)} 
                      className="absolute top-3 right-3 p-2 bg-error text-white rounded-full shadow-lg active:scale-95 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-48 rounded-[24px] border-2 border-dashed border-outline-variant bg-surface-container-low flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white hover:border-accent-green/50 transition-all text-outline">
                    <Camera size={32} />
                    <span className="text-xs font-black uppercase tracking-wider">Capture or Upload Incident</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-auto pt-8">
              <button type="button" onClick={prevStep} className="flex-1 h-14 bg-surface-container text-on-surface font-black rounded-2xl">Back</button>
              <button 
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="flex-1 h-14 bg-accent-green text-surface font-black rounded-2xl shadow-lg shadow-accent-green/20 flex items-center justify-center gap-2"
              >
                Submit to NEMA <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center flex-1 py-12 text-center"
          >
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl mb-8">
              <CheckCircle2 size={56} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-on-surface mb-3 tracking-tight">Report Received</h2>
            <p className="text-sm text-outline font-medium max-w-xs mb-10 leading-relaxed">
              Your report has been logged and sent to NEMA for verification. Thank you for protecting Uganda's nature.
            </p>
            <button 
              type="button"
              onClick={() => window.location.reload()}
              className="w-full max-w-xs h-14 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
