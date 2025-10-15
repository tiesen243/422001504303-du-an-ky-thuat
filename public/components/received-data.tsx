import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { formatDate } from "~/lib/utils";
import { useSubscription } from "~/hooks/use-subscription";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export const ReceivedData: React.FC = () => {
  const [receivedData, setReceivedData] = React.useState<string[]>([]);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const { status, reconnect } = useSubscription({
    url: "/api/stream",
    onData: (data) => {
      const timestamp = formatDate(new Date());
      setReceivedData((prev) => [...prev, `[${timestamp}] ${data}`]);
    },
  });

  React.useEffect(() => {
    if (textareaRef.current)
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
  }, [receivedData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>UART Data Monitor</CardTitle>
        <CardDescription>
          View live data received from UART communication in real time.
        </CardDescription>

        <div className="flex items-center justify-between">
          <p>
            Status: <Badge>{status}</Badge>
          </p>

          <Button size="sm" onClick={reconnect}>
            Reconnect
          </Button>
        </div>
      </CardHeader>

      <CardContent className="h-full">
        <Textarea
          ref={textareaRef}
          value={receivedData.join("\n")}
          className="h-full"
          readOnly
        />
      </CardContent>
    </Card>
  );
};
