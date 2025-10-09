import '@/globals.css'

import { useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HeroUINativeProvider, useTheme } from 'heroui-native'

import { ToggleTheme } from '@/components/toggle-theme'
import { useGeistFont } from '@/hooks/use-geist-font'
import { shadcnTheme } from '@/lib/theme'

const queryClient = new QueryClient()

function App() {
  const { theme } = useTheme()

  const _renderToggleTheme = useCallback(() => <ToggleTheme />, [])

  return (
    <Stack
      screenOptions={{
        headerTitle: '422001504303 - Dự án kỹ thuật',
        headerRight: _renderToggleTheme,
        headerStyle: { backgroundColor: shadcnTheme[theme].colors.panel },
        headerTintColor: shadcnTheme[theme].colors.foreground,
        headerTitleStyle: { fontFamily: 'Geist-Semibold' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}

export default function RootLayout() {
  const [loaded, error] = useGeistFont()

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync()
  }, [loaded, error])

  if (!loaded || error) return null

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView className='flex-1'>
        <KeyboardProvider>
          <HeroUINativeProvider
            config={{
              textProps: { allowFontScaling: false },
              theme: shadcnTheme,
            }}
          >
            <App />
            <StatusBar style='auto' />
          </HeroUINativeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
