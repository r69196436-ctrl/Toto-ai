import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClockSettings } from '@types/clock';
import { TimezoneService } from '@services/timezoneService';

interface ClockStore {
  settings: ClockSettings;
  selectedTimeZones: string[];
  currentTime: Date;

  // Settings
  updateSettings: (settings: Partial<ClockSettings>) => void;
  toggleFormat: () => void;
  toggleSeconds: () => void;
  toggleTheme: (theme: 'light' | 'dark' | 'auto') => void;

  // TimeZones
  addTimeZone: (timezoneId: string) => void;
  removeTimeZone: (timezoneId: string) => void;
  setSelectedTimeZones: (zones: string[]) => void;

  // Time
  updateCurrentTime: () => void;

  // Persistence
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const defaultSettings: ClockSettings = {
  format24Hour: false,
  showSeconds: true,
  updateInterval: 1000,
  selectedTimeZones: ['America/New_York', 'Europe/London', 'Asia/Tokyo'],
  theme: 'auto',
};

export const useClockStore = create<ClockStore>((set, get) => ({
  settings: defaultSettings,
  selectedTimeZones: defaultSettings.selectedTimeZones,
  currentTime: new Date(),

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
      selectedTimeZones: newSettings.selectedTimeZones || state.selectedTimeZones,
    }));
  },

  toggleFormat: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        format24Hour: !state.settings.format24Hour,
      },
    }));
  },

  toggleSeconds: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        showSeconds: !state.settings.showSeconds,
      },
    }));
  },

  toggleTheme: (theme) => {
    set((state) => ({
      settings: {
        ...state.settings,
        theme,
      },
    }));
  },

  addTimeZone: (timezoneId) => {
    set((state) => {
      const newZones = [...state.selectedTimeZones];
      if (!newZones.includes(timezoneId)) {
        newZones.push(timezoneId);
      }
      return { selectedTimeZones: newZones };
    });
  },

  removeTimeZone: (timezoneId) => {
    set((state) => ({
      selectedTimeZones: state.selectedTimeZones.filter((z) => z !== timezoneId),
    }));
  },

  setSelectedTimeZones: (zones) => {
    set({ selectedTimeZones: zones });
  },

  updateCurrentTime: () => {
    set({ currentTime: new Date() });
  },

  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem('clockStore');
      if (data) {
        const stored = JSON.parse(data);
        set(stored);
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
  },

  saveToStorage: async () => {
    try {
      const state = get();
      await AsyncStorage.setItem(
        'clockStore',
        JSON.stringify({
          settings: state.settings,
          selectedTimeZones: state.selectedTimeZones,
        })
      );
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },
}));
