import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';
import type { Attachment } from '../../types/chat';

interface FileUploadProps {
  onFilesAccepted: (attachments: Attachment[]) => void;
  disabled?: boolean;
}

export const FileUpload = ({ onFilesAccepted, disabled = false }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled) return;
      const attachments: Attachment[] = acceptedFiles.map((file) => {
        // Create a persistent blob URL that will be used throughout the chat
        const blobUrl = URL.createObjectURL(file);
        return {
          id: Math.random().toString(36).substring(7),
          file,
          previewUrl: blobUrl,
        };
      });
      onFilesAccepted(attachments);
    },
    [onFilesAccepted, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    disabled,
    multiple: true,
  });

  return (
    <Box 
      {...getRootProps()} 
      sx={{ 
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <input {...getInputProps()} />
      <Tooltip title="Attach images" placement="top">
        <IconButton
          color="primary"
          aria-label="upload pictures"
          component="span"
          size="small"
          disabled={disabled}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
          }}
        >
          <AttachFileIcon />
        </IconButton>
      </Tooltip>
      {isDragActive && !disabled && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              bgcolor: 'primary.main',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            Drop images here
          </Typography>
        </Box>
      )}
    </Box>
  );
};
