# 📝 AI Todo App

A beautiful, modern todo application built with React Native, Expo, and Convex for real-time data synchronization.

## ✨ Features

- ✅ Create, read, update, and delete todos
- 🔄 Real-time sync across devices with Convex
- 📊 Statistics dashboard showing total, active, and completed tasks
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Cross-platform support (iOS, Android, Web)
- 🎯 Filter tasks by All, Active, or Completed
- ✏️ Long press to edit todos
- 👆 Swipe left to delete
- 🎉 Haptic feedback for better UX

## 🛠️ Tech Stack

- **React Native** 0.81.4 - Mobile framework
- **Expo** ~54.0.12 - Development platform
- **Convex** ^1.27.3 - Real-time backend & database
- **TypeScript** ~5.9.2 - Type safety
- **Expo Router** ~6.0.10 - File-based routing
- **Reanimated** ~4.1.1 - Smooth animations
- **Gesture Handler** ~2.28.0 - Touch gestures

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   
   a. Create a Convex account at [convex.dev](https://convex.dev)
   
   b. Install Convex CLI globally:
   ```bash
   npm install -g convex
   ```
   
   c. Initialize Convex in your project:
   ```bash
   npx convex dev
   ```
   
   d. This will:
      - Create a new Convex project
      - Generate your deployment URL
      - Set up the `.env.local` file with your `EXPO_PUBLIC_CONVEX_URL`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator
   - Or press `w` for web browser

## 📁 Project Structure

```
ai-todo-app/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with Convex provider
│   └── index.tsx          # Main todo screen
├── components/            # React components
│   ├── AddTodo.tsx       # Add new todo component
│   ├── TodoItem.tsx      # Individual todo item
│   └── TodoStats.tsx     # Statistics dashboard
├── convex/               # Convex backend
│   ├── schema.ts        # Database schema
│   ├── todos.ts         # Todo queries & mutations
│   └── tsconfig.json    # Convex TypeScript config
├── docs/                # Documentation
├── app.json            # Expo configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript configuration
```

## 🎮 Usage

### Adding a Todo
1. Type your task in the input field
2. Press "Add" or hit enter

### Completing a Todo
- Tap the checkbox next to the task

### Editing a Todo
- Long press on the task text to enter edit mode
- Make your changes and press done

### Deleting a Todo
- Tap the trash icon, OR
- Swipe left on the task

### Filtering Tasks
- Use the "All", "Active", or "Completed" buttons to filter

### Clearing Completed
- Use the "Clear Completed" button at the bottom to remove all completed tasks

## 🎨 Customization

### Colors
Edit the gradient colors in `app/index.tsx`:
```typescript
<LinearGradient
  colors={["#667eea", "#764ba2", "#f093fb"]} // Change these!
  style={styles.container}
>
```

### Database Schema
Modify the Convex schema in `convex/schema.ts` to add new fields:
```typescript
todos: defineTable({
  text: v.string(),
  isCompleted: v.boolean(),
  createdAt: v.number(),
  // Add your custom fields here
})
```

## 🧪 Development

### Run Linter
```bash
npm run lint
```

### Reset Project
```bash
npm run reset-project
```

## 📱 Platform-Specific Commands

```bash
npm run android    # Run on Android
npm run ios        # Run on iOS  
npm run web        # Run on web browser
```

## 🔧 Environment Variables

Create a `.env.local` file (automatically created by Convex):
```
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

## 🐛 Troubleshooting

### Convex not connecting
- Make sure you ran `npx convex dev`
- Check that `.env.local` exists with your `EXPO_PUBLIC_CONVEX_URL`
- Restart the Expo development server

### App not loading
- Clear Expo cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Animations not smooth
- Make sure you have Reanimated properly installed
- Try running on a physical device instead of simulator

## 📝 License

MIT License - feel free to use this project for learning or production!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🌟 Acknowledgments

- Built with ❤️ using React Native & Expo
- Real-time magic powered by Convex
- UI inspiration from modern design principles

---

**Happy task managing! 🎉**

