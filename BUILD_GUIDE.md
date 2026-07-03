# Toto AI - Complete Build Guide

## 📋 Prerequisites

Before building, ensure you have:

### All Platforms
- ✅ Node.js v16+ ([Download](https://nodejs.org/))
- ✅ npm or yarn
- ✅ Git
- ✅ Valid API keys (OpenAI & Anthropic)
- ✅ Expo Account ([Create](https://expo.io))

### For iOS
- ✅ macOS (Big Sur or newer)
- ✅ Xcode 13+ ([Download from App Store](https://apps.apple.com/us/app/xcode/id497799835))
- ✅ CocoaPods
- ✅ Apple Developer Account ($99/year)
- ✅ iOS Certificates & Provisioning Profiles

### For Android
- ✅ Android Studio ([Download](https://developer.android.com/studio))
- ✅ Android SDK (API Level 33+)
- ✅ Java Development Kit (JDK 11+)
- ✅ Google Play Developer Account ($25 one-time)
- ✅ Android Keystore

---

## 🚀 Quick Start (5 Minutes)

### 1. Initial Setup

```bash
# Clone the repo
git clone https://github.com/r69196436-ctrl/toto-ai.git
cd toto-ai

# Install dependencies
npm install

# Install EAS CLI globally
npm install -g eas-cli@latest

# Login to Expo
eas login
```

### 2. Configure Environment

```bash
# Copy and edit environment file
cp .env.example .env

# Add your API keys
# REACT_APP_OPENAI_API_KEY=sk-...
# REACT_APP_ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Update App Identifiers

Edit `app.json`:

```json
{
  "expo": {
    "name": "Toto AI",
    "ios": {
      "bundleIdentifier": "com.yourname.totoai"  // Change this
    },
    "android": {
      "package": "com.yourname.totoai"  // Change this
    }
  }
}
```

---

## 📱 Building for iOS

### Step 1: Set Up iOS Development Environment

```bash
# Run the iOS setup script
chmod +x scripts/setup-ios.sh
./scripts/setup-ios.sh
```

Or manually:

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install/update CocoaPods
sudo gem install cocoapods

# Install pod dependencies
cd ios
pod install
cd ..
```

### Step 2: Create iOS Certificates

#### Option A: Using Expo (Easiest)

```bash
eas credentials
```

Follow the prompts to create credentials.

#### Option B: Manual Setup

1. Go to [Apple Developer Console](https://developer.apple.com/account)
2. Create App ID: `com.yourname.totoai`
3. Create provisioning profiles
4. Download certificates

### Step 3: Build

```bash
# Development build (for testing on simulator)
eas build --platform ios --profile development

# Preview build
eas build --platform ios --profile preview

# Production build (for App Store)
eas build --platform ios --profile production
```

Build will take 10-15 minutes. You'll get a URL to download when complete.

### Step 4: Test on Simulator/Device

```bash
# Download and run on simulator
ea build --platform ios --profile development --local

# Or use Expo Go for quick testing
exp start
# Scan QR code with iPhone camera
```

### Step 5: Submit to App Store

```bash
# After production build
eas submit --platform ios
```

Provide:
- Apple ID
- App Password (Generate at [appleid.apple.com](https://appleid.apple.com))
- Team ID

---

## 🤖 Building for Android

### Step 1: Set Up Android Development Environment

```bash
# Run Android setup script
chmod +x scripts/setup-android.sh
./scripts/setup-android.sh
```

Or manually:

1. Install [Android Studio](https://developer.android.com/studio)
2. Set ANDROID_HOME:

```bash
# Add to ~/.bash_profile or ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Reload
source ~/.bash_profile
```

### Step 2: Create Keystore

```bash
# Generate signing keystore
keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias toto-key
```

**Save the keystore file and password safely!**

### Step 3: Configure Signing

Create `android/signing.properties`:

```properties
KEY_STORE=../release.keystore
KEY_STORE_PASSWORD=your_keystore_password
KEY_ALIAS=toto-key
KEY_PASSWORD=your_key_password
```

### Step 4: Build

```bash
# Development build (APK for testing)
eas build --platform android --profile development

# Preview build
eas build --platform android --profile preview

# Production build (AAB for Google Play)
eas build --platform android --profile production
```

Build will take 15-20 minutes.

### Step 5: Test on Emulator/Device

```bash
# Start Android emulator
emulator -avd Pixel_API_33

# Install APK
adb install path/to/app.apk

# Or use Expo Go
exp start
# Press 'a' for Android
```

### Step 6: Submit to Google Play

```bash
# After production build
eas submit --platform android
```

Provide:
- Service Account JSON key from Google Play Console
- Track: internal → closed → production

---

## 🔨 Build Commands

```bash
# Development
npm run build:ios      # iOS development
npm run build:android  # Android development

# Production
eas build --platform ios --profile production
eas build --platform android --profile production

# Both platforms
npm run build:all

# Submit
npm run submit:ios
npm run submit:android

# Local development
npm start              # Start dev server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
```

---

## 📸 App Icons & Splash Screens

### 1. Create Icons

Generate icons at [app-icon-generator.com](https://www.appicon.co/) or use `expo prebuild`:

```bash
expo prebuild --clean
```

### 2. Place Assets

Replace files in `assets/`:

- `icon.png` - 1024x1024px (app icon)
- `splash.png` - 1242x2436px (splash screen)
- `adaptive-icon.png` - 1080x1080px (Android)
- `favicon.png` - 192x192px (web)

### 3. Update app.json

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

---

## 🔐 Environment Variables

Create `.env` file (never commit this):

```env
REACT_APP_OPENAI_API_KEY=sk-...
REACT_APP_ANTHROPIC_API_KEY=sk-ant-...
REACT_APP_API_TIMEOUT=30000
REACT_APP_MAX_TOKENS=2000
```

---

## 🐛 Troubleshooting

### iOS Issues

**Xcode not found**
```bash
xcode-select --install
```

**CocoaPods error**
```bash
cd ios
rm Podfile.lock
pod install --repo-update
cd ..
```

**Build fails with certificate error**
- Run `eas credentials` to regenerate
- Check Apple Developer account

### Android Issues

**ANDROID_HOME not set**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
```

**Gradle build failure**
```bash
cd android
./gradlew clean
cd ..
npm run build:android
```

**Keystore issues**
```bash
# Check keystore
keytool -list -v -keystore release.keystore
```

### General Issues

**Dependencies not found**
```bash
rm -rf node_modules
npm install
```

**Clear cache**
```bash
expo doctor --fix-dependencies
```

**Network timeout**
```bash
# Increase timeout
npm config set fetch-timeout 120000
```

---

## 📦 File Structure for Submission

### iOS
```
Release files:
- App.ipa (for TestFlight)
- Extracted .app (for App Store)
```

### Android
```
Release files:
- app-release.aab (for Google Play)
- app-release.apk (for side-loading)
```

---

## 🎯 App Store Submission Checklist

### iOS App Store
- [ ] App icon (1024x1024)
- [ ] Screenshots (iPhone 6.7", iPhone 5.5")
- [ ] Description (up to 4000 characters)
- [ ] Keywords (up to 100 characters)
- [ ] Support URL
- [ ] Privacy Policy URL
- [ ] Category
- [ ] Rating (content description)
- [ ] Build uploaded via TestFlight
- [ ] Version number and build number updated

### Google Play Store
- [ ] App icon (512x512)
- [ ] Feature graphic (1024x500)
- [ ] Screenshots (at least 2, max 8)
- [ ] Description (up to 4000 characters)
- [ ] Short description (up to 80 characters)
- [ ] Privacy Policy URL
- [ ] Content rating questionnaire
- [ ] Target audience
- [ ] Build (AAB) uploaded
- [ ] Release notes

---

## 📞 Support

For issues:
1. Check [Expo docs](https://docs.expo.dev)
2. Check [React Native docs](https://reactnative.dev)
3. Open GitHub issues: https://github.com/r69196436-ctrl/toto-ai/issues

---

## 🎓 Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Guide](https://reactnative.dev/docs/getting-started)
- [Apple Developer Docs](https://developer.apple.com/documentation/)
- [Android Developer Docs](https://developer.android.com/docs)
- [EAS Build Docs](https://docs.expo.dev/build/setup/)

---

**Happy Building! 🚀**
