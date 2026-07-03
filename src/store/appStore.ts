import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Conversation, Message, AppSettings } from '@types/index';

interface AppStore {
  conversations: Conversation[];
  currentConversationId: string | null;
  settings: AppSettings;
  loading: boolean;
  error: string | null;

  // Conversation actions
  createConversation: (model: Conversation['model']) => void;
  deleteConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setCurrentConversation: (id: string) => void;
  updateConversationTitle: (id: string, title: string) => void;

  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  setOpenaiApiKey: (key: string) => void;
  setAnthropicApiKey: (key: string) => void;

  // State actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Persistence
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const defaultSettings: AppSettings = {
  theme: 'auto',
  selectedModel: 'openai',
  openaiApiKey: '',
  anthropicApiKey: '',
  temperature: 0.7,
  maxTokens: 2000,
  soundEnabled: true,
  notificationsEnabled: true,
};

export const useAppStore = create<AppStore>((set, get) => ({
  conversations: [],
  currentConversationId: null,
  settings: defaultSettings,
  loading: false,
  error: null,

  createConversation: (model) => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      model,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      currentConversationId: newConversation.id,
    }));
  },

  deleteConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      currentConversationId:
        state.currentConversationId === id ? null : state.currentConversationId,
    }));
  },

  addMessage: (conversationId, message) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, message],
              updatedAt: Date.now(),
            }
          : c
      ),
    }));
  },

  setCurrentConversation: (id) => {
    set({ currentConversationId: id });
  },

  updateConversationTitle: (id, title) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, title, updatedAt: Date.now() } : c
      ),
    }));
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },

  setOpenaiApiKey: (key) => {
    set((state) => ({
      settings: { ...state.settings, openaiApiKey: key },
    }));
  },

  setAnthropicApiKey: (key) => {
    set((state) => ({
      settings: { ...state.settings, anthropicApiKey: key },
    }));
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem('appStore');
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
      await AsyncStorage.setItem('appStore', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },
}));
