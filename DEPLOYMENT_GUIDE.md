# Toto AI - Deployment Guide

## 🎯 Overview

This guide covers deploying your Toto AI app to both Apple App Store and Google Play Store.

---

## 📱 Apple App Store Deployment

### Prerequisites
- Apple Developer Account ($99/year)
- Two-factor authentication enabled
- App-specific password
- Certificate and provisioning profile

### Step 1: Create App Entry

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click "My Apps"
3. Click "+" to create new app
4. Fill in:
   - Platform: iOS
   - Name: "Toto AI"
   - Primary Language: English
   - Bundle ID: `com.yourname.totoai` (must match signing certificate)
   - SKU: `toto-ai-2024`

### Step 2: Configure App Details

#### General Information
- **Name**: Toto AI
- **Subtitle**: AI Chat for Everyone
- **Description**:
  ```
  Toto AI is a powerful ChatGPT-like mobile application that brings advanced 
  AI conversations to your pocket. Chat with both OpenAI's GPT models and 
  Anthropic's Claude models, generate images with DALL-E, and enjoy a seamless 
  conversational experience.
  
  Features:
  • Chat with GPT-4 and Claude
  • Image generation with DALL-E
  • Voice input and natural language processing
  • Conversation history and management
  • Dark and light themes
  • Secure API key storage
  • Real-time response streaming
  ```

#### Pricing and Availability
- Price Tier: Free
- Availability: Worldwide

#### App Icon
- Upload 1024x1024 icon (no transparency)

### Step 3: Screenshots

Required sizes:
- iPhone 6.7" (2796 x 1290) - 3 screenshots minimum
- iPhone 5.5" (2208 x 1242) - 3 screenshots minimum

Screenshot ideas:
1. Chat interface with messages
2. Image generation feature
3. Conversation history
4. Settings screen

Add captions:
- "Chat with AI"
- "Generate Images"
- "Manage Conversations"
- "Customize Settings"

### Step 4: Keywords

Use 30 characters or less for each (max 5):
- "AI chat"
- "ChatGPT"
- "AI assistant"
- "Claude"
- "Image generation"

### Step 5: Preview Video

Optional but recommended. Create a 15-30 second video showing:
1. App launch
2. Sending a message
3. Receiving AI response
4. Image generation

### Step 6: Support and Privacy

- **Support Email**: your-email@example.com
- **Support URL**: https://github.com/r69196436-ctrl/toto-ai/issues
- **Privacy Policy**: https://yourwebsite.com/privacy
- **Terms of Service**: https://yourwebsite.com/terms

### Step 7: Content Rating

Complete questionnaire:
- Select "Medical or health-related" if relevant
- No violence, sexual content, etc.
- Age rating: 4+

### Step 8: Build and Upload

```bash
# Create production build
eas build --platform ios --profile production

# Upload to TestFlight (automatic)
# Or manual upload via Transporter
```

Or use Transporter app:
1. Download from App Store
2. Sign in with Apple ID
3. Select .ipa file from build
4. Upload

### Step 9: Review

Build will appear in "App Store Connect > Builds"

Wait 10-30 minutes for processing, then test in TestFlight:
1. Copy TestFlight link to testers
2. Testers install via email link
3. Gather feedback
4. Submit for review

### Step 10: Submit for Review

1. Complete all metadata
2. Select build
3. Click "Submit for Review"
4. Answer compliance questions
5. Add version notes

Review timeline: 24-48 hours typically

---

## 🤖 Google Play Store Deployment

### Prerequisites
- Google Play Developer Account ($25 one-time)
- Signing keystore and passwords
- Service account key (JSON)

### Step 1: Create Google Play Account

1. Go to [Google Play Console](https://play.google.com/console)
2. Sign in with Google Account
3. Accept agreement and pay $25
4. Wait for account activation (can take 24-48 hours)

### Step 2: Create App Entry

1. Click "Create app"
2. Fill in:
   - App name: "Toto AI"
   - Default language: English
   - App or game: App
   - Free or paid: Free
   - Category: Productivity
   - Content rating: General Audiences

### Step 3: Configure App Details

#### Listing Information

**App Name**
```
Toto AI
```

**Short Description** (80 chars max)
```
Advanced AI chat with GPT and Claude
```

**Full Description** (4000 chars)
```
Toto AI is a feature-rich mobile application that brings powerful AI conversations 
to your fingertips. Seamlessly chat with both OpenAI's GPT models and Anthropic's 
Clause models, generate stunning images, and enjoy a premium conversational experience.

Key Features:
✓ Dual AI Support - Chat with GPT-4, GPT-3.5, Claude 3 and more
✓ Image Generation - Create beautiful images with DALL-E
✓ Voice Input - Speak naturally and AI will respond
✓ Conversation History - Save and manage unlimited conversations
✓ Dark & Light Themes - Automatically adapt to your device settings
✓ Real-time Streaming - See AI responses as they're generated
✓ Secure Storage - Your API keys are encrypted locally
✓ Offline Support - Access conversation history anytime

Perfect for:
• Learning and education
• Creative writing and brainstorming
• Code assistance and debugging
• General Q&A and research
• Content creation
• Image generation and design

Note: Requires valid OpenAI and/or Anthropic API keys
```

**Screenshots**

Required sizes:
- Phone: 1080 x 1920 (4 images minimum)
- 7-inch tablet: 1200 x 1920 (4 images minimum)
- 10-inch tablet: 1600 x 2560 (4 images minimum)

**Feature Graphic**
- Size: 1024 x 500
- Show app name and key features

**Icon**
- Size: 512 x 512
- PNG format

### Step 4: Content Rating

1. Complete questionnaire
2. Select "None" for:
   - Violence
   - Sexual content
   - Profanity
   - Horror
   - Alcohol and tobacco
3. Save and get rating

### Step 5: Privacy and Permissions

Configure:
- **Privacy Policy URL**: https://yourwebsite.com/privacy
- **Permissions**: 
  - Camera (for image features)
  - Microphone (for voice input)
  - Photos (for image picking)
  - Network access

### Step 6: Target Audience

- Age: 13+
- Children: No
- Maturity: Not rated

### Step 7: Create Service Account

For automated submissions:

1. Go to Google Cloud Console
2. Create new project
3. Enable Google Play API
4. Create service account
5. Generate JSON key
6. Save securely

### Step 8: Build and Upload

```bash
# Create production build
eas build --platform android --profile production

# This creates a .aab (Android App Bundle) file
```

### Step 9: Release to Internal Testing

1. Go to "Testing > Internal testing"
2. Create release
3. Upload .aab file
4. Add release notes
5. Review
6. Start rollout

### Step 10: Internal Testing

1. Add testers (internal team)
2. Share testing link
3. Collect feedback
4. Fix any issues
5. Prepare for closed testing

### Step 11: Closed Testing

1. Create another release
2. Same .aab file
3. Add more testers (up to 100)
4. Run for 1-2 weeks
5. Gather feedback

### Step 12: Open Testing (Optional)

1. Release to open beta
2. Anyone can join
3. Get broader feedback
4. Monitor for issues

### Step 13: Production Release

1. Go to "Release > Production"
2. Create new release
3. Upload same or new .aab
4. Add release notes
5. Set rollout percentage
6. Start with 5%, scale to 100%

### Step 14: Monitor

After release:
- Monitor crash rates
- Check user reviews
- Track ratings
- Monitor ANR (Application Not Responding)
- Check storage usage

---

## 📋 Pre-Launch Checklist

### Before iOS Submission
- [ ] All screenshots completed
- [ ] App icon added (1024x1024)
- [ ] Metadata reviewed (name, description, keywords)
- [ ] Privacy policy URL working
- [ ] Support email configured
- [ ] Build number incremented
- [ ] Version number updated
- [ ] Tested on physical device
- [ ] All API keys functional
- [ ] Crash testing completed

### Before Android Submission
- [ ] Screenshots for all device sizes
- [ ] Feature graphic created
- [ ] Content rating completed
- [ ] Privacy policy added
- [ ] Permissions justified
- [ ] Keystore backed up
- [ ] Build signed correctly
- [ ] Version code incremented
- [ ] Tested on multiple Android versions
- [ ] Performance optimized

---

## 🔄 Update Process

For future updates:

```bash
# Update version in app.json
{
  "expo": {
    "version": "1.1.0"
  }
}

# iOS
eas build --platform ios --profile production
npm run submit:ios

# Android
eas build --platform android --profile production
eas submit --platform android
```

---

## 📊 Post-Launch Monitoring

### Analytics
- Monitor download numbers
- Track active users
- Check crash reports
- Review user ratings
- Analyze feedback

### Optimization
- Fix reported bugs
- Improve performance
- Add requested features
- Update dependencies
- Security patches

---

## 📞 Support Resources

- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer/)
- [Expo Docs](https://docs.expo.dev/)
- [EAS Submit Docs](https://docs.expo.dev/submit/)

---

**Good luck with your launch! 🚀**
