"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMetadataSchema = exports.MessageDeltaSchema = exports.MessageSchema = exports.MessageAuthorSchema = exports.AntiqueSchema = void 0;
const zod_1 = require("zod");
// Define shared types here that both client and server will use
exports.AntiqueSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    imageUrl: zod_1.z.string().optional(),
    createdAt: zod_1.z.date(),
});
// Message and conversation types for real-time communication
exports.MessageAuthorSchema = zod_1.z.object({
    role: zod_1.z.enum(['user', 'assistant', 'system']),
    name: zod_1.z.string().optional(),
});
exports.MessageSchema = zod_1.z.object({
    id: zod_1.z.string(),
    author: exports.MessageAuthorSchema,
    content: zod_1.z.string(),
    create_time: zod_1.z.number(),
});
exports.MessageDeltaSchema = zod_1.z.object({
    type: zod_1.z.enum(['delta_encoding', 'message', 'done']),
    conversation_id: zod_1.z.string(),
    data: zod_1.z.object({
        message: zod_1.z.object({
            id: zod_1.z.string(),
            author: exports.MessageAuthorSchema.optional(),
            content: zod_1.z.string().optional(),
        }).optional(),
        delta: zod_1.z.object({
            content: zod_1.z.string().optional(),
            author: exports.MessageAuthorSchema.optional(),
        }).optional(),
    }).optional(),
});
exports.ConversationMetadataSchema = zod_1.z.object({
    conversation_id: zod_1.z.string(),
    title: zod_1.z.string().optional(),
    create_time: zod_1.z.number(),
    update_time: zod_1.z.number(),
});
//# sourceMappingURL=types.js.map