import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useClockStore } from '@store/clockStore';
import { colors } from '@utils/colors';

interface SettingsClockScreenProps {
  navigation: any;
}

export const SettingsClockScreen: React.FC<SettingsClockScreenProps> = ({
  navigation,
}) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  const { settings, toggleFormat, toggleSeconds, toggleTheme, saveToStorage } =
    useClockStore();

  const handleSave = async () => {
    await saveToStorage();
    Alert.alert('Success', 'Settings saved successfully!');
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
        {/* Time Format */}
        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Time Format
          </Text>

          <View
            style={[
              styles.settingRow,
              { borderBottomColor: themeColors.border },
            ]}
          >
            <View>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                24-Hour Format
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: themeColors.textSecondary },
                ]}
              >
                {settings.format24Hour ? 'Enabled' : 'Disabled (12-Hour)'}
              </Text>
            </View>
            <Switch
              value={settings.format24Hour}
              onValueChange={toggleFormat}
              trackColor={{
                false: themeColors.border,
                true: themeColors.primary,
              }}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                Show Seconds
              </Text>
              <Text
                style={[
                  styles.settingDescription,
                  { color: themeColors.textSecondary },
                ]}
              >
                {settings.showSeconds ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <Switch
              value={settings.showSeconds}
              onValueChange={toggleSeconds}
              trackColor={{
                false: themeColors.border,
                true: themeColors.primary,
              }}
            />
          </View>
        </View>

        {/* Theme */}
        <View
          style={[
            styles.section,
            { backgroundColor: themeColors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Appearance
          </Text>

          <View style={styles.themeOptions}>
            {(['light', 'dark', 'auto'] as const).map((theme) => (
              <TouchableOpacity
                key={theme}
                style={[
                  styles.themeButton,
                  {
                    backgroundColor:
                      settings.theme === theme
                        ? themeColors.primary
                        : themeColors.border,
                  },
                ]}
                onPress={() => toggleTheme(theme)}
              >
                <Text
                  style={[
                    styles.themeButtonText,
                    {
                      color:
                        settings.theme === theme
                          ? 'white'
                          : themeColors.text,
                    },
                  ]}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About */}
        <View
          style={[
            styles.section,
            { backgroundColor: themeColors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            About
          </Text>
          <Text style={[styles.aboutText, { color: themeColors.textSecondary }]}>
            World Clock v1.0.0
          </Text>
          <Text
            style={[
              styles.aboutDescription,
              { color: themeColors.textSecondary },
            ]}
          >
            A beautiful digital clock app that displays time in different time
            zones around the world.
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: themeColors.primary },
          ]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  themeButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  aboutText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
