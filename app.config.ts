import fs from 'node:fs'
import path from 'node:path'
import type { ConfigContext, ExpoConfig } from 'expo/config'

import packageJson from './package.json'

export default ({ config }: ConfigContext): ExpoConfig => {
  const fontDirs = ['./assets/fonts/Geist', './assets/fonts/GeistMono']
  const fonts = fontDirs.flatMap((dir) =>
    fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.ttf') || file.endsWith('.otf'))
      .map((file) => path.join(dir, file)),
  )

  return {
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
      package: `com.nhom4.${packageJson.name.replace(/-/g, '')}`,
      edgeToEdgeEnabled: true,
    },

    ios: {
      bundleIdentifier: `com.nhom4.${packageJson.name.replace(/-/g, '')}`,
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
      ['expo-font', { fonts }],
      [
        'expo-splash-screen',
        {
          backgroundColor: '#ffffff',
          dark: { backgroundColor: '#0a0a0a' },
        },
      ],
    ],
  }
}
