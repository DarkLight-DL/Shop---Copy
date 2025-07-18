import React, { createContext, useState, useContext } from 'react';

const MyFilter = createContext();

export const useFilter = () => {
  return useContext(MyFilter);
};

export const FiltersProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Update the price range when a radio button is selected
  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
    // Update min and max prices based on selected range
    if (event.target.value === '0-50') {
      setMinPrice('0');
      setMaxPrice('50');
    } else if (event.target.value === '50-100') {
      setMinPrice('50');
      setMaxPrice('100');
    } else if (event.target.value === '100-500') {
      setMinPrice('100');
      setMaxPrice('500');
    } else if (event.target.value === '500+') {
      setMinPrice('500');
      setMaxPrice('');
    } else if (event.target.value === 'all') {
      setMinPrice('');
      setMaxPrice('');
    }
  };

  return (
    <MyFilter.Provider
      value={{
        priceRange,
        handlePriceRangeChange,
        minPrice,
        maxPrice,
      }}
    >
      {children}
    </MyFilter.Provider>
  );
};
