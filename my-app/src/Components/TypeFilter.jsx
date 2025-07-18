import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useTypeFilter } from './TypeFilterContext';
import axios from 'axios';

const TypeFilter = () => {
  const { filteredType, setFilteredType } = useTypeFilter();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/list');
        const fetchedTypes = [...new Set(response.data.map((data) => data.type))];
        setTypes(fetchedTypes);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchTypes();
  }, []);

  const isSelected = (type) => filteredType === type;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          // color: '#1976d2',
          color: 'rgb(10,10,10)',

          fontSize: '14px',
          mb: 1
        }}
      >
        Type Filter
      </Typography>

      <Box
        sx={{
          width: { xs: '100%', sm: 'fit-content' },
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          p: 2,

        }}
      >
        {/* "All" button */}
        <Button
          onClick={() => setFilteredType('')}
          size="small"
          variant={filteredType === '' ? 'contained' : 'outlined'}
          sx={{
            textTransform: 'none',
            fontSize: '13px',
            fontWeight: 500,
            borderRadius: '20px',
            padding: '6px 16px',
            color: isSelected('') ? '#fff' : '#1976d2',
            backgroundColor: isSelected('') ? '#1976d2' : '#e3f2fd',
            borderColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1976d2',
              color: '#fff'
            }
          }}
        >
          All
        </Button>

        {types.map((type) => (
          <Button
            key={type}
            onClick={() => setFilteredType(type === filteredType ? '' : type)}
            size="small"
            variant={isSelected(type) ? 'contained' : 'outlined'}
            sx={{
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '20px',
              padding: '6px 16px',
              color: isSelected(type) ? '#fff' : '#1976d2',
              backgroundColor: isSelected(type) ? '#1976d2' : '#e3f2fd',
              borderColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1976d2',
                color: '#fff'
              }
            }}
          >
            {type}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default TypeFilter;
