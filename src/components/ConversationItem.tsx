import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Conversation } from '@types/index';
import { colors } from '@utils/colors';
import { truncateText } from '@utils/helpers';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onPress: () => void;
  onLongPress?: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onPress,
  onLongPress,
}) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  const preview = conversation.messages[conversation.messages.length - 1]?.content
    ? truncateText(conversation.messages[conversation.messages.length - 1].content, 40)
    : 'New conversation';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isActive ? themeColors.primary : themeColors.surface,
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: isActive ? 'white' : themeColors.text,
            },
          ]}
          numberOfLines={1}
        >
          {conversation.title}
        </Text>
        <Text
          style={[
            styles.preview,
            {
              color: isActive ? 'rgba(255,255,255,0.7)' : themeColors.textSecondary,
            },
          ]}
          numberOfLines={1}
        >
          {preview}
        </Text>
      </View>
      <Text
        style={[
          styles.modelTag,
          {
            backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : themeColors.primary,
            color: isActive ? 'white' : 'white',
          },
        ]}
      >
        {conversation.model.includes('gpt') ? 'GPT' : 'Claude'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  preview: {
    fontSize: 12,
  },
  modelTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: '600',
  },
});
