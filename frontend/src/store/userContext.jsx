/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext({
  selectedUser: null,
  setSelectedUser: (id) => {},
});

// Context provider component
export const UserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the context
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext);
};
