import React from 'react';
import { Home, Map as MapIcon, GraduationCap, Users, Megaphone } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  activeScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setScreen }) => {
  const navItems = [
    { id: 'HOME' as ScreenType, label: 'Home', Icon: Home },
    { id: 'MAP' as ScreenType, label: 'Map', Icon: MapIcon },
    { id: 'LEARN' as ScreenType, label: 'Learn', Icon: GraduationCap },
    { id: 'COMMUNITY' as ScreenType, label: 'Community', Icon: Users },
    { id: 'REPORT' as ScreenType, label: 'Report', Icon: Megaphone, badge: 3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest border-t border-outline-variant shadow-lg h-[98px] pb-[34px] flex justify-around items-center px-2">
      {navItems.map(({ id, label, Icon, badge }) => {
        const isActive = activeScreen === id;
        return (
          <button
            key={id}
            onClick={() => setScreen(id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 w-16 relative ${
              isActive 
                ? 'text-primary bg-[#E6F7F5] rounded-full px-4 py-1 h-12' 
                : 'text-outline hover:bg-surface-container-low rounded-xl h-16'
            }`}
          >
            <div className="relative">
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} />
              {badge && (
                <span className="absolute -top-1 -right-2 bg-error text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse border border-white">
                  {badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
