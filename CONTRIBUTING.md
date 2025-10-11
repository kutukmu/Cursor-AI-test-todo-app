# Contributing to Todo App

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/ai-todo-app.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Add your feature"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions.

Quick start:
```bash
npm install
npx convex dev  # In one terminal
npm start       # In another terminal
```

## Code Style

- Use TypeScript for all new code
- Follow existing code structure
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

### ESLint
```bash
npm run lint
```

### Formatting
- 2 spaces for indentation
- Single quotes for strings
- Trailing commas in objects/arrays
- Semicolons required

## Component Guidelines

### Creating New Components
1. Place in `components/` folder
2. Use TypeScript with proper types
3. Include prop interfaces
4. Export as default
5. Use StyleSheet for styles

Example:
```typescript
interface MyComponentProps {
  title: string;
  onPress: () => void;
}

export default function MyComponent({ title, onPress }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

## Testing

Before submitting:
- [ ] Test on iOS (simulator or device)
- [ ] Test on Android (emulator or device)
- [ ] Test on Web browser
- [ ] Check all CRUD operations work
- [ ] Verify animations are smooth
- [ ] Test edge cases (empty list, long text, etc.)

## Convex Changes

When modifying backend:
1. Update schema in `convex/schema.ts`
2. Add/modify functions in `convex/todos.ts`
3. Update TypeScript types
4. Test with `npx convex dev`

## Commit Messages

Use clear, descriptive commit messages:
- ✨ `feat: Add dark mode toggle`
- 🐛 `fix: Resolve keyboard dismiss issue`
- 📝 `docs: Update setup instructions`
- 🎨 `style: Improve button styling`
- ♻️ `refactor: Simplify todo filtering logic`
- ⚡ `perf: Optimize list rendering`
- ✅ `test: Add todo item tests`

## Pull Request Process

1. Update README.md if needed
2. Update documentation
3. Add screenshots for UI changes
4. Describe your changes clearly
5. Link related issues
6. Wait for review

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test your changes

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tested on iOS
- [ ] Tested on Android
```

## Feature Requests

Have an idea? Open an issue:
1. Go to Issues tab
2. Click "New Issue"
3. Describe the feature
4. Explain use case
5. Add mockups if possible

## Bug Reports

Found a bug? Report it:
1. Check if already reported
2. Open new issue
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Device/platform
   - Screenshots/videos
   - Error messages

## Code of Conduct

- Be respectful
- Be patient
- Be collaborative
- Be constructive
- Have fun! 🚀

## Questions?

- Open an issue for discussion
- Check existing issues first
- Be specific and clear

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 💙

