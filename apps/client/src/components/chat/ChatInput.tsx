import { useState, KeyboardEvent } from 'react';
import { Box, TextField, IconButton, Stack } from '@mui/material';
import { Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';
import { FileUpload } from './FileUpload';
import type { Attachment } from '../../types/chat';

interface ChatInputProps {
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      console.log({message, attachments});
      
      onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFilesAccepted = (newAttachments: Attachment[]) => {
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === attachmentId);
      if (attachment) {
        URL.revokeObjectURL(attachment.previewUrl);
      }
      return prev.filter(a => a.id !== attachmentId);
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      {attachments.length > 0 && (
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            mb: 2, 
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.3)',
              },
            },
          }}
        >
          {attachments.map((attachment) => (
            <Box
              key={attachment.id}
              sx={{
                position: 'relative',
                flexShrink: 0,
                width: 80,
                height: 80,
              }}
            >
              <Box
                component="img"
                src={attachment.previewUrl}
                alt="Preview"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': {
                    bgcolor: 'background.paper',
                  },
                  padding: '2px',
                }}
                onClick={() => handleRemoveAttachment(attachment.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
        <FileUpload onFilesAccepted={handleFilesAccepted} />
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!message.trim() && attachments.length === 0}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
