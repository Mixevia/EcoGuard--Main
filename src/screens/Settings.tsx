import React from 'react';
import { motion } from 'motion/react';
import { useTheme, accents } from '../context/ThemeContext';
import { Check, Moon, Sun, Palette } from 'lucide-react';

export const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode, accent, setAccent } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-8"
    >
      <div className="space-y-1">
        <h2 className="font-h1 text-2xl text-on-surface">Settings</h2>
        <p className="text-sm text-outline font-medium">Personalize your EcoGuard experience</p>
      </div>

      {/* Appearance Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Palette size={18} className="text-primary" />
          <h3 className="text-xs font-black uppercase tracking-widest text-outline">Appearance</h3>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-4 space-y-6 border border-outline-variant">
          {/* Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface-container rounded-xl">
                {isDarkMode ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-primary" />}
              </div>
              <div>
                <div className="text-sm font-black text-on-surface">Dark Mode</div>
                <div className="text-[11px] text-outline font-medium">Switch to a darker interface</div>
              </div>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-primary' : 'bg-outline-variant'}`}
            >
              <motion.div 
                animate={{ x: isDarkMode ? 24 : 4 }}
                className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          <div className="h-[1px] bg-outline-variant/30" />

          {/* Accent Colors */}
          <div className="space-y-4">
            <div>
              <div className="text-sm font-black text-on-surface">Accent Color</div>
              <div className="text-[11px] text-outline font-medium">Choose a color for buttons and highlights</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {accents.map((a) => (
                <button
                  key={a.name}
                  onClick={() => setAccent(a)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    accent.name === a.name 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-outline-variant bg-surface'
                  }`}
                >
                  <div 
                    className="w-6 h-6 rounded-full shadow-inner border border-black/10" 
                    style={{ backgroundColor: a.primary }} 
                  />
                  <span className={`text-xs font-black ${accent.name === a.name ? 'text-primary' : 'text-on-surface'}`}>
                    {a.name}
                  </span>
                  {accent.name === a.name && <Check size={14} className="ml-auto text-primary" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-outline px-1">About</h3>
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant divide-y divide-outline-variant/30">
          <div className="py-3 flex justify-between items-center first:pt-0">
            <span className="text-xs font-black text-on-surface">Version</span>
            <span className="text-xs font-bold text-outline">2.4.0-stable</span>
          </div>
          <div className="py-3 flex justify-between items-center last:pb-0">
            <span className="text-xs font-black text-on-surface">Region</span>
            <span className="text-xs font-bold text-outline">Central Uganda</span>
          </div>
        </div>
      </section>
      
      <footer className="py-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-outline-variant">
          EcoGuard UG • 2026
        </p>
      </footer>
    </motion.div>
  );
};
