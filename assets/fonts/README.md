# Fonts Directory

This directory contains the font files used in the CraftNET application.

## Included Fonts

- Poppins-Regular.ttf
- Poppins-Medium.ttf
- Poppins-SemiBold.ttf
- Poppins-Bold.ttf

## Usage

These fonts are loaded in the root layout file (`app/_layout.tsx`) using Expo's `useFonts` hook.

```typescript
const [fontsLoaded] = useFonts({
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
});
```

## Font Attribution

Poppins is an open-source font available under the Open Font License.