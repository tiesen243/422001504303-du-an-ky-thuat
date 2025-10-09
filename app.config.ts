import type { ConfigContext, ExpoConfig } from 'expo/config'

import packageJson from './package.json'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: packageJson.name,
  slug: packageJson.name,
  version: packageJson.version,
  scheme: packageJson.name.replace(/-/g, ''),

  newArchEnabled: true,
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  updates: {
    fallbackToCacheTimeout: 0,
  },

  android: {
    package: `com.nhom4.${packageJson.name.replace(/[0-9-]/g, '')}`,
    edgeToEdgeEnabled: true,
  },

  ios: {
    bundleIdentifier: `com.nhom4.${packageJson.name.replace(/[0-9-]/g, '')}`,
    supportsTablet: true,
  },

  web: {
    bundler: 'metro',
    output: 'server',
  },

  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },

  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#ffffff',
        dark: { backgroundColor: '#0a0a0a' },
      },
    ],
  ],

  extra: {
    eas: {
      projectId: 'cd4741d2-021e-4846-8934-df5af138bd4e',
    },
  },
})
