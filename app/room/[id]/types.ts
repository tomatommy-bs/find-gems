import z from 'zod';

export const zodChatMessage = z.object({
  sender: z.string(),
  message: z.string(),
  type: z.enum(['system', 'message']),
});

export type ChatMessage = z.infer<typeof zodChatMessage>;
