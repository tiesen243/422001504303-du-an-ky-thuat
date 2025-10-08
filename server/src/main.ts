import cors from "@elysiajs/cors";
import Elysia, { sse, t } from "elysia";
import { EventEmitter, on } from "events";

type EventMap<T> = Record<keyof T, unknown[]>;
class CustomEventEmitter<T extends EventMap<T>> extends EventEmitter<T> {
  toIterable<TEventName extends keyof T>(
    eventName: TEventName,
    opts?: Parameters<typeof on>[2],
  ): AsyncIterable<T[TEventName]> {
    return on(this as never, eventName as string, opts) as AsyncIterable<
      T[TEventName]
    >;
  }
}

const ee = new CustomEventEmitter<{
  message: [string];
}>();

ee.setMaxListeners(50);

const server = new Elysia()
  .use(cors({ origin: "*" }))
  .get("/", () => "Hello, Elysia!")
  .get("/uart", async function* () {
    for await (const [message] of ee.toIterable("message")) {
      yield sse({ data: message });
    }
  })
  .post(
    "/uart",
    ({ body }) => {
      ee.emit("message", body.message);
      return { status: "Data received" };
    },
    { body: t.Object({ message: t.String() }) },
  );

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
