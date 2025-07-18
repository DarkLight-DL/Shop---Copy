import React from 'react'
import { Box, Typography } from '@mui/material'
import FilterComponent from './FilterComponent'
import TypeFilter from './TypeFilter'

const Side = () => {
  
  const scrollToTop = () => {
    const scrollY = window.innerHeight * (75 / 100);
    window.scrollTo({ top: scrollY, behavior: 'smooth' });
  };


  return (
    <>
      <Box>
        <Typography variant='h5' textAlign='center' my='10px'> Rate & Category </Typography>
      </Box>
      <Box
      
        sx={{
          display: 'flex',
          justifyContent: 'center', alignItems: 'center', alignContent: 'center',
          width: '155px',
          gap: 1,
          ml: 3,
          padding: 1,
        }}
      >
        <FilterComponent />
      </Box>
      <Box>
        <Typography variant='h5' textAlign='center' m='10px' mb='10px'> Category </Typography>
      </Box >
      <Box
      onClick={scrollToTop}
      >

      <TypeFilter />
      </Box>
    </>
  )
}

export default Side


