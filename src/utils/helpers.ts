import uuid from 'react-native-uuid';
import { formatDistanceToNow } from 'date-fns';

export const generateId = (): string => {
  return uuid.v4() as string;
};

export const formatTime = (timestamp: number): string => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const truncateText = (text: string, length: number): string => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const isValidApiKey = (key: string): boolean => {
  return key.length > 10;
};

export const extractError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An unknown error occurred';
};
