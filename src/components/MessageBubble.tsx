import React from 'react';
import { View, Text, StyleSheet, useColorScheme, ScrollView } from 'react-native';
import MarkdownDisplay from 'react-native-markdown-display';
import { Message } from '@types/index';
import { colors, messageColors } from '@utils/colors';
import { formatTime } from '@utils/helpers';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const scheme = useColorScheme() || 'light';
  const messageColor = messageColors[scheme as keyof typeof messageColors];
  const themeColors = colors[scheme as keyof typeof colors];

  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.container,
        { justifyContent: isUser ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isUser
              ? messageColor.userBubble
              : messageColor.assistantBubble,
            borderRadius: isUser ? 18 : 18,
            maxWidth: '85%',
          },
        ]}
      >
        {message.imageUrl && (
          <Text style={styles.imageLink}>🖼️ Image generated</Text>
        )}
        {isUser ? (
          <Text
            style={[
              styles.text,
              { color: messageColor.userText },
            ]}
          >
            {message.content}
          </Text>
        ) : (
          <MarkdownDisplay
            style={{
              text: {
                color: messageColor.assistantText,
                fontSize: 14,
                lineHeight: 20,
              },
              code_inline: {
                backgroundColor: `${themeColors.surface}`,
                color: messageColor.assistantText,
                paddingHorizontal: 6,
                borderRadius: 4,
              },
              code_block: {
                backgroundColor: `${themeColors.surface}`,
                color: messageColor.assistantText,
                padding: 12,
                borderRadius: 8,
              },
              link: {
                color: themeColors.primary,
              },
            }}
          >
            {message.content}
          </MarkdownDisplay>
        )}
      </View>
      <Text
        style={[
          styles.timestamp,
          { color: themeColors.textSecondary },
        ]}
      >
        {formatTime(message.timestamp)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 12,
    flexDirection: 'row',
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  imageLink: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    marginHorizontal: 8,
  },
});
