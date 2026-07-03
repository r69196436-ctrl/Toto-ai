import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DigitalClock } from '@components/DigitalClock';
import { TimezoneCard } from '@components/TimezoneCard';
import { TimeZoneSelector } from '@components/TimeZoneSelector';
import { useClockStore } from '@store/clockStore';
import { TimezoneService } from '@services/timezoneService';
import { colors } from '@utils/colors';

interface ClockScreenProps {
  navigation: any;
}

export const ClockScreen: React.FC<ClockScreenProps> = ({ navigation }) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  const {
    settings,
    selectedTimeZones,
    currentTime,
    updateCurrentTime,
    addTimeZone,
    removeTimeZone,
    loadFromStorage,
  } = useClockStore();

  const [localTime, setLocalTime] = useState(() =>
    TimezoneService.getTimeInZone('local', settings.format24Hour)
  );

  useFocusEffect(
    React.useCallback(() => {
      loadFromStorage();
    }, [])
  );

  useEffect(() => {
    // Get local timezone
    const getLocalTimezone = () => {
      const now = new Date();
      const timeString = now.toString();
      const tzMatch = timeString.match(/\(([^)]+)\)/);
      return tzMatch ? tzMatch[1] : 'UTC';
    };

    // Update time every second
    const interval = setInterval(() => {
      updateCurrentTime();
    }, settings.updateInterval);

    return () => clearInterval(interval);
  }, [settings.updateInterval]);

  useEffect(() => {
    // Update local time display
    const now = new Date();
    const hours24 = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    let hours = hours24;
    let period = '';

    if (!settings.format24Hour) {
      const hourNum = parseInt(hours24);
      period = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum % 12 || 12;
      hours = String(hour12).padStart(2, '0');
    }

    setLocalTime({ hours, minutes, seconds, period });
  }, [currentTime, settings.format24Hour]);

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
        showsVerticalScrollIndicator={false}
      >
        {/* Local Time */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Your Local Time
          </Text>
          <DigitalClock
            hours={localTime.hours}
            minutes={localTime.minutes}
            seconds={localTime.seconds}
            period={localTime.period}
            showSeconds={settings.showSeconds}
            size="large"
          />
        </View>

        {/* Time Zone Selector */}
        <TimeZoneSelector
          selectedTimeZones={selectedTimeZones}
          onAddTimeZone={addTimeZone}
          onRemoveTimeZone={removeTimeZone}
        />

        {/* Time Zone Cards */}
        <View style={styles.cardsSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Other Time Zones
          </Text>
          {selectedTimeZones.map((tzId) => {
            const tz = TimezoneService.getTimezoneById(tzId);
            if (!tz) return null;
            return (
              <TimezoneCard
                key={tzId}
                timezoneId={tzId}
                city={tz.city}
                name={tz.name}
                format24Hour={settings.format24Hour}
                showSeconds={settings.showSeconds}
                onRemove={() => removeTimeZone(tzId)}
              />
            );
          })}
        </View>

        {selectedTimeZones.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
              Add time zones to get started
            </Text>
          </View>
        )}
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
  cardsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
  },
});
