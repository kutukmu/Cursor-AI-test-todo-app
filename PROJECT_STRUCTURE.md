# 📁 Project Structure

Complete overview of the todo app architecture.

## Directory Tree

```
ai-todo-app/
├── 📱 app/                          # Expo Router pages
│   ├── _layout.tsx                 # Root layout with Convex Provider
│   └── index.tsx                   # Main todo screen
│
├── 🎨 components/                   # Reusable React components
│   ├── AddTodo.tsx                 # Input to add new todos
│   ├── TodoItem.tsx                # Individual todo with gestures
│   └── TodoStats.tsx               # Statistics dashboard
│
├── 🗄️ convex/                       # Backend (Database & API)
│   ├── schema.ts                   # Database schema definition
│   ├── todos.ts                    # Queries & Mutations
│   └── tsconfig.json               # Convex TypeScript config
│
├── 🖼️ assets/                       # Images, icons, fonts
│   └── README.md                   # Asset requirements guide
│
├── 📝 docs/                         # Additional documentation
│   └── readme.md                   # Detailed documentation
│
├── 🔧 scripts/                      # Utility scripts
│   └── reset-project.js            # Project reset utility
│
├── 📦 types/                        # TypeScript type definitions
│   └── index.ts                    # Shared types
│
├── ⚙️ Configuration Files
│   ├── app.json                    # Expo configuration
│   ├── babel.config.js             # Babel configuration
│   ├── metro.config.js             # Metro bundler config
│   ├── tsconfig.json               # TypeScript configuration
│   ├── .eslintrc.js                # ESLint rules
│   ├── .prettierrc                 # Prettier formatting
│   └── .gitignore                  # Git ignore rules
│
├── 📄 Dependencies
│   ├── package.json                # NPM dependencies
│   └── package-lock.json           # Locked versions (auto-generated)
│
└── 📚 Documentation
    ├── README.md                   # Main documentation
    ├── QUICKSTART.md              # 5-minute setup guide
    ├── SETUP.md                   # Detailed setup instructions
    ├── FEATURES.md                # Feature list & roadmap
    ├── CONTRIBUTING.md            # Contribution guidelines
    └── PROJECT_STRUCTURE.md       # This file
```

## Key Files Explained

### Application Core

**`app/_layout.tsx`**
- Root component
- Wraps app with ConvexProvider
- Initializes Gesture Handler
- Sets up navigation

**`app/index.tsx`**
- Main screen
- Orchestrates all components
- Manages filter state
- Handles Convex mutations

### Components

**`components/AddTodo.tsx`**
- Input field for new todos
- Submit button with animation
- Keyboard management
- Haptic feedback

**`components/TodoItem.tsx`**
- Displays individual todo
- Swipe-to-delete gesture
- Long-press-to-edit
- Checkbox toggle
- Delete button

**`components/TodoStats.tsx`**
- Statistics cards
- Real-time calculations
- Animated appearance

### Backend (Convex)

**`convex/schema.ts`**
```typescript
todos: {
  text: string
  isCompleted: boolean
  createdAt: number
}
```

**`convex/todos.ts`**
- `getTodos`: Query all todos
- `addTodo`: Create new todo
- `toggleTodo`: Mark complete/incomplete
- `updateTodo`: Edit todo text
- `deleteTodo`: Remove todo
- `clearCompleted`: Bulk delete

### Configuration

**`app.json`**
- App name, version, icon
- Platform-specific settings
- Plugin configuration

**`tsconfig.json`**
- Strict type checking
- Path aliases (@/*)
- Expo preset

**`babel.config.js`**
- Expo preset
- Reanimated plugin (MUST be last)

## Data Flow

```
User Action
    ↓
Component Handler
    ↓
Convex Mutation/Query
    ↓
Convex Backend (Cloud)
    ↓
Real-time Update
    ↓
All Subscribed Clients
    ↓
UI Updates (Automatic)
```

## State Management

### Local State (React)
- Filter selection (all/active/completed)
- Edit mode for todos
- Input text for new todos

### Server State (Convex)
- All todo data
- Automatically synced
- Optimistic updates
- Real-time subscriptions

## Styling Approach

- **StyleSheet**: React Native StyleSheet API
- **Inline Styles**: For dynamic values
- **No CSS Frameworks**: Pure RN styling
- **Consistent Design**: Unified color palette

### Design System

```typescript
Colors:
- Primary: #667eea
- Secondary: #764ba2
- Accent: #f093fb
- White: #ffffff
- Text: #333333
- Gray: #999999

Spacing:
- Small: 8px
- Medium: 16px
- Large: 24px

Border Radius:
- Small: 12px
- Medium: 16px
- Large: 20px
```

## Performance Optimizations

1. **FlatList** for efficient list rendering
2. **React.memo** for component memoization (can add)
3. **useCallback** for stable callbacks (can add)
4. **Reanimated** for UI-thread animations
5. **Convex** for optimistic updates

## Navigation

Using **Expo Router** (file-based):
- `app/index.tsx` → `/` route
- `app/_layout.tsx` → Root layout

Future routes could be:
- `app/settings.tsx` → `/settings`
- `app/categories/[id].tsx` → `/categories/:id`

## Build & Deployment

### Development
```bash
npm start              # Start dev server
npm run android        # Android
npm run ios            # iOS
npm run web            # Web
```

### Production (Future)
```bash
eas build --platform ios       # iOS build
eas build --platform android   # Android build
eas submit                     # Submit to stores
```

## Testing Strategy (Future)

```
tests/
├── unit/              # Component tests
├── integration/       # Feature tests
└── e2e/              # End-to-end tests
```

## Environment Variables

```bash
# .env.local (auto-generated by Convex)
EXPO_PUBLIC_CONVEX_URL=https://xxx.convex.cloud

# Future additions:
# EXPO_PUBLIC_API_KEY=xxx
# EXPO_PUBLIC_ANALYTICS_ID=xxx
```

## Dependencies Overview

### Core
- **react**: UI library
- **react-native**: Mobile framework
- **expo**: Development platform

### Navigation
- **expo-router**: File-based routing
- **@react-navigation/***: Navigation primitives

### Backend
- **convex**: Real-time database & API

### UI/UX
- **expo-linear-gradient**: Gradient backgrounds
- **expo-haptics**: Haptic feedback
- **react-native-reanimated**: Smooth animations
- **react-native-gesture-handler**: Touch gestures

### Storage
- **@react-native-async-storage/async-storage**: Local storage

### Dev Tools
- **typescript**: Type safety
- **eslint**: Code linting

## Adding New Features

### New Component
1. Create in `components/NewComponent.tsx`
2. Define TypeScript interface for props
3. Use StyleSheet for styles
4. Export as default

### New Backend Function
1. Add to `convex/todos.ts`
2. Use `query` or `mutation`
3. Define args with validators
4. Update types if needed

### New Page
1. Create in `app/newpage.tsx`
2. Auto-routes to `/newpage`
3. Add to navigation if needed

## Code Organization

### Principles
- **Single Responsibility**: One component, one job
- **DRY**: Don't repeat yourself
- **Type Safety**: TypeScript everywhere
- **Modular**: Easy to add/remove features
- **Documented**: Comments for complex logic

### File Naming
- Components: PascalCase (TodoItem.tsx)
- Utilities: camelCase (formatDate.ts)
- Types: PascalCase (TodoTypes.ts)
- Constants: UPPER_SNAKE_CASE

## Git Workflow

```bash
main (production)
  ↓
develop (integration)
  ↓
feature/* (new features)
  ↓
bugfix/* (fixes)
```

## Resources

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Convex Docs](https://docs.convex.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

---

Built with ❤️ using modern React Native best practices

