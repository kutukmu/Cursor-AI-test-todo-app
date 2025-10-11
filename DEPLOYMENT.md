# 🚀 Deployment Guide

How to deploy your todo app to production.

## Convex Production Deployment

### 1. Deploy Convex Backend

```bash
# Deploy to production
npx convex deploy

# This will:
# - Create a production deployment
# - Give you a production URL
# - Deploy all your functions
```

### 2. Update Environment Variable

After deploying, update your production URL:

```bash
# In your .env.local or expo config
EXPO_PUBLIC_CONVEX_URL=https://your-production.convex.cloud
```

## Mobile App Deployment (EAS)

### Prerequisites

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login
```

### iOS Deployment

```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

Requirements:
- Apple Developer Account ($99/year)
- iOS certificates
- App Store Connect setup

### Android Deployment

```bash
# Build for Android
eas build --platform android

# Submit to Play Store
eas submit --platform android
```

Requirements:
- Google Play Developer Account ($25 one-time)
- Keystore
- Play Console setup

### Build Configuration

Create `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_CONVEX_URL": "https://your-production.convex.cloud"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## Web Deployment

### Option 1: Netlify

```bash
# Build for web
npx expo export --platform web

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir web-build
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 3: GitHub Pages

```bash
# Build
npx expo export --platform web

# Deploy to GitHub Pages
# (Use gh-pages or manual upload)
```

## Environment Variables

### Development
```
EXPO_PUBLIC_CONVEX_URL=https://dev.convex.cloud
```

### Production
```
EXPO_PUBLIC_CONVEX_URL=https://prod.convex.cloud
```

### Setting in EAS

```bash
eas secret:create --name EXPO_PUBLIC_CONVEX_URL --value https://prod.convex.cloud
```

## Pre-deployment Checklist

- [ ] All features tested
- [ ] No console errors
- [ ] Performance optimized
- [ ] Icons & splash screen added
- [ ] App name finalized
- [ ] Bundle ID set (iOS/Android)
- [ ] Convex production deployed
- [ ] Environment variables set
- [ ] Privacy policy written (if needed)
- [ ] App store assets prepared

## App Store Assets

### iOS App Store
- App icon (1024x1024)
- Screenshots (various sizes)
- App preview video (optional)
- Description & keywords
- Support URL
- Privacy policy URL

### Google Play Store
- Feature graphic (1024x500)
- App icon (512x512)
- Screenshots (various sizes)
- Promo video (optional)
- Short description (80 chars)
- Full description (4000 chars)

## Continuous Deployment

### GitHub Actions (Example)

```yaml
name: EAS Build
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: eas build --platform all --non-interactive
```

## Monitoring

### Error Tracking
- Sentry
- Bugsnag
- Firebase Crashlytics

### Analytics
- Google Analytics
- Mixpanel
- Amplitude

## Updates (OTA)

Expo supports over-the-air updates:

```bash
# Publish update
eas update --branch production --message "Fixed bug"
```

Users get updates without app store approval!

## Testing Before Release

### TestFlight (iOS)
```bash
eas build --platform ios --profile preview
```

Share with beta testers via TestFlight

### Internal Testing (Android)
```bash
eas build --platform android --profile preview
```

Share APK or upload to Play Console internal testing

## Production URLs

After deployment, you'll have:
- **iOS**: https://apps.apple.com/app/your-app
- **Android**: https://play.google.com/store/apps/details?id=com.todo.app
- **Web**: https://your-domain.com

## Rollback

If something goes wrong:

```bash
# Convex
npx convex rollback

# EAS Update
eas update --branch production --message "Rollback" --republish
```

## Cost Estimates

### Free Tier (Development)
- Convex: Free tier (generous)
- Expo: Free
- Netlify/Vercel: Free tier available

### Production (Paid)
- Convex: ~$25/month (after free tier)
- Apple Developer: $99/year
- Google Play: $25 one-time
- Hosting: $0-20/month

## Support & Maintenance

- Monitor error reports
- Update dependencies regularly
- Respond to user reviews
- Add requested features
- Fix bugs promptly

## Resources

- [EAS Docs](https://docs.expo.dev/eas/)
- [Convex Deployment](https://docs.convex.dev/production/deployments)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Play Store Guidelines](https://play.google.com/console/about/guides/play-policy/)

---

Good luck with your launch! 🎉

