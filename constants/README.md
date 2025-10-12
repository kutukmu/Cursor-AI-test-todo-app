# Design System Constants

This folder contains all the design system constants for the Hair Care Routine app.

## 📁 Files

### `colors.ts`
Centralized color palette and design tokens.

#### Usage Examples:

```typescript
import { Colors, Spacing, BorderRadius, Shadows } from '../constants/colors';

// Using colors
<View style={{ backgroundColor: Colors.primary.main }}>
  <Text style={{ color: Colors.neutral.white }}>Hello</Text>
</View>

// Using gradients
<LinearGradient colors={Colors.gradients.pink}>
  ...
</LinearGradient>

// Using spacing
<View style={{ padding: Spacing.md, margin: Spacing.lg }}>
  ...
</View>

// Using border radius
<View style={{ borderRadius: BorderRadius.lg }}>
  ...
</View>

// Using shadows
<View style={{ ...Shadows.md }}>
  ...
</View>

// Using semantic colors
<Text style={{ color: Colors.success.main }}>Success!</Text>
<Text style={{ color: Colors.error.main }}>Error!</Text>

// With opacity helper
import { withOpacity } from '../constants/colors';
<View style={{ backgroundColor: withOpacity(Colors.primary.main, 0.5) }}>
  ...
</View>
```

## 🎨 Color Palette Structure

- **Primary Colors**: Main brand pink colors
- **Secondary Colors**: Accent purple colors
- **Neutral Colors**: Grays, white, black
- **Semantic Colors**: Success, warning, error, info
- **Gradients**: Pre-defined gradient combinations
- **Hair Types**: Optional colors for different hair types
- **Overlay**: Semi-transparent colors
- **Shadow**: Shadow colors

## 📐 Design Tokens

- **Spacing**: Consistent spacing values (xs, sm, md, lg, xl, xxl)
- **BorderRadius**: Border radius values (sm, md, lg, xl, full)
- **FontSizes**: Typography sizes (xs to h1)
- **FontWeights**: Font weight values (light to black)
- **Shadows**: Pre-configured shadow styles (sm, md, lg, xl)

## 🎯 Best Practices

1. **Always use constants** instead of hardcoded values
2. **Update `colors.ts`** to change the entire app's appearance
3. **Use semantic colors** (success, error, warning) for consistent feedback
4. **Apply spacing consistently** using the Spacing object
5. **Use shadow presets** instead of custom shadow values

## 🔄 Updating Colors

To change the app's color scheme:
1. Edit values in `colors.ts`
2. All components using these constants will update automatically
3. No need to search and replace throughout the codebase

