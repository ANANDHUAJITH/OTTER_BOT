# OTTER_BOT - Capacitor Android Setup

## Prerequisites
- Node.js 18+
- Android Studio (with SDK 33+)
- Java 17+

## Installation Steps

### 1. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Initialize Capacitor (first time only)
\`\`\`bash
npx cap init "OTTER_BOT" "com.crob.otterbot" --web-dir=out
\`\`\`

### 3. Add Android platform
\`\`\`bash
npx cap add android
\`\`\`

### 4. Build and sync
\`\`\`bash
npm run export
npx cap sync
\`\`\`

### 5. Open in Android Studio
\`\`\`bash
npx cap open android
\`\`\`

## Quick Build Command
Run everything at once:
\`\`\`bash
npm run android
\`\`\`

## Android Configuration

### Set Landscape Only
Edit `android/app/src/main/AndroidManifest.xml`:
\`\`\`xml
<activity
    android:screenOrientation="landscape"
    android:configChanges="orientation|screenSize"
    ...
>
\`\`\`

### Full Screen (Hide Status/Nav bars)
Already configured via Capacitor StatusBar plugin.

### App Icon
Replace these files in `android/app/src/main/res/`:
- `mipmap-hdpi/ic_launcher.png` (72x72)
- `mipmap-mdpi/ic_launcher.png` (48x48)
- `mipmap-xhdpi/ic_launcher.png` (96x96)
- `mipmap-xxhdpi/ic_launcher.png` (144x144)
- `mipmap-xxxhdpi/ic_launcher.png` (192x192)

### Splash Screen
Place your splash image at:
`android/app/src/main/res/drawable/splash.png`

## Building APK

### Debug APK
\`\`\`bash
cd android
./gradlew assembleDebug
\`\`\`
APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK
\`\`\`bash
cd android
./gradlew assembleRelease
\`\`\`

## Troubleshooting

### White screen on Android
- Run `npx cap sync` after any code changes
- Check that `out/` folder exists after `npm run export`

### Capacitor plugins not working
\`\`\`bash
npx cap sync android
\`\`\`

### Build errors
\`\`\`bash
cd android
./gradlew clean
cd ..
npx cap sync
