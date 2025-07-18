import React, { createContext, useState, useContext } from 'react';

const TypeFilterContext = createContext();

export const useTypeFilter = () => {
  return useContext(TypeFilterContext);
};

export const TypeFilterProvider = ({ children }) => {
  const [filteredType, setFilteredType] = useState('');

  return (
    <TypeFilterContext.Provider value={{ filteredType, setFilteredType }}>
      {children}
    </TypeFilterContext.Provider>
  );
};
