export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  model?: string;
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3-opus' | 'claude-3-sonnet';
  createdAt: number;
  updatedAt: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  selectedModel: 'openai' | 'anthropic';
  openaiApiKey: string;
  anthropicApiKey: string;
  temperature: number;
  maxTokens: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number;
}
