# Quick Setup Guide

Follow these steps to get your todo app running:

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Convex Backend

### Option A: Using Convex CLI (Recommended)

```bash
# Install Convex CLI globally
npm install -g convex

# Initialize Convex (this will prompt you to login/signup)
npx convex dev
```

This will:
- Open Convex dashboard in your browser
- Create a new project
- Generate `.env.local` with your deployment URL
- Start the Convex development server

### Option B: Manual Setup

1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Create a new project
3. Copy your deployment URL
4. Create `.env.local` file:
   ```
   EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
   ```
5. Run `npx convex dev` to push schema and functions

## 3. Start Expo Development Server

In a new terminal window:

```bash
npm start
```

## 4. Run the App

Choose your platform:

### Mobile (Recommended for best experience)
- Install "Expo Go" app on your phone
- Scan the QR code shown in terminal

### iOS Simulator (macOS only)
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web Browser
```bash
npm run web
```

## Troubleshooting

### "Cannot find module 'convex'"
- Run `npm install` again
- Make sure all dependencies installed correctly

### "Convex client error"
- Check that `.env.local` exists with correct URL
- Make sure `npx convex dev` is running
- Restart expo server: `npx expo start -c`

### Metro bundler issues
```bash
# Clear cache and restart
npx expo start -c
```

### iOS build issues
```bash
cd ios && pod install && cd ..
npm run ios
```

## Next Steps

Once running:
1. Try adding a todo
2. Toggle completion status
3. Swipe left to delete
4. Long press to edit
5. Test the filters (All/Active/Completed)

## Development Tips

- Keep `npx convex dev` running in one terminal
- Run `npm start` in another terminal
- Use `r` in Expo terminal to reload
- Use `m` to toggle menu
- Use `shift+m` to select device/simulator

Enjoy building! 🚀

