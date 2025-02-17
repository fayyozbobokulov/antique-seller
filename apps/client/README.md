# Antique Seller Chat Application

A modern chat interface built with React, TypeScript, and Material-UI for antique sellers to communicate with potential buyers.

## Features

- 💬 Real-time chat interface with typing indicators
- 🖼️ Multiple image upload support
  - Preview images before sending
  - Grid layout for 1-5 images
  - Full-screen image preview with navigation
- 🎨 Beautiful Material-UI design
  - Responsive layout
  - Message bubbles with timestamps
  - Seller/Client distinction

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: React Hooks
- **File Handling**: react-dropzone

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd antique-seller
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Development

- `src/components/chat/` - Contains all chat-related components
  - `ChatLayout.tsx` - Main chat container and logic
  - `ChatMessage.tsx` - Individual message component
  - `ChatInput.tsx` - Message input with file upload
  - `FileUpload.tsx` - File upload handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
