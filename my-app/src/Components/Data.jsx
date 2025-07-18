import React, { useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Grid, Card, Button, Typography, Box, CardMedia, CardContent, CardActions, Chip, Fade, Skeleton } from '@mui/material';
import { useCart } from './CreateContext';
import { useTypeFilter } from './TypeFilterContext';
import { useFilter } from './MyFilter';
import Mysearch from './Mysearch';
import Mymenu from './Mymenu';

const Data = () => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { filteredType } = useTypeFilter();
  const { search } = useContext(Mysearch);
  const { priceRange } = useFilter();
  const { sidemenu } = useContext(Mymenu);

  const mainGridSizes = sidemenu
    ? { xs: 6, sm: 3.5, md: 3, lg: 2.3 }
    : { xs: 6, sm: 6, md: 4, lg: 3 };

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get('./shop.json');
      setLists(response.data.list);
      // const response = await axios.get('http://localhost:5000/list');
      // setLists(response.data);
    } catch (err) {
      console.error('Error fetching product list:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredProducts = useMemo(() => {
    return lists.filter((data) => {
      const rawPrice = data.price?.replace(/\$/g, '').replace(/,/g, '');
      const price = parseFloat(rawPrice) || 0;

      let min = 0;
      let max = Infinity;
      if (priceRange === '0-50') max = 50;
      else if (priceRange === '50-100') { min = 50; max = 100; }
      else if (priceRange === '100-500') { min = 100; max = 500; }
      else if (priceRange === '500+') min = 500;

      const isInPriceRange = price >= min && price <= max;
      const isInTypeFilter = filteredType ? data.type === filteredType : true;
      const matchesSearchTerm = data.name.toLowerCase().includes(search.toLowerCase());

      return isInPriceRange && isInTypeFilter && matchesSearchTerm;
    });
  }, [lists, filteredType, search, priceRange]);

  if (loading) {
    return (
      <Box p={2}>
        <Grid container spacing={1}>
          {[...Array(8)].map((_, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Skeleton variant="rectangular" height={180} />
              <Skeleton height={30} width="60%" />
              <Skeleton height={20} width="80%" />
              <Skeleton height={36} width="100%" />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1, px: 0 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        sx={{
          color: '#007ea7',
          textShadow: '1px 1px 2px #b2ebf2',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
        }}
      >
        Our Latest Products
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg:2, xl:2}} 
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

        }}>
        {filteredProducts.map((data, index) => (
          <Fade in timeout={500 + index * 100} key={data.id}>
            <Grid item {...mainGridSizes}>
              <Card
                sx={{
                  p: 0,
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0, 188, 212, 0.25)',
                  backdropFilter: 'blur(8px)',
                  background: 'linear-gradient(to bottom right, #ffffffcc, #e0f7fa)',
                  border: '1px solid #b2ebf2',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(0, 188, 212, 0.4)',
                  },
                }}
              >
                <Box position="relative">
                  <CardMedia
                    component="img"
                    image={data.img || '/images/electronic-default All.jpg'}
                    alt={data.name}
                    loading="lazy"
                    sx={{
                      p: 0,
                      height: { xs: 80, sm: 120, md: 150, lg: 180 },
                      objectFit: 'contain',
                      bgcolor: '#fff',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                      transition: 'transform 0.3s',
                      // cursor:'pointer',
                      '&:hover': { transform: 'scale(1.10)' }
                    }}
                  />
                  {data.stock === 0 && (
                    <Chip
                      label="Out of Stock"
                      color="error"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        fontWeight: 'bold',
                        zIndex: 2,
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ p: "2px", px: "10px" }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: "bold",
                      textAlign: 'left',
                      color: 'rgb(6, 55, 107)',
                      py: '5px',
                      fontSize: {
                        xs: '0.75rem',
                        sm: '0.85rem',
                        md: '1rem',
                        lg: '1.1rem',
                      }
                    }}
                  >
                    {data.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#546e7a',
                      fontStyle: 'italic',
                      minHeight: '30px',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                      fontSize: {
                        xs: '0.65rem',
                        sm: '0.75rem',
                        md: '0.85rem',
                      }
                    }}
                  >
                    {data.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 1 }}>
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontSize: {
                        xs: '0.7rem',
                        sm: '0.8rem',
                        md: '0.9rem',
                      },
                      color: '#00695c',
                    }}
                  >
                    {data.price}
                  </Typography>

                  <Chip
                    size="small"
                    label={data.type}
                    sx={{
                      background: 'linear-gradient(45deg, #00e5ff, #0097a7)',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '0.6rem',
                    }}
                  />
                </CardActions>

                <Box sx={{ px: 1, pb: 1 }}>
                  <Button
                    fullWidth
                    disabled={data.stock === 0}
                    variant="contained"
                    onClick={() =>
                      isInCart(data.id) ? removeFromCart(data) : addToCart(data)
                    }
                    sx={{
                      mt: 1,
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontSize: {
                        xs: '0.5rem',
                        sm: '0.75rem',
                        md: '0.85rem'
                      },
                      py: { xs: 0.6, sm: 0.8 },
                      backgroundColor: isInCart(data.id) ? '#00e676' : '#007c91',
                      '&:hover': {
                        backgroundColor: isInCart(data.id) ? '#00c853' : '#005b67',
                      },
                      boxShadow: isInCart(data.id)
                        ? '0 2px 10px rgba(0, 255, 100, 0.4)'
                        : '0 2px 12px rgba(0, 255, 255, 0.3)'
                    }}
                  >
                    {isInCart(data.id) ? '✔ Added to Cart' : '➕  Add to Cart'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Box>
  );
};

export default Data;
