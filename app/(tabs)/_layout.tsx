import * as React from 'react'
import { withLayoutContext } from 'expo-router'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import { useTheme } from 'heroui-native'

import { shadcnTheme } from '@/lib/theme'

const { Navigator } = createMaterialTopTabNavigator()

const Tabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

export default function TabsLayout() {
  const { theme } = useTheme()

  return (
    <Tabs
      id={undefined}
      screenOptions={{
        sceneStyle: { backgroundColor: shadcnTheme[theme].colors.background },
        tabBarStyle: { backgroundColor: shadcnTheme[theme].colors.panel },
        tabBarActiveTintColor: shadcnTheme[theme].colors.foreground,
      }}
    >
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='testing' options={{ title: 'Testing' }} />
      <Tabs.Screen name='sensor' options={{ title: 'Sensor' }} />
    </Tabs>
  )
}
