# React Native Expo Go App

## Overview
This project is a React Native application designed to run on Expo Go. It includes features that connect to an API, and you can customize the app by changing the API endpoint.

## Prerequisites
Ensure you have the following tools installed:

1. **Node.js**: LTS version (https://nodejs.org/)
2. **Expo CLI**: Install via `npm install -g expo-cli`
3. **Expo Go App**: Available on Android and iOS app stores

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **If you want to use your own backend Update the API Endpoint else leave as it is:**:

   
   Navigate to `src/ApiServices/endpoint.ts`  and update the endpoint URL to point to your API:
   ```javascript
   export const mainEndpoint = "https://your-api-url.com";
   ```

5. **Start the Development Server**:
   ```bash
   npx expo start
   ```

6. **Run the App**:
   Open the Expo Go app on your device and scan the QR code displayed in your terminal or browser.

## Project Structure

- `src/` - Contains the main source code for the app.
  - `components/` - Reusable components.
  - `screens/` - Application screens.
  - `apiService/` - API configuration and services.
  - `assets/` - Images, fonts, and other static assets.

## Environment Configuration

Ensure your API endpoint is correctly configured before running the app. This is located in the file:
```
/src/apiService/endpoint.js
```

Update the `mainEndpoint` variable to your desired API URL.

## Dependencies
This project uses the following major dependencies:

- `react-native`
- `expo`
- `expo-router`
- `react-navigation`

## Scripts

- **Start the project**:
  ```bash
  npx expo start
  ```



## Troubleshooting

- **Dependency Issues**: Run `npm install` to ensure all dependencies are installed.
- **Expo Go Issues**: Make sure you are on the latest version of Expo Go.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Happy coding!

