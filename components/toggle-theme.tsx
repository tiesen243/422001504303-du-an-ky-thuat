import { Pressable } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useTheme } from 'heroui-native'
import { MoonIcon, SunIcon } from 'lucide-react-native'

import { shadcnTheme } from '@/lib/theme'

export const ToggleTheme: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Pressable className='px-4' onPress={toggleTheme}>
      {theme === 'dark' ? (
        <Animated.View key='moon' entering={FadeIn}>
          <MoonIcon color={shadcnTheme.dark.colors.foreground} size={20} />
        </Animated.View>
      ) : (
        <Animated.View key='sun' entering={FadeIn}>
          <SunIcon color={shadcnTheme.light.colors.foreground} size={20} />
        </Animated.View>
      )}
    </Pressable>
  )
}
