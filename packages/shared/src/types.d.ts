import { z } from 'zod';
export declare const AntiqueSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    imageUrl: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    imageUrl?: string | undefined;
}, {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    imageUrl?: string | undefined;
}>;
export type Antique = z.infer<typeof AntiqueSchema>;
export declare const MessageAuthorSchema: z.ZodObject<{
    role: z.ZodEnum<["user", "assistant", "system"]>;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "user" | "assistant" | "system";
    name?: string | undefined;
}, {
    role: "user" | "assistant" | "system";
    name?: string | undefined;
}>;
export declare const MessageSchema: z.ZodObject<{
    id: z.ZodString;
    author: z.ZodObject<{
        role: z.ZodEnum<["user", "assistant", "system"]>;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "assistant" | "system";
        name?: string | undefined;
    }, {
        role: "user" | "assistant" | "system";
        name?: string | undefined;
    }>;
    content: z.ZodString;
    create_time: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    author: {
        role: "user" | "assistant" | "system";
        name?: string | undefined;
    };
    content: string;
    create_time: number;
}, {
    id: string;
    author: {
        role: "user" | "assistant" | "system";
        name?: string | undefined;
    };
    content: string;
    create_time: number;
}>;
export declare const MessageDeltaSchema: z.ZodObject<{
    type: z.ZodEnum<["delta_encoding", "message", "done"]>;
    conversation_id: z.ZodString;
    data: z.ZodOptional<z.ZodObject<{
        message: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            author: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "assistant", "system"]>;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            }, {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            }>>;
            content: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        }, {
            id: string;
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        }>>;
        delta: z.ZodOptional<z.ZodObject<{
            content: z.ZodOptional<z.ZodString>;
            author: z.ZodOptional<z.ZodObject<{
                role: z.ZodEnum<["user", "assistant", "system"]>;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            }, {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        }, {
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        message?: {
            id: string;
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        } | undefined;
        delta?: {
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        } | undefined;
    }, {
        message?: {
            id: string;
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        } | undefined;
        delta?: {
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "message" | "delta_encoding" | "done";
    conversation_id: string;
    data?: {
        message?: {
            id: string;
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        } | undefined;
        delta?: {
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    type: "message" | "delta_encoding" | "done";
    conversation_id: string;
    data?: {
        message?: {
            id: string;
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        } | undefined;
        delta?: {
            author?: {
                role: "user" | "assistant" | "system";
                name?: string | undefined;
            } | undefined;
            content?: string | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const ConversationMetadataSchema: z.ZodObject<{
    conversation_id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    create_time: z.ZodNumber;
    update_time: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    create_time: number;
    conversation_id: string;
    update_time: number;
    title?: string | undefined;
}, {
    create_time: number;
    conversation_id: string;
    update_time: number;
    title?: string | undefined;
}>;
export type Message = z.infer<typeof MessageSchema>;
export type MessageDelta = z.infer<typeof MessageDeltaSchema>;
export type ConversationMetadata = z.infer<typeof ConversationMetadataSchema>;
export type MessageAuthor = z.infer<typeof MessageAuthorSchema>;
//# sourceMappingURL=types.d.ts.map