#!/bin/bash

# iOS Setup Script
# This script prepares your environment for iOS building

echo "🍎 iOS Build Setup"
echo "=================="
echo ""

# Check for Xcode
echo "Checking Xcode..."
if ! xcode-select -p &> /dev/null; then
    echo "❌ Xcode Command Line Tools not found"
    echo "Please install: xcode-select --install"
    exit 1
fi

echo "✓ Xcode found"
echo ""

# Check CocoaPods
echo "Checking CocoaPods..."
if ! command -v pod &> /dev/null; then
    echo "Installing CocoaPods..."
    sudo gem install cocoapods
fi

echo "✓ CocoaPods ready"
echo ""

# Install pods
echo "Installing iOS dependencies..."
cd ios
pod install
cd ..

echo ""
echo "✅ iOS setup complete!"
echo ""
echo "Next: npm run build:ios"
echo ""
