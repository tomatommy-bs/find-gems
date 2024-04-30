export const startGame = async (roomId: string) => {
  const res = await fetch(`/api/room/${roomId}/start`, {
    method: 'POST',
  });
  return res.json();
};
