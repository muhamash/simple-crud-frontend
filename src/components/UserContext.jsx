/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const updateUser = (user) => {
    setFormData(user);
  };

  return (
    <UserContext.Provider value={{ formData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;