import { TimeZone, ClockTime } from '@types/clock';
import { format, utcToZonedTime } from 'date-fns-tz';

const TIMEZONES: TimeZone[] = [
  // Americas
  { id: 'America/New_York', name: 'Eastern Time', city: 'New York', offset: 'UTC-5' },
  { id: 'America/Chicago', name: 'Central Time', city: 'Chicago', offset: 'UTC-6' },
  { id: 'America/Denver', name: 'Mountain Time', city: 'Denver', offset: 'UTC-7' },
  { id: 'America/Los_Angeles', name: 'Pacific Time', city: 'Los Angeles', offset: 'UTC-8' },
  { id: 'America/Anchorage', name: 'Alaska Time', city: 'Anchorage', offset: 'UTC-9' },
  { id: 'Pacific/Honolulu', name: 'Hawaii Time', city: 'Honolulu', offset: 'UTC-10' },
  { id: 'America/Toronto', name: 'Eastern Time', city: 'Toronto', offset: 'UTC-5' },
  { id: 'America/Mexico_City', name: 'Central Time', city: 'Mexico City', offset: 'UTC-6' },
  { id: 'America/Sao_Paulo', name: 'Brasília Time', city: 'São Paulo', offset: 'UTC-3' },
  { id: 'America/Buenos_Aires', name: 'Argentina Time', city: 'Buenos Aires', offset: 'UTC-3' },

  // Europe
  { id: 'Europe/London', name: 'GMT/BST', city: 'London', offset: 'UTC+0' },
  { id: 'Europe/Paris', name: 'CET/CEST', city: 'Paris', offset: 'UTC+1' },
  { id: 'Europe/Berlin', name: 'CET/CEST', city: 'Berlin', offset: 'UTC+1' },
  { id: 'Europe/Moscow', name: 'MSK', city: 'Moscow', offset: 'UTC+3' },
  { id: 'Europe/Istanbul', name: 'EET/EEST', city: 'Istanbul', offset: 'UTC+3' },
  { id: 'Europe/Dubai', name: 'GST', city: 'Dubai', offset: 'UTC+4' },

  // Asia
  { id: 'Asia/Kolkata', name: 'IST', city: 'India', offset: 'UTC+5:30' },
  { id: 'Asia/Bangkok', name: 'ICT', city: 'Bangkok', offset: 'UTC+7' },
  { id: 'Asia/Hong_Kong', name: 'HKT', city: 'Hong Kong', offset: 'UTC+8' },
  { id: 'Asia/Shanghai', name: 'CST', city: 'Shanghai', offset: 'UTC+8' },
  { id: 'Asia/Tokyo', name: 'JST', city: 'Tokyo', offset: 'UTC+9' },
  { id: 'Asia/Seoul', name: 'KST', city: 'Seoul', offset: 'UTC+9' },
  { id: 'Asia/Singapore', name: 'SGT', city: 'Singapore', offset: 'UTC+8' },
  { id: 'Asia/Kolkata', name: 'IST', city: 'New Delhi', offset: 'UTC+5:30' },

  // Australia & Pacific
  { id: 'Australia/Sydney', name: 'AEDT', city: 'Sydney', offset: 'UTC+10' },
  { id: 'Australia/Melbourne', name: 'AEDT', city: 'Melbourne', offset: 'UTC+10' },
  { id: 'Australia/Brisbane', name: 'AEST', city: 'Brisbane', offset: 'UTC+10' },
  { id: 'Australia/Perth', name: 'AWST', city: 'Perth', offset: 'UTC+8' },
  { id: 'Pacific/Auckland', name: 'NZDT', city: 'Auckland', offset: 'UTC+12' },
  { id: 'Pacific/Fiji', name: 'FJT', city: 'Fiji', offset: 'UTC+12' },

  // Africa
  { id: 'Africa/Cairo', name: 'EET', city: 'Cairo', offset: 'UTC+2' },
  { id: 'Africa/Johannesburg', name: 'SAST', city: 'Johannesburg', offset: 'UTC+2' },
  { id: 'Africa/Lagos', name: 'WAT', city: 'Lagos', offset: 'UTC+1' },
];

export class TimezoneService {
  static getAllTimezones(): TimeZone[] {
    return TIMEZONES;
  }

  static getTimeInZone(timezoneId: string, is24Hour: boolean = false): ClockTime {
    try {
      const now = new Date();
      const zonedDate = utcToZonedTime(now, timezoneId);

      let hours = String(zonedDate.getHours()).padStart(2, '0');
      let period = '';

      if (!is24Hour) {
        const hourNum = parseInt(hours);
        period = hourNum >= 12 ? 'PM' : 'AM';
        const hour12 = hourNum % 12 || 12;
        hours = String(hour12).padStart(2, '0');
      }

      const minutes = String(zonedDate.getMinutes()).padStart(2, '0');
      const seconds = String(zonedDate.getSeconds()).padStart(2, '0');

      return {
        hours,
        minutes,
        seconds,
        period,
        timezone: timezoneId,
      };
    } catch (error) {
      console.error(`Error getting time for timezone ${timezoneId}:`, error);
      return {
        hours: '00',
        minutes: '00',
        seconds: '00',
        timezone: timezoneId,
      };
    }
  }

  static getTimezoneByCity(city: string): TimeZone | undefined {
    return TIMEZONES.find((tz) => tz.city.toLowerCase() === city.toLowerCase());
  }

  static getTimezoneById(id: string): TimeZone | undefined {
    return TIMEZONES.find((tz) => tz.id === id);
  }

  static searchTimezones(query: string): TimeZone[] {
    const lowerQuery = query.toLowerCase();
    return TIMEZONES.filter(
      (tz) =>
        tz.city.toLowerCase().includes(lowerQuery) ||
        tz.name.toLowerCase().includes(lowerQuery) ||
        tz.id.toLowerCase().includes(lowerQuery)
    );
  }
}
