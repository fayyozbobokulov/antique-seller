import { useEffect, useRef, useState } from 'react';

interface UseEventSourceProps {
  url: string;
  onMessage?: (event: MessageEvent) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
}

export const useEventSource = ({
  url,
  onMessage,
  onError,
  onOpen,
}: UseEventSourceProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      setIsConnected(true);
      onOpen?.();
    };

    eventSource.onmessage = (event) => {
      onMessage?.(event);
    };

    eventSource.onerror = (error) => {
      setIsConnected(false);
      onError?.(error);
    };

    eventSourceRef.current = eventSource;

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [url, onMessage, onError, onOpen]);

  const close = () => {
    eventSourceRef.current?.close();
    setIsConnected(false);
  };

  return { isConnected, close };
};
