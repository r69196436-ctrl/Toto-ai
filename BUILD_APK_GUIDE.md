# 📱 Building APK for Android Download

## Quick APK Build (5-10 Minutes)

### Step 1: Prerequisites
```bash
# Make sure you're logged into Expo
eas login

# Verify your npm installation
node -v  # Should be v16+
npm -v
```

### Step 2: Build APK

```bash
# Build development APK (for testing)
eas build --platform android --profile development

# OR build production APK (for distribution)
eas build --platform android --profile production
```

### Step 3: Wait for Build
- Build takes 10-15 minutes
- You'll get a link to download the APK
- APK size: ~50-80 MB

### Step 4: Download APK
- Click the download link
- Save the APK file
- Transfer to your Android phone

### Step 5: Install on Phone

**Method 1: Direct Installation**
1. Copy APK to your Android phone
2. Open file manager
3. Tap the APK file
4. Tap "Install"
5. Done! ✅

**Method 2: ADB (USB Cable)**
```bash
adb install path/to/app.apk
```

---

## 🌍 Public Download Link Format

After build completes, you'll get a URL like:
```
https://builds.expo.dev/[project-id]/builds/[build-id].apk
```

Share this link with anyone to download!

---

## ⚠️ Requirements Before Building

1. ✅ EAS CLI installed: `npm install -g eas-cli`
2. ✅ Expo account: https://expo.dev
3. ✅ Logged in: `eas login`
4. ✅ Valid `app.json` with correct bundle ID
5. ✅ Node.js v16+

---

## 🔧 Troubleshooting

**"eas command not found"**
```bash
npm install -g eas-cli@latest
```

**"Not logged in"**
```bash
eas login
```

**"Build failed"**
- Check internet connection
- Verify app.json is valid
- Run: `expo doctor --fix-dependencies`

---

## 📊 Build Options

| Profile | Use Case | Size |
|---------|----------|------|
| development | Testing on device | ~50 MB |
| preview | Testing features | ~55 MB |
| production | App Store release | ~60 MB |

---

## ✅ After Build Completes

1. You get a download URL
2. Download the APK
3. Install on any Android phone
4. Share the link with anyone!

---

## 🚀 Commands Reference

```bash
# Check build status
eas build:list --platform android

# View recent builds
eas build:view

# Download specific APK
eas build:download --id [build-id]
```

---

**Ready? Run: `eas build --platform android --profile development`**
