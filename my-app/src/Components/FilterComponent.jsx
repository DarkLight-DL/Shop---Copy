import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useFilter } from './MyFilter';

const FilterComponent = () => {
  const { priceRange, handlePriceRangeChange } = useFilter();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (value !== undefined) {
      handlePriceRangeChange({ target: { value } });
    }
    setAnchorEl(null);
  };

  const priceOptions = [
    { label: 'All Prices', value: 'all' },
    { label: '$0 - $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $500', value: '100-500' },
    { label: '$500+', value: '500+' }
  ];

  const selectedLabel =
    priceOptions.find((option) => option.value === priceRange)?.label || 'Select';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 1,
        mt: 1,
        width: '90%',
        maxWidth: 200
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          // color: '#1976d2',
          color: 'rgb(10,10,10)',
          fontSize: '14px'
        }}
      >
        Price
      </Typography>

      <Button
        onClick={handleClick}
        variant="contained"
        size="small"
        endIcon={<span style={{ fontSize: 14 }}>▼</span>}
        sx={{
          justifyContent: 'space-between',
          fontSize: '13px',
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: '10px',
          padding: '6px 12px',
          backgroundColor: 'rgb(62, 114, 156)',
          color: 'white',

          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgb(0, 62, 89)'
          }
        }}
      >
        {selectedLabel}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          sx: {
            borderRadius: 2,
            mt: 1,
            minWidth: 180,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
            backgroundColor: '#fff'
          }
        }}
      >
        {priceOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={priceRange === option.value}
            onClick={() => handleClose(option.value)}
            sx={{
              fontSize: 13,
              px: 2,
              py: 1,
              borderRadius: 1,
              fontWeight: priceRange === option.value ? 600 : 400,
              color: priceRange === option.value ? '#1976d2' : '#333',
              backgroundColor:
                priceRange === option.value ? '#e3f2fd' : 'transparent',
              '&:hover': {
                backgroundColor: '#1976d2',
                color: '#fff'
              }
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterComponent;
