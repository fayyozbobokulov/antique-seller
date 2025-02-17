import { z } from 'zod';

// Define shared types here that both client and server will use
export const AntiqueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string().optional(),
  createdAt: z.date(),
});

export type Antique = z.infer<typeof AntiqueSchema>;
