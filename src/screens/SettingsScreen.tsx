import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useAppStore } from '@store/appStore';
import { colors } from '@utils/colors';
import { isValidApiKey } from '@utils/helpers';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  const { settings, updateSettings, setOpenaiApiKey, setAnthropicApiKey } =
    useAppStore();

  const [openaiKey, setOpenaiKey] = useState(settings.openaiApiKey);
  const [anthropicKey, setAnthropicKey] = useState(settings.anthropicApiKey);

  const handleSaveOpenaiKey = () => {
    if (!openaiKey.trim()) {
      Alert.alert('Error', 'API key cannot be empty');
      return;
    }
    setOpenaiApiKey(openaiKey);
    Alert.alert('Success', 'OpenAI API key saved');
  };

  const handleSaveAnthropicKey = () => {
    if (!anthropicKey.trim()) {
      Alert.alert('Error', 'API key cannot be empty');
      return;
    }
    setAnthropicApiKey(anthropicKey);
    Alert.alert('Success', 'Anthropic API key saved');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            API Keys
          </Text>

          <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
            <Text style={[styles.label, { color: themeColors.text }]}>
              OpenAI API Key
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: themeColors.background,
                  color: themeColors.text,
                  borderColor: themeColors.border,
                },
              ]}
              placeholder="sk-..."
              placeholderTextColor={themeColors.textSecondary}
              value={openaiKey}
              onChangeText={setOpenaiKey}
              secureTextEntry
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: themeColors.primary },
              ]}
              onPress={handleSaveOpenaiKey}
            >
              <Text style={styles.buttonText}>Save OpenAI Key</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
            <Text style={[styles.label, { color: themeColors.text }]}>
              Anthropic API Key
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: themeColors.background,
                  color: themeColors.text,
                  borderColor: themeColors.border,
                },
              ]}
              placeholder="sk-ant-..."
              placeholderTextColor={themeColors.textSecondary}
              value={anthropicKey}
              onChangeText={setAnthropicKey}
              secureTextEntry
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: themeColors.secondary },
              ]}
              onPress={handleSaveAnthropicKey}
            >
              <Text style={styles.buttonText}>Save Anthropic Key</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Preferences
          </Text>

          <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                Sound
              </Text>
              <Switch
                value={settings.soundEnabled}
                onValueChange={(value) =>
                  updateSettings({ soundEnabled: value })
                }
                trackColor={{
                  false: themeColors.border,
                  true: themeColors.primary,
                }}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                Notifications
              </Text>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={(value) =>
                  updateSettings({ notificationsEnabled: value })
                }
                trackColor={{
                  false: themeColors.border,
                  true: themeColors.primary,
                }}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                Temperature: {settings.temperature.toFixed(1)}
              </Text>
              <Text style={[styles.settingValue, { color: themeColors.textSecondary }]}>
                {settings.temperature < 0.5 ? 'Precise' : settings.temperature < 1 ? 'Balanced' : 'Creative'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            About
          </Text>
          <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
            <Text style={[styles.label, { color: themeColors.text }]}>
              Toto AI v1.0.0
            </Text>
            <Text style={[styles.description, { color: themeColors.textSecondary }]}>
              A powerful ChatGPT-like mobile app supporting both OpenAI and Anthropic APIs
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 12,
  },
  description: {
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },
});
