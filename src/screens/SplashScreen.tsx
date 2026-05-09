import React from 'react';
import { motion } from 'motion/react';
import { Sprout } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-[#0A3D35] to-[#051F1A] flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex flex-col items-center"
      >
        {/* Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20" />

        {/* Shield Logo */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 bg-gradient-to-br from-primary-container to-green-600 flex items-center justify-center mb-8 shadow-[0_8px_32px_rgba(15,123,108,0.5)]"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          <Sprout size={40} className="text-white fill-white" />
        </motion.div>

        <h1 className="text-white text-3xl font-black tracking-tight mb-2">EcoGuard UG</h1>
        <p className="text-white/60 text-sm font-medium text-center mb-8 max-w-[240px]">
          Monitoring Uganda's Environment, Together
        </p>

        {/* Loading Progress */}
        <div className="w-52 h-1 bg-white/10 rounded-full overflow-hidden blur-[0.5px]">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "70%" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary-container to-uganda-gold rounded-full"
          />
        </div>
        <p className="text-white/40 text-[10px] font-bold mt-3 uppercase tracking-widest">
          Loading environmental data...
        </p>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-12 flex flex-col items-center">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
          © 2026 ECOGUARD UG
        </p>
        <div className="mt-2 flex items-center gap-2 opacity-30">
          <span className="w-1 h-1 rounded-full bg-white" />
          <p className="text-white text-[9px] font-bold uppercase tracking-wider">NEMA-Aligned Platform</p>
          <span className="w-1 h-1 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};
