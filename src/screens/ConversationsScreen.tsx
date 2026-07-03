import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ConversationItem } from '@components/ConversationItem';
import { useAppStore } from '@store/appStore';
import { colors } from '@utils/colors';
import { Conversation } from '@types/index';

interface ConversationsScreenProps {
  navigation: any;
}

export const ConversationsScreen: React.FC<ConversationsScreenProps> = ({
  navigation,
}) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  const {
    conversations,
    currentConversationId,
    setCurrentConversation,
    deleteConversation,
    createConversation,
  } = useAppStore();

  const handleNewChat = (model: Conversation['model']) => {
    createConversation(model);
    navigation.navigate('Chat');
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
    navigation.navigate('Chat');
  };

  const handleDeleteConversation = (id: string) => {
    Alert.alert('Delete Conversation', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteConversation(id),
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <Text style={[styles.title, { color: themeColors.text }]}>Toto AI</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.newChatButton,
            { backgroundColor: themeColors.primary },
          ]}
          onPress={() => handleNewChat('gpt-3.5-turbo')}
        >
          <Ionicons name="add-circle" size={20} color="white" />
          <Text style={styles.buttonText}>New Chat (GPT)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.newChatButton,
            { backgroundColor: themeColors.secondary },
          ]}
          onPress={() => handleNewChat('claude-3-sonnet-20240229')}
        >
          <Ionicons name="add-circle" size={20} color="white" />
          <Text style={styles.buttonText}>New Chat (Claude)</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <View style={styles.conversationWrapper}>
            <ConversationItem
              conversation={item}
              isActive={currentConversationId === item.id}
              onPress={() => handleSelectConversation(item.id)}
              onLongPress={() => handleDeleteConversation(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent=(
          <View style={styles.emptyContainer}>
            <Ionicons
              name="chatbubbles-outline"
              size={48}
              color={themeColors.textSecondary}
            />
            <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
              No conversations yet. Start a new chat!
            </Text>
          </View>
        )
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  newChatButton: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  conversationWrapper: {
    marginVertical: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
});
