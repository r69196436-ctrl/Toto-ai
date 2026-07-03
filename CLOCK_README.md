# 🕐 World Clock - Digital Clock with Multiple Time Zones

A beautiful, modern digital clock application that displays the current time in different time zones around the world.

## ✨ Features

### Core Features
- ✅ **Digital Clock Display** - Large, easy-to-read digital clock
- ✅ **Multiple Time Zones** - Track time in 30+ cities worldwide
- ✅ **Real-time Updates** - Updates every second
- ✅ **Local Time Display** - Always shows your current local time
- ✅ **12/24 Hour Format** - Toggle between 12-hour and 24-hour display
- ✅ **Show/Hide Seconds** - Optional seconds display
- ✅ **Dark/Light Theme** - Automatic theme detection
- ✅ **Persistent Settings** - Saves your preferences
- ✅ **Search Time Zones** - Quickly find any time zone

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/r69196436-ctrl/toto-ai.git
cd toto-ai

# Install dependencies
npm install

# Install date-fns-tz for timezone support
npm install date-fns-tz
```

### Running the App

```bash
# Start the development server
npm start

# For iOS (macOS only)
npm run ios

# For Android
npm run android

# For Web
npm run web
```

### Testing with Expo Go

1. Install **Expo Go** app on your phone
2. Run `npm start`
3. Scan the QR code with your phone
4. App loads instantly!

## 📱 Supported Time Zones

### Americas
- New York (Eastern Time)
- Chicago (Central Time)
- Denver (Mountain Time)
- Los Angeles (Pacific Time)
- Toronto (Eastern Canada)
- Mexico City
- São Paulo
- Buenos Aires

### Europe
- London (GMT/BST)
- Paris (CET/CEST)
- Berlin (CET/CEST)
- Moscow (MSK)
- Istanbul (EET/EEST)
- Dubai (GST)

### Asia
- India (IST)
- Bangkok (ICT)
- Hong Kong (HKT)
- Shanghai (CST)
- Tokyo (JST)
- Seoul (KST)
- Singapore (SGT)
- New Delhi

### Australia & Pacific
- Sydney (AEDT)
- Melbourne (AEDT)
- Brisbane (AEST)
- Perth (AWST)
- Auckland (NZDT)
- Fiji (FJT)

### Africa
- Cairo (EET)
- Johannesburg (SAST)
- Lagos (WAT)

## 🎯 Usage

### Add a Time Zone

1. Tap the **+** button in the "Add Time Zone" section
2. Search for your desired city or time zone
3. Tap to add
4. The time zone appears on your main screen

### Remove a Time Zone

1. Tap the **X** button on any time zone card
2. Or tap the time zone tag to remove it quickly

### Change Time Format

1. Go to **Settings**
2. Toggle **24-Hour Format** on/off
3. Changes apply immediately

### Toggle Seconds Display

1. Go to **Settings**
2. Toggle **Show Seconds** on/off

### Change Theme

1. Go to **Settings**
2. Choose **Light**, **Dark**, or **Auto** theme

## 📁 Project Structure

```
src/
├── components/
│   ├── DigitalClock.tsx         # Main digital clock display
│   ├── TimezoneCard.tsx         # Individual timezone card
│   └── TimeZoneSelector.tsx     # Time zone selection modal
├── screens/
│   ├── ClockScreen.tsx          # Main clock display screen
│   └── SettingsClockScreen.tsx  # Settings screen
├── services/
│   └── timezoneService.ts       # Timezone data and utilities
├── store/
│   └── clockStore.ts            # State management (Zustand)
├── types/
│   └── clock.ts                 # TypeScript type definitions
├── utils/
│   └── colors.ts                # Theme colors
└── navigation/
    └── ClockNavigation.tsx       # Navigation setup
```

## 🎨 Customization

### Change Colors

Edit `src/utils/colors.ts`:

```typescript
export const colors = {
  light: {
    primary: '#0EA5E9',      // Change these
    secondary: '#F59E0B',
    // ... more colors
  },
  dark: {
    // ... dark theme colors
  },
};
```

### Add More Time Zones

Edit `src/services/timezoneService.ts`:

```typescript
const TIMEZONES: TimeZone[] = [
  // Add new timezone
  { 
    id: 'America/Vancouver', 
    name: 'Pacific Time', 
    city: 'Vancouver', 
    offset: 'UTC-8' 
  },
  // ... more timezones
];
```

## 🔧 Configuration

### Update App Name

Edit `app.json`:

```json
{
  "expo": {
    "name": "World Clock",
    "slug": "world-clock"
  }
}
```

### Change Bundle ID

Edit `app.json`:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourname.worldclock"
    },
    "android": {
      "package": "com.yourname.worldclock"
    }
  }
}
```

## 📦 Building for Distribution

### Development Build (APK)

```bash
# For Android
eas build --platform android --profile development

# For iOS
eas build --platform ios --profile development
```

### Production Build

```bash
# Both platforms
npm run build:all

# Individual
npm run build:ios
npm run build:android
```

### Submit to App Stores

```bash
# iOS App Store
npm run submit:ios

# Google Play Store
npm run submit:android
```

See `BUILD_GUIDE.md` and `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 🐛 Troubleshooting

### Clock not updating
- Check if "Show Seconds" is toggled on
- Restart the app
- Check device time settings

### Time zone not found
- Use the search function in the time zone selector
- Search by city name or timezone code
- Check if timezone name is correct

### Display issues
- Toggle 24-hour format and back
- Toggle dark/light theme
- Restart the app

### Performance issues
- Reduce number of time zones displayed
- Close other running apps
- Clear app cache

## 💾 Data Storage

- All settings are saved locally using `AsyncStorage`
- No cloud storage or analytics
- Your data is never sent to external servers
- Settings persist after app restart

## 📱 Supported Platforms

- ✅ iOS 13+
- ✅ Android 5.0+
- ✅ Web (experimental)

## 🔄 Updates

The app automatically updates time every second without user interaction.

## 📝 License

MIT License - See LICENSE file for details

## 🎓 Tech Stack

- **React Native 0.73.6**
- **Expo 50.0.0**
- **TypeScript 5.3.3**
- **Zustand** (State Management)
- **date-fns-tz** (Timezone Support)
- **React Navigation** (Navigation)

## 🙋 Support

For issues or questions:
- GitHub Issues: https://github.com/r69196436-ctrl/toto-ai/issues
- Check `CLOCK_README.md` for more details

---

**Made with ❤️ for people who work across time zones**
