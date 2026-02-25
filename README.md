# Skin

An AI-powered skincare mobile application that provides personalized skin analysis, product recommendations, and daily routine guidance.

## Features

- **Skin Analysis**: Get insights about your skin type and concerns
- **Product Recommendations**: Receive personalized skincare product suggestions
- **Daily Routines**: Follow customized skincare routines for morning and evening
- **Profile Management**: Track your skin preferences and history

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

3. For Android:
   ```bash
   npm run android
   ```

## Deployment

### iOS
```bash
cd ios
fastlane beta  # Deploy to TestFlight
fastlane release  # Deploy to App Store
```

### Android
```bash
cd android
fastlane beta  # Deploy to Google Play Beta
fastlane release  # Deploy to Google Play Production
```

## Testing

Run tests:
```bash
npm test
```

## API Documentation

When the backend is running, visit `http://localhost:3000/api-docs` for API documentation.