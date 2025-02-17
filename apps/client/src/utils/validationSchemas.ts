import { z } from 'zod';

// Example form schema - modify according to your needs
export const exampleFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  description: z.string().optional(),
});

export type ExampleFormData = z.infer<typeof exampleFormSchema>;
