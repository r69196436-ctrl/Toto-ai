# Toto AI - ChatGPT-like Mobile App

A powerful cross-platform mobile application that brings AI conversations to your pocket. Toto AI supports both **OpenAI (GPT)** and **Anthropic (Claude)** APIs, offering users the flexibility to choose their preferred AI model.

## 🚀 Features

### Core Features
- ✅ **Dual AI Support**: Chat with both GPT and Claude models
- ✅ **Real-time Streaming**: Live response streaming for better UX
- ✅ **Conversation History**: Save and manage multiple conversations
- ✅ **Dark/Light Theme**: Automatic theme detection
- ✅ **Markdown Support**: Beautiful formatted responses

### Advanced Features
- 🎤 **Voice Input**: Speak to send messages
- 🎨 **Image Generation**: Generate images with DALL-E
- 📱 **Cross-Platform**: iOS and Android with single codebase
- 🔐 **Secure Storage**: API keys stored securely
- 🔔 **Push Notifications**: Stay updated with responses
- 📊 **Customizable Settings**: Temperature, token limits, and more

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher)
- **Expo CLI** (`npm install -g expo-cli`)
- **Git**
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)
- **API Keys**:
  - OpenAI API Key: https://platform.openai.com/api-keys
  - Anthropic API Key: https://console.anthropic.com/

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/r69196436-ctrl/toto-ai.git
cd toto-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your API keys:

```
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 4. Configure Expo

Create an `eas.json` file for building:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "preview2": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "preview3": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "production": {}
  }
}
```

## 🚀 Running the App

### Development Mode

```bash
# Start Expo
npm start

# Run on iOS (requires Xcode)
npm run ios

# Run on Android (requires Android Studio/Emulator)
npm run android

# Run on Web
npm run web
```

### Building for Production

#### iOS Build

```bash
npm run build:ios
```

Then submit to App Store:

```bash
npm run submit:ios
```

#### Android Build

```bash
npm run build:android
```

Then submit to Google Play Store:

```bash
npm run submit:android
```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatInput.tsx   # Message input with buttons
│   ├── MessageBubble.tsx # Chat message display
│   └── ConversationItem.tsx # Conversation list item
├── screens/            # App screens
│   ├── ChatScreen.tsx          # Main chat interface
│   ├── ConversationsScreen.tsx # Conversations list
│   ├── SettingsScreen.tsx      # App settings
│   └── ImageGenerationScreen.tsx # DALL-E integration
├── services/           # API and device services
│   ├── aiService.ts   # OpenAI & Anthropic integration
│   ├── imageService.ts # DALL-E integration
│   └── speechService.ts # Audio recording & TTS
├── store/             # State management (Zustand)
│   └── appStore.ts    # Global app state
├── utils/             # Helper functions
│   ├── colors.ts      # Theme colors
│   └── helpers.ts     # Utility functions
├── types/             # TypeScript definitions
└── navigation/        # React Navigation setup
```

## 🔧 Configuration

### API Keys

Add your API keys in the Settings tab within the app, or set them as environment variables.

### App Icon & Splash Screen

Replace the following files in `assets/`:
- `icon.png` - App icon (1024x1024)
- `splash.png` - Splash screen (1242x2436)
- `adaptive-icon.png` - Android adaptive icon (1080x1080)

### App Identifier

Update in `app.json`:
```json
"ios": {
  "bundleIdentifier": "com.yourname.totoai"
},
"android": {
  "package": "com.yourname.totoai"
}
```

## 📚 API Integration

### OpenAI (GPT Models)

Models supported:
- `gpt-4`
- `gpt-3.5-turbo`

### Anthropic (Claude Models)

Models supported:
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`
- `claude-3-haiku-20240307`

## 🎨 Theming

The app automatically detects system theme (Light/Dark). Colors are defined in `src/utils/colors.ts`.

## 🔒 Security

- API keys are stored securely using `expo-secure-store`
- Keys are never logged or exposed
- Sensitive data is encrypted in device storage

## 📦 Dependencies

### Core
- **React Native 0.73.6**
- **Expo 50.0.0**
- **React Navigation 6.1.9**
- **TypeScript 5.3.3**

### AI/APIs
- **OpenAI SDK 4.24.0**
- **Anthropic SDK 0.9.0**

### State Management
- **Zustand 4.4.1**

### UI/UX
- **React Native Vector Icons**
- **React Native Markdown Display**
- **React Native Linear Gradient**

### Device/Storage
- **Expo Camera**
- **Expo Image Picker**
- **Expo Notifications**
- **Expo Secure Store**
- **Expo AV** (Audio/Video)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### API Key Errors
- Ensure your API key is correctly set in Settings
- Check API key validity on respective platforms
- Verify internet connection

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo doctor --fix-dependencies`
- Update EAS: `npm install -g eas-cli@latest`

### Runtime Issues
- Check device logs: `adb logcat` (Android) or Xcode console (iOS)
- Verify app permissions in device settings
- Restart the development server

## 📧 Support

For issues and questions:
- GitHub Issues: https://github.com/r69196436-ctrl/toto-ai/issues
- Email: contact@anilpawar.com

## 🎉 Acknowledgments

- OpenAI for GPT API
- Anthropic for Claude API
- Expo team for amazing development tools
- React Native community

---

**Made with ❤️ by Anil Pawar**
