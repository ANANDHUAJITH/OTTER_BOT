# OTTER_BOT - Android App Setup (No Android Studio Required)

This guide shows how to create an Android APK from the OTTER_BOT PWA without using Android Studio.

## Option 1: Direct PWA Install (Easiest)

1. **Deploy your app** to Vercel or any hosting service
2. **Open Chrome** on your Android device
3. **Navigate** to your deployed URL
4. **Tap the "Install OTTER_BOT App" button** that appears, or use Chrome menu → "Add to Home Screen"
5. The app will install with full-screen landscape mode

## Option 2: PWABuilder (Generate APK Online)

1. **Deploy your app** to a public URL (Vercel recommended)

2. **Go to** [https://www.pwabuilder.com](https://www.pwabuilder.com)

3. **Enter your URL** and click "Start"

4. **Click "Package for stores"** → Select "Android"

5. **Choose options:**
   - Package format: APK (for sideloading) or AAB (for Play Store)
   - Signing: Let PWABuilder sign it or provide your own keystore

6. **Download the APK** and install on your device

## Option 3: Bubblewrap CLI (Command Line)

### Prerequisites
- Node.js 14+
- Java JDK 8+

### Steps

\`\`\`bash
# Install Bubblewrap globally
npm install -g @anthropic/pwabuilder-cli

# Initialize project (run in your project folder after deploying)
npx @anthropic/pwabuilder-cli build --manifest https://your-deployed-url.vercel.app/manifest.json

# Follow prompts to configure:
# - Package name: com.crob.otterbot
# - App name: OTTER_BOT
# - Launcher name: OTTER_BOT
# - Display mode: fullscreen
# - Orientation: landscape

# The APK will be generated in the output folder
\`\`\`

## Option 4: Trusted Web Activity (TWA) with Gradle CLI

If you prefer command-line Android building:

\`\`\`bash
# Install Android command-line tools (no Android Studio)
# Download from: https://developer.android.com/studio#command-tools

# Set up environment
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# Accept licenses
sdkmanager --licenses

# Install required packages
sdkmanager "platforms;android-33" "build-tools;33.0.0"

# Clone TWA template and build
# (PWABuilder handles this automatically in Option 2)
\`\`\`

## Testing the APK

### Enable Unknown Sources
1. Go to Settings → Security
2. Enable "Install from unknown sources" or "Install unknown apps"

### Install APK
\`\`\`bash
# Using ADB (if you have it)
adb install otter-bot.apk

# Or just tap the APK file on your device
\`\`\`

## Features Working in PWA Mode

- ✅ Full-screen landscape mode
- ✅ Haptic feedback (vibration)
- ✅ Offline support (service worker)
- ✅ Home screen icon
- ✅ Splash screen
- ✅ All controller functionality

## Recommended: Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Use the deployed URL for PWABuilder
\`\`\`

## Troubleshooting

**PWA not installable?**
- Ensure HTTPS is enabled (Vercel does this automatically)
- Check manifest.json is accessible at /manifest.json
- Verify service worker is registered

**Orientation not locking?**
- Some browsers require user gesture first
- Tap anywhere on the screen to trigger fullscreen + landscape lock

**Haptics not working?**
- Ensure site is served over HTTPS
- Check browser supports Vibration API

---

Developed by Anandhu for CROB
