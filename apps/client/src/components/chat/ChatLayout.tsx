/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react';
import { Container, Alert, Snackbar } from '@mui/material';
import { SingleChatWindow } from './SingleChatWindow';
import type { ChatMessage, Attachment } from '../../types/chat';
import { useEventSource } from '../../hooks/useEventSource';

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'seller',
  content: 'Hello! I am an antique seller. How can I help you today?',
  timestamp: new Date(),
};

export const ChatLayout = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSSEMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'thinking') {
        setIsWriting(true);
        setMessages(prev => {
          const withoutTyping = prev.filter(msg => !msg.id.startsWith('typing-'));
          return [...withoutTyping, {
            id: `typing-thinking-${Date.now()}`,
            role: 'seller',
            content: 'typing...',
            timestamp: new Date(),
          }];
        });
      } else if (data.type === 'message') {
        setMessages(prev => {
          const withoutTyping = prev.filter(msg => !msg.id.startsWith('typing-'));
          return [...withoutTyping, {
            id: data.id || Math.random().toString(36).substring(7),
            role: 'seller',
            content: data.content,
            timestamp: new Date(data.timestamp || Date.now()),
            attachments: data.attachments,
          }];
        });
        setIsWriting(false);
      }
    } catch (err) {
      console.error('Error processing SSE message:', err);
      setError('Error processing message from server');
    }
  }, []);

  const handleSSEError = useCallback((error: Event) => {
    console.error('SSE connection error:', error);
    setError('Lost connection to server. Messages may be delayed.');
    setIsWriting(false);
  }, []);

  useEventSource({
    url: 'http://localhost:3000/api/chat/stream', // Update with your backend URL
    onMessage: handleSSEMessage,
    onError: handleSSEError,
    onOpen: () => setError(null),
  });

  const handleSendMessage = async (content: string, attachments?: Attachment[]) => {
    try {
      // Add client message immediately
      const clientMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'client',
        content,
        timestamp: new Date(),
        attachments,
      };
      setMessages(prev => [...prev, clientMessage]);

      // Send message to backend
      const response = await fetch('http://localhost:3000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          attachments,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', py: 4 }}>
      <SingleChatWindow
        title="Antique Seller Chat"
        messages={messages}
        onSendMessage={handleSendMessage}
        isSellerTyping={isWriting}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};
