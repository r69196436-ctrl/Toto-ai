import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ClockScreen } from '@screens/ClockScreen';
import { SettingsClockScreen } from '@screens/SettingsClockScreen';

import { colors } from '@utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ClockStack = () => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.surface,
        },
        headerTintColor: themeColors.primary,
        headerTitleStyle: {
          fontWeight: '600',
          color: themeColors.text,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="ClockHome"
        component={ClockScreen}
        options={{
          title: 'World Clock',
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.surface,
        },
        headerTintColor: themeColors.primary,
        headerTitleStyle: {
          fontWeight: '600',
          color: themeColors.text,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="SettingsHome"
        component={SettingsClockScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};

const ClockNavigator = () => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: themeColors.primary,
          tabBarInactiveTintColor: themeColors.textSecondary,
          tabBarStyle: {
            backgroundColor: themeColors.surface,
            borderTopColor: themeColors.border,
            paddingBottom: 5,
            paddingTop: 5,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="ClockTab"
          component={ClockStack}
          options={{
            title: 'Clock',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsStack}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ClockNavigator;
