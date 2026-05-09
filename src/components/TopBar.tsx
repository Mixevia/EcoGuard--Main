import React from 'react';
import { Menu, User, Moon, Sun, Leaf } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ScreenType } from '../types';

interface TopBarProps {
  onSettingsClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSettingsClick }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm h-[60px] flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
          <Menu size={24} className="text-primary-container" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleDarkMode}
          className="p-2 hover:bg-surface-container-low rounded-full transition-colors active:scale-95"
        >
          {isDarkMode ? <Sun size={20} className="text-primary" /> : <Moon size={20} className="text-outline" />}
        </button>
        <button 
          onClick={onSettingsClick}
          className="w-9 h-9 rounded-full bg-surface-container border border-outline-variant overflow-hidden flex items-center justify-center hover:opacity-80 active:scale-95 transition-all text-outline"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};
