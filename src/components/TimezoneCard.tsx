import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@utils/colors';
import { DigitalClock } from './DigitalClock';
import { TimezoneService } from '@services/timezoneService';

interface TimezoneCardProps {
  timezoneId: string;
  city: string;
  name: string;
  format24Hour: boolean;
  showSeconds: boolean;
  onRemove?: () => void;
}

export const TimezoneCard: React.FC<TimezoneCardProps> = ({
  timezoneId,
  city,
  name,
  format24Hour,
  showSeconds,
  onRemove,
}) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];
  const [time, setTime] = useState(() =>
    TimezoneService.getTimeInZone(timezoneId, format24Hour)
  );

  useEffect(() => {
    setTime(TimezoneService.getTimeInZone(timezoneId, format24Hour));
    const interval = setInterval(() => {
      setTime(TimezoneService.getTimeInZone(timezoneId, format24Hour));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneId, format24Hour]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.surface, borderColor: themeColors.border },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.city, { color: themeColors.text }]}>{city}</Text>
          <Text style={[styles.timezone, { color: themeColors.textSecondary }]}>
            {name}
          </Text>
        </View>
        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Ionicons name="close-circle" size={24} color={themeColors.error} />
          </TouchableOpacity>
        )}
      </View>

      <DigitalClock
        hours={time.hours}
        minutes={time.minutes}
        seconds={time.seconds}
        period={time.period}
        showSeconds={showSeconds}
        size="medium"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  city: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  timezone: {
    fontSize: 13,
  },
  removeButton: {
    padding: 8,
  },
});
