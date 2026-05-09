export type ScreenType = 'HOME' | 'MAP' | 'LEARN' | 'COMMUNITY' | 'REPORT' | 'SPLASH' | 'SETTINGS';

export interface Alert {
  id: string;
  type: 'CRITICAL' | 'MODERATE' | 'RESOLVED';
  title: string;
  location: string;
  time: string;
  description: string;
}

export interface Incident {
  id: string;
  type: 'FIRE' | 'FLOOD' | 'DEFORESTATION';
  location: [number, number]; // [lat, lng]
  title: string;
  description: string;
  time: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface CommunityReport {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: string;
  location: string;
  votes: number;
  time: string;
  description?: string;
  image?: string;
}

export interface ScreenTypeProps {
  onNavigate: (screen: ScreenType) => void;
}
