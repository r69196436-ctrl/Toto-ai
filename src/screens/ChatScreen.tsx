import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { ChatInput } from '@components/ChatInput';
import { MessageBubble } from '@components/MessageBubble';
import { useAppStore } from '@store/appStore';
import aiService from '@services/aiService';
import speechService from '@services/speechService';
import { Message, Conversation } from '@types/index';
import { colors } from '@utils/colors';
import { generateId } from '@utils/helpers';

interface ChatScreenProps {
  navigation: any;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];
  const flatListRef = useRef<FlatList>(null);

  const {
    conversations,
    currentConversationId,
    settings,
    loading,
    setLoading,
    setError,
    addMessage,
    updateConversationTitle,
  } = useAppStore();

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );

  useEffect(() => {
    if (settings.openaiApiKey) {
      aiService.initializeOpenAI(settings.openaiApiKey);
    }
    if (settings.anthropicApiKey) {
      const anthropicKey = settings.anthropicApiKey;
      aiService.initializeAnthropic(anthropicKey);
    }
  }, [settings.openaiApiKey, settings.anthropicApiKey]);

  const handleSendMessage = async (text: string) => {
    if (!currentConversation) return;

    setLoading(true);
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    addMessage(currentConversation.id, userMessage);
    flatListRef.current?.scrollToEnd({ animated: true });

    try {
      // Determine which service to use
      const isOpenAI = currentConversation.model.includes('gpt');
      const model = currentConversation.model;

      let response = '';

      if (isOpenAI) {
        if (!settings.openaiApiKey) {
          throw new Error('OpenAI API key not configured');
        }
        response = await aiService.sendMessageOpenAI(
          currentConversation,
          text
        );
      } else {
        if (!settings.anthropicApiKey) {
          throw new Error('Anthropic API key not configured');
        }
        response = await aiService.sendMessageAnthropic(
          currentConversation,
          text
        );
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        model,
      };

      addMessage(currentConversation.id, assistantMessage);
      flatListRef.current?.scrollToEnd({ animated: true });

      // Update conversation title if it's the first message
      if (currentConversation.messages.length === 1) {
        const title = text.substring(0, 30).trim();
        updateConversationTitle(currentConversation.id, title);
      }
    } catch (error: any) {
      setError(error.message);
      Alert.alert('Error', error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleMicPress = async () => {
    try {
      const hasPermission = await speechService.requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Microphone permission is required');
        return;
      }

      const recording = await speechService.startRecording();
      // Note: In a real app, you'd need to implement speech-to-text transcription
      // For now, just show a message
      Alert.alert('Recording', 'Recording started. Press stop when done.', [
        {
          text: 'Stop',
          onPress: async () => {
            const uri = await speechService.stopRecording(recording);
            // Transcribe the audio (would need speech-to-text service)
            Alert.alert('Info', 'Recording stopped. Audio transcription would happen here.');
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleImagePress = () => {
    // Navigate to image generation screen
    navigation.navigate('ImageGeneration');
  };

  if (!currentConversation) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: themeColors.background },
        ]}
      >
        <View style={styles.emptyContainer}>
          <Ionicons
            name="chatbubble-outline"
            size={64}
            color={themeColors.textSecondary}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <FlatList
        ref={flatListRef}
        data={currentConversation.messages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled
        contentContainerStyle={styles.messagesList}
      />
      <ChatInput
        onSendMessage={handleSendMessage}
        onMicPress={handleMicPress}
        onImagePress={handleImagePress}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    paddingBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
