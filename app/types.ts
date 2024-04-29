import z from 'zod';

export const zodCreateRoomDto = z.object({
  userName: z.string(),
});

export type CreateRoomDto = z.infer<typeof zodCreateRoomDto>;
