import React, { useEffect, useState, useContext } from 'react';
import {
  Box, AppBar, styled, Toolbar, Stack, Typography, InputBase, IconButton,
  Badge, Drawer, List, ListItem, useTheme, useMediaQuery, Tooltip
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import ErrorIcon from '@mui/icons-material/Error';

import { Link } from 'react-router-dom';
import Mysearch from './Mysearch';
import Mymenu from './Mymenu';
import axios from 'axios';
import FilterComponent from './FilterComponent';
import TypeFilter from './TypeFilter';

// Styled Link
const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'sx',
})(({ sx }) => ({
  ...sx,
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 500,
  color: 'white',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: 'black',
  },
}));

const NavBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { searchdata } = useContext(Mysearch);
  const { menudata } = useContext(Mymenu);

  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const handleMenu = () => {
    setMenu((prev) => !prev);
    menudata(menu);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    searchdata(e.target.value);
  };

  const fetchCart = () => {
    axios
      .get('http://localhost:5000/cart')
      .then((response) => {
        setCartCount(response.data.length || 0);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching cart data:', err);
        setError('Failed to fetch cart');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
    const interval = setInterval(fetchCart, 5000);
    const handleStorageChange = () => fetchCart();

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            background: 'linear-gradient(90deg, #001F3F 0%, #0074D9 50%, #7FDBFF 100%)',
            color: 'white',
            borderRadius: '15px',
            position: 'fixed',
            top: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '98%',
            border: 'solid',
            zIndex: 1300,
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {isXs ? (
              <IconButton
                onClick={toggleSidebar}
                size="large"
                edge="start"
                color="inherit"
                aria-label="toggle drawer menu"
                sx={{ mr: '10px' }}
              >
                {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            ) : (
              <IconButton
                onClick={handleMenu}
                size="large"
                edge="start"
                color="inherit"
                aria-label="toggle sidebar menu"
                sx={{ mr: '10px' }}
              >
                {menu ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}

            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to={'./'} onClick={scrollToTop} style={{textDecoration:'none'}} >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: '16px', sm: '18px', md: '24px' },
                  color: '#7FDBFF',
                  mr: 0.5,
                  textShadow: '0 0 6px rgba(127, 219, 255, 0.8)',
                }}
              >
                Makit
              </Typography>
              </Link>

              <Link to={'./'} onClick={scrollToTop} style={{textDecoration:'none'}} >

              <Typography
                variant="h6"
                fontWeight="light"
                sx={{
                  fontSize: { xs: '16px', sm: '18px', md: '24px' },
                  color: '#E0E0E0',
                }}
              >
                Electronic
              </Typography>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Search */}
            {isXs ? (
              <IconButton
                sx={{
                  position: 'absolute',
                  right: '15%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
                onClick={() => setShowSearchBox(true)}
                aria-label="search"
              >
                <SearchIcon sx={{ color: 'white' }} />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  width: { xs: '50%', sm: '300px', md: '500px', lg: '550px' },
                }}
              >
                <InputBase
                  value={inputValue}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  aria-label="search"
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    width: '100%',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                  onClick={() => searchdata(inputValue)}
                  aria-label="submit search"
                >
                  <SearchIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            )}

            {/* Show search box below nav if clicked */}
            {showSearchBox && isXs && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90%',
                  backgroundColor: 'rgb(0, 0, 6)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                }}
              >
                <InputBase
                  value={inputValue}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  aria-label="search"
                  sx={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    width: '100%',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                  onClick={() => setShowSearchBox(false)}
                  aria-label="close search box"
                >
                  <CloseIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {/* Links */}
            {!isXs && (
              <Stack direction="row" spacing={2}>
                <StyledLink to="/" sx={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ mr: 0.5 }} /> Home
                </StyledLink>
                <StyledLink to="/login" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LoginIcon sx={{ mr: 0.5 }} /> Login
                </StyledLink>
              </Stack>
            )}

            {/* Cart */}
            <StyledLink to="/cart" sx={{ display: 'flex', alignItems: 'center', ml: '15px' }}>
              {error ? (
                <Tooltip title={error}>
                  <ErrorIcon color="error" />
                </Tooltip>
              ) : (
                <Badge
                  badgeContent={loading ? '...' : cartCount}
                  color="error"
                  title="Items in cart"
                >
                  <ShoppingCartIcon sx={{ fontSize: { xs: '20px', sm: '15px', md: '23px' } }} />
                </Badge>
              )}
            </StyledLink>
          </Toolbar>
        </AppBar>

        {/* Mobile Sidebar Drawer */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={toggleSidebar}

          sx={{ display: { xs: 'block', sm: 'none' } }}
          PaperProps={{
            sx: {
              // background: 'rgb(119, 104, 164)',
              bgcolor: 'rgb(148, 148, 148)',

              color: 'white',
              width: { xs: '55%', sm: '45%' },
              paddingTop: 2.5,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
            },
          }}
        >
          <Box
            role="presentation"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              padding: '10px',
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontSize: { xs: '16px', sm: '18px', md: '24px' },
                color: '#7FDBFF',
                textAlign: 'center',
                mt: 5,
              }}
            >
              Menu
            </Typography>

            <List>

              <Box
                onClick={toggleSidebar}
                onKeyDown={toggleSidebar}
              >

                <Stack spacing={2}>
                  <StyledLink to="/" onClick={scrollToTop} sx={drawerItemStyle}>
                    <HomeIcon sx={{ mr: 0.5 }} /> Home
                  </StyledLink>
                  <StyledLink to="/login" onClick={scrollToTop} sx={drawerItemStyle}>
                    <LoginIcon sx={{ mr: 0.5 }} /> Login
                  </StyledLink>
                </Stack>

              </Box>

              {/* Filters */}
              <ListItem
                sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box width='120px'><FilterComponent /></Box>
                <Box
                  // onClick={scrollToTop,}
                  // onClick={toggleSidebar}
                  onClick={() => {
                    scrollToTop();
                    toggleSidebar();
                  }}

                  onKeyDown={toggleSidebar}
                ><TypeFilter /></Box>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

// Drawer item hover style
const drawerItemStyle = {
  display: 'flex',
  color: 'white',
  transition: '0.5s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '8px',
    textAlign: 'center',
  },
  padding: '2px 16px',
};

export default NavBar;