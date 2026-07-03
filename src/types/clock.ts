export interface TimeZone {
  id: string;
  name: string;
  city: string;
  offset: string;
  isDST?: boolean;
}

export interface ClockTime {
  hours: string;
  minutes: string;
  seconds: string;
  period?: string; // AM/PM
  timezone: string;
}

export interface ClockSettings {
  format24Hour: boolean;
  showSeconds: boolean;
  updateInterval: number; // milliseconds
  selectedTimeZones: string[];
  theme: 'light' | 'dark' | 'auto';
}
