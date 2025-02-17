import { Box, Paper, Typography, Avatar, Dialog, IconButton, DialogContent } from '@mui/material';
import { format } from 'date-fns';
import { Store as StoreIcon, Person as PersonIcon, Close as CloseIcon, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useState } from 'react';
import type { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isSeller = message.role === 'seller';
  const isTyping = message.id === 'typing';
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const attachments = message.attachments || [];
  const hasAttachments = attachments.length > 0;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setPreviewOpen(true);
  };

  const handleClose = () => {
    setPreviewOpen(false);
  };

  const handlePrevImage = () => {
    if (!hasAttachments) return;
    setSelectedImageIndex((prev) => 
      prev > 0 ? prev - 1 : attachments.length - 1
    );
  };

  const handleNextImage = () => {
    if (!hasAttachments) return;
    setSelectedImageIndex((prev) => 
      prev < attachments.length - 1 ? prev + 1 : 0
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (event.key === 'ArrowRight') {
      handleNextImage();
    } else if (event.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSeller ? 'row' : 'row-reverse',
        gap: 1.5,
        width: '100%',
        px: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSeller ? 'row' : 'row-reverse',
          gap: 1.5,
          width: 'fit-content',
          maxWidth: 'calc(97% - 16px)', // Account for container padding
          minWidth: '100px',
        }}
      >
        <Avatar
          sx={{
            bgcolor: isSeller ? 'primary.main' : 'secondary.main',
            width: 32,
            height: 32,
            mt: 0.5,
            flexShrink: 0,
          }}
        >
          {isSeller ? <StoreIcon /> : <PersonIcon />}
        </Avatar>

        <Box sx={{ 
          width: 'fit-content',
          maxWidth: 'calc(100% - 48px)', // Account for avatar (32px) and gap (16px)
          minWidth: 0,
        }}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              backgroundColor: isTyping ? 'grey.100' : (isSeller ? '#e3f2fd' : '#fce4ec'),
              color: '#000',
              borderRadius: 2,
              position: 'relative',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              display: 'inline-block',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 8,
                [isSeller ? 'left' : 'right']: -6,
                width: 0,
                height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                [isSeller ? 'borderRight' : 'borderLeft']: `6px solid ${isTyping ? '#f5f5f5' : (isSeller ? '#e3f2fd' : '#fce4ec')}`,
              },
            }}
          >
            {message.content && (
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: hasAttachments ? 2 : 0 }}>
                {message.content}
              </Typography>
            )}
            
            {hasAttachments && (
              <Box sx={{
                display: 'grid',
                width: '100%',
                gap: 1,
                ...(attachments.length === 1 && {
                  gridTemplateColumns: '1fr',
                }),
                ...(attachments.length === 2 && {
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }),
                ...(attachments.length === 3 && {
                  gridTemplateColumns: '2fr 1fr',
                  gridTemplateRows: 'repeat(2, 1fr)',
                }),
                ...(attachments.length === 4 && {
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                }),
                ...(attachments.length === 5 && {
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  gridTemplateAreas: '"img1 img1 img1 img2 img2 img2" "img3 img3 img4 img4 img5 img5"',
                }),
              }}>
                {attachments.map((attachment, index) => (
                  <Box
                    key={attachment.id}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      minWidth: 100,
                      // Different aspect ratios based on layout
                      paddingTop: attachments.length === 1 ? '56.25%' : // 16:9 for single image
                                 attachments.length === 2 ? '75%' : // 4:3 for two images
                                 '100%', // 1:1 for 3+ images
                      // Grid positioning for different layouts
                      ...(attachments.length === 3 && {
                        gridColumn: index === 0 ? '1' : '2',
                        gridRow: index === 0 ? '1 / span 2' : `${index}`,
                      }),
                      ...(attachments.length === 5 && {
                        gridArea: `img${index + 1}`,
                      }),
                    }}
                  >
                    <Box
                      component="img"
                      src={attachment.previewUrl}
                      alt="Attachment"
                      onClick={() => handleImageClick(index)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 0.5,
              color: 'text.secondary',
              textAlign: isSeller ? 'left' : 'right',
            }}
          >
            {format(message.timestamp, 'HH:mm')}
          </Typography>
        </Box>
      </Box>
      {/* Image Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={handleClose}
        maxWidth={false}
        onKeyDown={handleKeyDown}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              position: 'relative',
              maxHeight: '90vh',
              maxWidth: '90vw',
            }
          }
        }}
      >
        <DialogContent 
          sx={{ 
            p: 0, 
            position: 'relative', 
            bgcolor: 'transparent',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
            }}
          >
            {hasAttachments && attachments[selectedImageIndex] && (
              <Box
                component="img"
                src={attachments[selectedImageIndex].previewUrl}
                alt="Preview"
                sx={{
                  maxWidth: 'calc(100% - 120px)', // Account for navigation buttons
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  borderRadius: 1,
                }}
              />
            )}
            
            {/* Navigation Controls */}
            {attachments.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'fixed',
                    left: '40px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    width: '48px',
                    height: '48px',
                    backdropFilter: 'blur(4px)',
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '32px',
                    },
                  }}
                >
                  <NavigateBefore />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'fixed',
                    right: '40px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    width: '48px',
                    height: '48px',
                    backdropFilter: 'blur(4px)',
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '32px',
                    },
                  }}
                >
                  <NavigateNext />
                </IconButton>
              </>
            )}

            {/* Close Button */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                width: '40px',
                height: '40px',
                backdropFilter: 'blur(4px)',
                '&:hover': { 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '24px',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
