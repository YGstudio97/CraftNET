# Components Directory

This directory contains reusable components for the CraftNET application.

## Component Structure

Each component should be organized in its own directory with the following structure:

```
ComponentName/
  ├── index.tsx       # Main component file
  ├── styles.ts       # Component styles
  └── types.ts        # TypeScript interfaces and types
```

## Best Practices

1. Keep components focused on a single responsibility
2. Use TypeScript for type safety
3. Implement proper error handling
4. Make components responsive for different screen sizes
5. Document props and usage
6. Test components thoroughly

## Example Component

```typescript
// Button/index.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { ButtonProps } from './types';

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        styles[variant],
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
```