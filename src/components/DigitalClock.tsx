import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { colors } from '@utils/colors';

interface DigitalClockProps {
  hours: string;
  minutes: string;
  seconds: string;
  period?: string;
  showSeconds?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export const DigitalClock: React.FC<DigitalClockProps> = ({
  hours,
  minutes,
  seconds,
  period,
  showSeconds = true,
  size = 'large',
}) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  const sizeStyles = {
    large: {
      clockContainer: styles.largeClockContainer,
      timeText: styles.largeTimeText,
      periodText: styles.largePeriodText,
      separatorText: styles.largeSeparatorText,
    },
    medium: {
      clockContainer: styles.mediumClockContainer,
      timeText: styles.mediumTimeText,
      periodText: styles.mediumPeriodText,
      separatorText: styles.mediumSeparatorText,
    },
    small: {
      clockContainer: styles.smallClockContainer,
      timeText: styles.smallTimeText,
      periodText: styles.smallPeriodText,
      separatorText: styles.smallSeparatorText,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        currentSize.clockContainer,
        {
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        },
      ]}
    >
      <View style={styles.timeRow}>
        <Text
          style={[
            currentSize.timeText,
            { color: themeColors.primary },
          ]}
        >
          {hours}
        </Text>
        <Text
          style={[
            currentSize.separatorText,
            { color: themeColors.primary },
          ]}
        >
          :
        </Text>
        <Text
          style={[
            currentSize.timeText,
            { color: themeColors.primary },
          ]}
        >
          {minutes}
        </Text>
        {showSeconds && (
          <>
            <Text
              style={[
                currentSize.separatorText,
                { color: themeColors.primary },
              ]}
            >
              :
            </Text>
            <Text
              style={[
                currentSize.timeText,
                { color: themeColors.primary },
              ]}
            >
              {seconds}
            </Text>
          </>
        )}
        {period && (
          <Text
            style={[
              currentSize.periodText,
              { color: themeColors.secondary },
            ]}
          >
            {period}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Large
  largeClockContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  largeTimeText: {
    fontSize: 72,
    fontWeight: '300',
    letterSpacing: 2,
    fontFamily: 'Courier New',
  },
  largePeriodText: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 12,
  },
  largeSeparatorText: {
    fontSize: 64,
    fontWeight: '300',
    marginHorizontal: 4,
  },

  // Medium
  mediumClockContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  mediumTimeText: {
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: 1,
    fontFamily: 'Courier New',
  },
  mediumPeriodText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  mediumSeparatorText: {
    fontSize: 40,
    fontWeight: '300',
    marginHorizontal: 2,
  },

  // Small
  smallClockContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  smallTimeText: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 0.5,
    fontFamily: 'Courier New',
  },
  smallPeriodText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  smallSeparatorText: {
    fontSize: 28,
    fontWeight: '300',
    marginHorizontal: 2,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
