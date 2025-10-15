import { useState, useEffect, useCallback, useRef } from "react";

interface UseSubscriptionProps {
  url: string;
  onData: (data: unknown) => void;
}

const useSubscription = ({ url, onData }: UseSubscriptionProps) => {
  const [status, setStatus] = useState<"connecting" | "open" | "closed">(
    "connecting",
  );
  const eventSourceRef = useRef<EventSource | null>(null);

  const reconnect = useCallback(() => {
    if (eventSourceRef.current) eventSourceRef.current.close();

    const newEventSource = new EventSource(url);

    newEventSource.onopen = () => {
      setStatus("open");
    };

    newEventSource.onerror = () => {
      setStatus("closed");
      newEventSource.close();
    };

    newEventSource.onmessage = (event) => {
      if (!event.data) return;

      try {
        onData(event.data);
      } catch (error) {
        console.error("Error parsing event data", error);
      }
    };

    eventSourceRef.current = newEventSource;
  }, [onData, url]);

  useEffect(() => {
    reconnect();

    return () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
    };
  }, [reconnect]);

  return { status, reconnect };
};

export { useSubscription };
