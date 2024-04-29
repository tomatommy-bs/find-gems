export default async function RoomPage({params}: {params: {id: string}}) {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <p>Room : {params.id}</p>
      </div>
    </>
  );
}
