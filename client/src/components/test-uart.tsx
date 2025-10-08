import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export const TestUart = () => {
  const [speed, setSpeed] = React.useState<number>(1000);
  const [numBytes, setNumBytes] = React.useState<number>(10);
  const [progress, setProgress] = React.useState<number>(0);
  const [isTesting, setIsTesting] = React.useState<boolean>(false);

  const [sentBytes, setSentBytes] = React.useState<number>(0);
  const [receivedBytes, setReceivedBytes] = React.useState<number>(0);
  const [errorCount, setErrorCount] = React.useState<number>(0);

  const sentRef = React.useRef<number>(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (!isTesting) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    sentRef.current = 0;
    setSentBytes(0);
    setReceivedBytes(0);
    setErrorCount(0);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      if (sentRef.current < numBytes) {
        const currentByte = sentRef.current + 1;
        setSentBytes(currentByte);
        sentRef.current = currentByte;

        fetch("http://localhost:8080/uart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: `Byte ${currentByte}` }),
        })
          .then((res) => {
            if (res.ok) setReceivedBytes((prev) => prev + 1);
          })
          .catch(() => {
            setErrorCount((prev) => prev + 1);
          })
          .finally(() => {
            setProgress(Math.round((currentByte / numBytes) * 100));
          });
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsTesting(false);
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTesting, numBytes, speed]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>UART Communication Tester</CardTitle>
        <CardDescription>
          Tool for simulating and validating UART data transfer and error rates.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="speed">Speed (ms)</Label>
            <Input
              id="speed"
              className="[appearance:textfield]"
              placeholder="1000"
              type="number"
              min={0}
              value={speed}
              onChange={(e) => setSpeed(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bytes">Number of bytes</Label>
            <Input
              id="bytes"
              className="[appearance:textfield]"
              placeholder="10"
              type="number"
              min={0}
              value={numBytes}
              onChange={(e) => setNumBytes(e.target.valueAsNumber)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setIsTesting(false);
              setProgress(0);
              setSentBytes(0);
              setReceivedBytes(0);
              setErrorCount(0);
            }}
            disabled={isTesting}
          >
            Reset
          </Button>
          <Button
            className="w-full"
            disabled={isTesting || numBytes <= 0 || speed <= 0}
            onClick={() => setIsTesting(true)}
          >
            Start Test
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-4">
        <Progress aria-valuemin={0} aria-valuemax={100} value={progress} />

        <div className="grid grid-cols-4 gap-4 w-full">
          <p className="text-sm font-semibold ">Results:</p>
          <p className="text-xs">Sent: {sentBytes} bytes</p>
          <p className="text-xs">Received: {receivedBytes} bytes</p>
          <p className="text-xs">Errors: {errorCount}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
