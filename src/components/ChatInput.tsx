import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@utils/colors';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onMicPress: () => void;
  onImagePress: () => void;
  loading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onMicPress,
  onImagePress,
  loading,
}) => {
  const [text, setText] = useState('');
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <TouchableOpacity
        onPress={onMicPress}
        style={styles.iconButton}
        disabled={loading}
      >
        <Ionicons name="mic" size={24} color={themeColors.primary} />
      </TouchableOpacity>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: themeColors.background,
            color: themeColors.text,
            borderColor: themeColors.border,
          },
        ]}
        placeholder="Type a message..."
        placeholderTextColor={themeColors.textSecondary}
        value={text}
        onChangeText={setText}
        multiline
        maxHeight={100}
        editable={!loading}
      />

      <TouchableOpacity
        onPress={onImagePress}
        style={styles.iconButton}
        disabled={loading}
      >
        <Ionicons name="image" size={24} color={themeColors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSend}
        style={[
          styles.sendButton,
          {
            backgroundColor: loading ? themeColors.textSecondary : themeColors.primary,
          },
        ]}
        disabled={loading || !text.trim()}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Ionicons name="send" size={20} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
