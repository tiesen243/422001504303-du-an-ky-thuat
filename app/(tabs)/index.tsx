import { Text, View } from 'react-native'
import { Card, useTheme } from 'heroui-native'
import { FlaskConicalIcon, SatelliteIcon } from 'lucide-react-native'

import { shadcnTheme } from '@/lib/theme'

export default function IndexScreen() {
  const { theme } = useTheme()

  return (
    <View className='container flex-1 py-4'>
      <View className='mb-10'>
        <Text className='font-[Geist-Regular] text-muted-foreground'>
          Real-time data streaming & testing
        </Text>
      </View>

      <View className='grid flex-1 gap-4 md:grid-cols-2'>
        <Card>
          <Card.Body>
            <Card.Header>
              <FlaskConicalIcon
                color={shadcnTheme[theme].colors.foreground}
                size={24}
              />
            </Card.Header>
            <Card.Title>Connection Testing</Card.Title>
            <Card.Description className='text-muted-foreground'>
              Test and verify your SSE connection status
            </Card.Description>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Header>
              <SatelliteIcon
                color={shadcnTheme[theme].colors.foreground}
                size={24}
              />
            </Card.Header>
            <Card.Title>Sensor Data</Card.Title>
            <Card.Description className='text-muted-foreground'>
              View real-time sensor readings from SSE stream
            </Card.Description>
          </Card.Body>
        </Card>
      </View>

      <View className='items-center py-6'>
        <View className='flex-row items-center gap-2'>
          <View className='h-2 w-2 rounded-full bg-success' />
          <Text className='text-sm text-muted-foreground'>
            Ready to connect
          </Text>
        </View>
      </View>
    </View>
  )
}
