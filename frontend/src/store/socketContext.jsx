/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./userContext";
import io from "socket.io-client";

// Create the context
const SocketContext = createContext({});

// Context provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { selectedUser } = useUser();

  useEffect(() => {
    if (!selectedUser?.id) {
      return;
    }
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
      query: {
        userId: selectedUser?.id,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [selectedUser?.id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to consume the context
// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(SocketContext);
};
