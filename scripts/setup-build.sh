#!/bin/bash

# Toto AI - Build Setup Script
# This script sets up your environment for building iOS and Android apps

echo "🚀 Toto AI Build Setup"
echo "======================="
echo ""

# Check Node.js
echo "✓ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi
echo "  Node.js version: $(node -v)"

# Check npm
echo "✓ Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "  npm version: $(npm -v)"

# Install EAS CLI
echo ""
echo "📦 Installing EAS CLI..."
npm install -g eas-cli@latest

# Install dependencies
echo ""
echo "📦 Installing project dependencies..."
npm install

# Check for Xcode (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo ""
    echo "✓ Checking Xcode installation..."
    if ! xcode-select -p &> /dev/null; then
        echo "⚠️  Xcode Command Line Tools not found. Installing..."
        xcode-select --install
    else
        echo "  Xcode found at: $(xcode-select -p)"
    fi
    
    # Check for CocoaPods
    echo ""
    echo "✓ Checking CocoaPods..."
    if ! command -v pod &> /dev/null; then
        echo "📦 Installing CocoaPods..."
        sudo gem install cocoapods
    else
        echo "  CocoaPods version: $(pod --version)"
    fi
fi

# Check for Android Studio / Android SDK
echo ""
echo "✓ Checking Android SDK..."
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME not set. Please configure Android SDK path."
    echo "   Instructions: https://expo.io/learn#android-development-environment"
else
    echo "  Android SDK path: $ANDROID_HOME"
fi

# EAS Login
echo ""
echo "🔐 Logging in to EAS..."
eas login

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm run build:ios  (for iOS)"
echo "2. Run: npm run build:android  (for Android)"
echo "3. Run: npm run build:all  (for both)"
echo ""
