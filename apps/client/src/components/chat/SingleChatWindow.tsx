import { useRef, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType, Attachment } from '../../types/chat';

interface SingleChatWindowProps {
  title: string;
  messages: ChatMessageType[];
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
  isSellerTyping: boolean;
}

export const SingleChatWindow = ({ 
  title, 
  messages, 
  onSendMessage,
  isSellerTyping
}: SingleChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.default',
        maxWidth: '800px',
        width: '100%',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {isSellerTyping && (
          <Typography variant="caption" color="text.secondary">
            Reading your messages...
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <ChatInput 
          onSendMessage={onSendMessage} 
        />
      </Box>
    </Paper>
  );
};
