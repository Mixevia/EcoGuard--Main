/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenType } from './types';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './screens/SplashScreen';
import { Dashboard } from './screens/Dashboard';
import { MapScreen } from './screens/Map';
import { ReportIssue } from './screens/Report';
import { Learn } from './screens/Learn';
import { Community } from './screens/Community';
import { Settings } from './screens/Settings';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [screen, setScreen] = useState<ScreenType>('SPLASH');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('HOME');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'HOME': return <Dashboard onNavigate={setScreen} />;
      case 'MAP': return <MapScreen />;
      case 'REPORT': return <ReportIssue />;
      case 'LEARN': return <Learn />;
      case 'COMMUNITY': return <Community />;
      case 'SETTINGS': return <Settings />;
      default: return <Dashboard onNavigate={setScreen} />;
    }
  };

  return (
    <div className="bg-surface/50 min-h-screen font-sans selection:bg-primary/20 selection:text-primary relative max-w-[480px] mx-auto shadow-2xl overflow-x-hidden border-x border-outline-variant/30">
      <AnimatePresence mode="wait">
        {screen === 'SPLASH' ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div 
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col min-h-screen"
          >
            <TopBar onSettingsClick={() => setScreen('SETTINGS')} />
            
            <main className="flex-1 mt-[60px] mb-[120px] px-4 pt-5 pb-8 overflow-y-auto hide-scrollbar">
              {renderScreen()}
            </main>

            <BottomNav activeScreen={screen} setScreen={setScreen} />
            
            {/* Home Indicator */}
            <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-outline-variant/30 rounded-full z-[60] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
