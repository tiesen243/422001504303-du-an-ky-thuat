import * as React from "react";
import z from "zod";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { useForm } from "~/hooks/use-form";

export const TestUart = () => {
  const form = useForm({
    defaultValues: { endpoint: "/api/send", speed: 1000, numBytes: 10 },
    schema: z.object({
      endpoint: z.string().min(1, "Endpoint is required"),
      speed: z.number().min(10).max(10000),
      numBytes: z.number().min(1).max(1000),
    }),
    async onSubmit(data) {
      setSentBytes(0);
      setReceivedBytes(0);
      setErrorCount(0);

      for (let i = 0; i < data.numBytes; i++) {
        setSentBytes((prev) => prev + 1);

        try {
          const response = await fetch(data.endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: Math.floor(Math.random() * 256).toString(),
            }),
          });

          if (!response.ok) throw new Error("Network response was not ok");
          setReceivedBytes((prev) => prev + 1);
        } catch (error) {
          console.error("Error during UART test:", error);
          setErrorCount((prev) => prev + 1);
        }

        await new Promise((resolve) => setTimeout(resolve, data.speed));
      }
    },
  });

  const [sentBytes, setSentBytes] = React.useState<number>(0);
  const [receivedBytes, setReceivedBytes] = React.useState<number>(0);
  const [errorCount, setErrorCount] = React.useState<number>(0);
  const { isPending } = form.state;

  return (
    <form
      onSubmit={form.handleSubmit}
      className="bg-card py-6 border rounded-xl shadow-sm text-card-foreground"
    >
      <h3 className="sr-only">UART Communication Tester</h3>

      <FieldSet className="px-6">
        <FieldLegend>UART Communication Tester</FieldLegend>
        <FieldDescription>
          Tool for simulating and validating UART data transfer and error rates.
        </FieldDescription>

        <FieldGroup className="grid grid-cols-2">
          <form.Field
            name="endpoint"
            render={({ meta, field }) => (
              <Field className="col-span-2">
                <FieldLabel htmlFor={meta.fieldId}>API Endpoint</FieldLabel>
                <Input {...field} disabled={isPending} />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="speed"
            render={({ meta, field }) => (
              <Field>
                <FieldLabel htmlFor={meta.fieldId}>Speed (ms)</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  className="[appearance:textfield]"
                  disabled={isPending}
                />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="numBytes"
            render={({ meta, field }) => (
              <Field>
                <FieldLabel htmlFor={meta.fieldId}>Number of bytes</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  className="[appearance:textfield]"
                  disabled={isPending}
                />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className="grid grid-cols-2">
          <Button type="reset" variant="outline" disabled={isPending}>
            Reset
          </Button>
          <Button type="submit" disabled={isPending}>
            Start Test
          </Button>
        </FieldGroup>

        <Progress
          aria-valuemin={0}
          aria-valuemax={100}
          value={
            sentBytes && (sentBytes / form.state.getValues().numBytes) * 100
          }
        />

        <FieldGroup className="flex-row justify-between items-center">
          <p className="text-sm font-semibold ">Results:</p>
          <p className="text-xs">Sent: {sentBytes} bytes</p>
          <p className="text-xs">Received: {receivedBytes} bytes</p>
          <p className="text-xs">Errors: {errorCount}</p>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
