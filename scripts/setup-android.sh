#!/bin/bash

# Android Setup Script
# This script prepares your environment for Android building

echo "🤖 Android Build Setup"
echo "======================"
echo ""

# Check for Android SDK
if [ -z "$ANDROID_HOME" ]; then
    echo "❌ ANDROID_HOME environment variable not set"
    echo ""
    echo "Please set it up:"
    echo ""
    echo "# Add to ~/.bash_profile or ~/.zshrc"
    echo "export ANDROID_HOME=~/Library/Android/sdk"
    echo "export PATH=$ANDROID_HOME/platform-tools:$PATH"
    echo "export PATH=$ANDROID_HOME/tools:$PATH"
    echo ""
    echo "Then run: source ~/.bash_profile"
    exit 1
fi

echo "✓ Android SDK found at: $ANDROID_HOME"
echo ""

# Check for Android SDK tools
echo "Checking Android SDK components..."
if [ ! -f "$ANDROID_HOME/tools/bin/sdkmanager" ]; then
    echo "⚠️  Android SDK Manager not found"
    echo "Please use Android Studio to install SDK tools"
fi

echo ""
echo "✅ Android environment ready!"
echo ""
echo "Next: npm run build:android"
echo ""
