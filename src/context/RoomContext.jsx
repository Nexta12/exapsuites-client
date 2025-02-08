import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { extractNumber } from "@utils/helpers";
import { createContext, useEffect, useState } from "react";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [allRooms, setAllRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [adults, setAdults] = useState("1 Adult");
  const [kids, setKids] = useState("0 Kids");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiClient.get(endpoints.getAllApartments);

        setRooms(response.data);
        setAllRooms(response.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      }
    };

    fetchRooms();
  }, []);

//  Extract Number from Adults and Kids 
  useEffect(() => {
    setTotal(extractNumber(adults) + extractNumber(kids));
  }, [adults, kids]);
  

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const newRooms = allRooms.filter((room) => total <= Number(room.maxPeople));
  
    setTimeout(() => {
      setRooms(newRooms);
      setLoading(false);
    }, 3000);
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        setRooms,
        adults,
        setAdults,
        kids,
        setKids,
        handleClick,
        loading,
        error,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
