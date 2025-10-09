import { EventEmitter, on } from 'node:events'
import cors from '@elysiajs/cors'
import Elysia, { sse, t } from 'elysia'

const server = new Elysia({ prefix: '/api' })
server.use(cors({ origin: '*', methods: '*' }))

server.get('/health', () => 'ok')

type EventMap<T> = Record<keyof T, unknown[]>
class CustomEventEmitter<T extends EventMap<T>> extends EventEmitter<T> {
  toIterable<TEventName extends keyof T>(
    eventName: TEventName,
    opts?: Parameters<typeof on>[2],
  ): AsyncIterable<T[TEventName]> {
    return on(this as never, eventName as string, opts) as AsyncIterable<
      T[TEventName]
    >
  }
}

const ee = new CustomEventEmitter<{
  message: [string]
}>()

ee.setMaxListeners(50)

server
  .get('/sse', async function* () {
    for await (const [message] of ee.toIterable('message')) {
      console.log('Sending message:', message)
      yield sse({ data: message })
    }
  })
  .post(
    '/sse',
    ({ body }) => {
      const { message } = body as { message: string }
      console.log('Received message:', message)
      ee.emit('message', message)
      return { message: 'Message sent' }
    },
    { body: t.Object({ message: t.String() }) },
  )

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
