import cors from "@elysiajs/cors";
import Elysia, { sse, t } from "elysia";
import staticPlugin from "@elysiajs/static";

import { IterableEventEmitter } from "@/lib/event-emitter";

const ee = new IterableEventEmitter<{
  message: [string];
}>();

const server = new Elysia()
  .use(cors({ origin: "*" }))
  .use(staticPlugin({ prefix: "/" }))
  .get("/api/stream", async function* () {
    for await (const [message] of ee.toIterable("message")) {
      yield sse({ event: "message", data: message });
    }
  })
  .post(
    "/api/send",
    ({ body: { message } }) => {
      ee.emit("message", message);
      return { status: "ok" };
    },
    { body: t.Object({ message: t.String() }) },
  );

server.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at ${server.server?.hostname}:${server.server?.port}`,
  );
});
