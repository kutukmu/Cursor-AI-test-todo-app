# 🔐 Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for your Todo app.

## Prerequisites

- A Clerk account (free tier available)
- Your app already has Convex set up

## Step 1: Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

## Step 2: Configure Clerk Application

### In Clerk Dashboard:

1. **Go to your application settings**
2. **Enable Google OAuth:**
   - Navigate to "User & Authentication" → "Social Connections"
   - Enable "Google"
   - Follow the prompts to set up Google OAuth

3. **Get your Publishable Key:**
   - Go to "API Keys"
   - Copy your "Publishable key" (starts with `pk_test_` or `pk_live_`)

4. **Configure Redirect URLs:**
   - Go to "Paths" → "Component paths"
   - Add your app's redirect URL:
     - For development: `exp://localhost:8081` (Expo default)
     - For production: Your app's custom scheme

## Step 3: Install Dependencies

```bash
npm install
```

This will install:
- `@clerk/clerk-expo` - Clerk SDK for Expo
- `expo-secure-store` - Secure token storage
- `expo-web-browser` - For OAuth flows

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root:

```bash
# Convex
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

2. Replace `pk_test_your_key_here` with your actual Clerk publishable key

## Step 5: Configure App.json (Optional)

For better deep linking support, add a custom scheme:

```json
{
  "expo": {
    "scheme": "myapp",
    "ios": {
      "bundleIdentifier": "com.yourdomain.todoapp"
    },
    "android": {
      "package": "com.yourdomain.todoapp"
    }
  }
}
```

## Step 6: Run Your App

```bash
# Clear cache and restart
npx expo start -c
```

## How It Works

### Authentication Flow:

1. **Welcome Screen** (`app/welcome.tsx`)
   - First screen users see when not authenticated
   - "Sign in with Google" button
   - Beautiful gradient UI matching your theme

2. **Protected Routes**
   - Main todo screen is automatically protected
   - Users must be authenticated to access
   - Redirects to welcome if not signed in

3. **User Info**
   - User's first name displayed in header
   - "Welcome, [Name]!" personalization

4. **Sign Out**
   - 👋 button in top-right corner
   - Securely signs out and returns to welcome screen

### Security Features:

- ✅ Secure token storage with expo-secure-store
- ✅ OAuth flow handled by Clerk
- ✅ Automatic session management
- ✅ Protected routes
- ✅ Token refresh handling

## Troubleshooting

### "Invalid publishable key"
- Make sure your `.env.local` file exists
- Verify the key starts with `pk_test_` or `pk_live_`
- Restart your Expo dev server: `npx expo start -c`

### OAuth redirect not working
- Check your redirect URLs in Clerk dashboard
- Make sure you're using the correct scheme
- For development, try: `exp://localhost:8081`

### "Module not found: @clerk/clerk-expo"
```bash
npm install
npx expo start -c
```

### Sign in button does nothing
- Check console for errors
- Verify Google OAuth is enabled in Clerk dashboard
- Ensure you have internet connection

## Testing Authentication

1. **Start the app** - You should see the welcome screen
2. **Click "Sign in with Google"** - OAuth flow should open
3. **Complete sign in** - You should be redirected to the todo app
4. **Check header** - Should show "Welcome, [Your Name]!"
5. **Click 👋 button** - Should sign you out and return to welcome

## Production Deployment

### Before deploying:

1. **Switch to production keys:**
   - In Clerk dashboard, switch to "Production" mode
   - Copy your production publishable key (`pk_live_...`)
   - Update your environment variables

2. **Configure production domains:**
   - Add your production redirect URLs
   - Update OAuth settings

3. **Test thoroughly:**
   - Test sign in/sign out flow
   - Verify protected routes work
   - Check user data persistence

## Additional OAuth Providers

You can add more sign-in options:

### Apple Sign In
```tsx
const { startOAuthFlow: startAppleOAuth } = useOAuth({ 
  strategy: "oauth_apple" 
});
```

### GitHub Sign In
```tsx
const { startOAuthFlow: startGitHubOAuth } = useOAuth({ 
  strategy: "oauth_github" 
});
```

Just enable them in your Clerk dashboard first!

## Support

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Expo Guide](https://clerk.com/docs/quickstarts/expo)
- [Clerk Discord](https://clerk.com/discord)

---

**Your app is now secured with Clerk! 🎉**

