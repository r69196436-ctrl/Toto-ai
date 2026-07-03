import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useClockStore } from '@store/clockStore';
import ClockNavigator from '@/navigation/ClockNavigation';

export default function AppClock() {
  const loadFromStorage = useClockStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClockNavigator />
    </GestureHandlerRootView>
  );
}
