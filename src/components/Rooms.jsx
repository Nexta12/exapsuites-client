import { RoomContext } from "@context/RoomContext";
import { useContext } from "react";
import Room from "./Room";

// Loading animation
import { SpinnerDotted } from 'spinners-react';

const Rooms = ({ limit, smallTitle, bigTitle }) => {
  const { rooms, loading } = useContext(RoomContext);

  // Use 'limit' prop to slice rooms (if provided)
  const roomsToDisplay = limit ? rooms.slice(0, limit) : rooms;

  return (
    <section className="py-24">
      {/* Overlay Spinner */}
      {loading && (
        <div className="h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex items-center justify-center">
          <SpinnerDotted color="white" />
        </div>
      )}

      <div className="container mx-auto lg:px-0">
        <div className="text-center">
          <div className="font-tertiary uppercase text-[15px] tracking-[6px]">
            {smallTitle}
          </div>
          <h2 className="font-primary text-[45px] mb-4">{bigTitle}</h2>
        </div>

        {/* Grid for rooms */}
        <div className="grid grid-cols-1 max-w-md mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {/* Render all rooms or slice based on limit */}
          {roomsToDisplay.map((room) => {
            return <Room room={room} key={room.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
