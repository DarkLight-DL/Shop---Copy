import React from 'react';
import { Box, Grid, Typography, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
const Footer = () => {
  const linkStyles = {
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
      fontSize: '16px',
      color: '#ff9800',
    },
  };

  const contactStyles = {
    ...linkStyles,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 4,
        px: 2,
        position: 'relative',
        background: 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(40, 161, 90, 1) 64%)',
      }}
    >

      <Box sx={{
        position: 'absolute',
        // display:{xs:'none',md:'block',},
        left: { xs: '50%', sm: '50%', md: '50%', lg: '50%', xl: '50%' },
        transform: { xs: 'translateX(-50%)', sm: 'translateX(-50%)', md: 'translateX(-50%)', lg: 'translateX(-50%)', xl: 'translateX(-50%)' },
      }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            onClick={scrollToTop}
            sx={{
              px: '10px',
              pr: 1,
              bgcolor: '#2d2b4e',
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '25px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.00)',
                bgcolor: '#ff9800',
                color: '#000',
              },
            }}
          >

            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' } }}>Move Top</Typography>
            <KeyboardDoubleArrowUpIcon />
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4} display='flex' justifyContent="center" alignContent='center' alignItems="flex-start" sx={{ mt: '20px' }}>
        {/* About Us Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            gutterBottom
            sx={{ textAlign: 'center', color: 'rgb(56, 255, 195)', fontSize: '17px', fontWeight: 600 }}
          >
            About Us
          </Typography>
          <Typography
            sx={{
              mx: 1,
              color: 'white',
              fontSize: '14px',
              textAlign: 'center',
              lineHeight: 1.5,
              transition: "transform 0.3s ease",
              transform: "scale(1)",
              '&:hover': { transform: 'scale(1.1)', color: '#ff9800', }

            }}
          >
            Welcome! Get the latest gadgets at unbeatable prices with fast delivery and great service.
          </Typography>
        </Grid>

        {/* Social Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            gutterBottom
            sx={{ textAlign: 'center', color: 'rgb(56, 255, 195)', fontSize: '17px', fontWeight: 600 }}
          >
            Social
          </Typography>
          <Box
            component="ul"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              listStyle: 'none',
              p: 0,
              mt: 5,
            }}
          >
            {[
              { icon: FacebookIcon, href: 'https://facebook.com' },
              { icon: XIcon, href: 'https://x.com' },
              { icon: InstagramIcon, href: 'https://instagram.com' },
              { icon: GoogleIcon, href: 'https://google.com' },
            ].map(({ icon: Icon, href }, idx) => (
              <li key={idx}>
                <MuiLink
                  href={href}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    // '&:hover svg': {
                    //   fontSize: '30px',
                    //   color: '#ff9800',
                    // },
                    transition: "transform 0.2s ease-in-out",
                    transform: "scale(1)",
                    '&:hover svg': { transform: 'scale(1.5)', color: '#ff9800', }
                  }}
                >
                  <Icon sx={{ fontSize: '25px' }} />
                </MuiLink>
              </li>
            ))}
          </Box>
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            gutterBottom
            sx={{ textAlign: 'center', color: 'rgb(56, 255, 195)', fontSize: '17px', fontWeight: 600 }}
          >
            Links
          </Typography>
          <Box component="ul" sx={{ textAlign: 'center', listStyle: 'none', p: 0, m: 0 }}>
            {[
              { text: 'Go to Home', to: '/', onClick: scrollToTop },
              { text: 'Go to Login', to: '/login', onClick: scrollToTop },
              { text: 'Go to Cart', to: '/cart', onClick: scrollToTop },
            ].map(({ text, to, onClick }) => (
              <li key={text} style={{ marginBottom: 4 }}>
                <MuiLink component={Link} to={to} sx={linkStyles} onClick={onClick}>
                  {text}
                </MuiLink>
              </li>
            ))}
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            gutterBottom
            sx={{ textAlign: 'center', color: 'rgb(56, 255, 195)', fontSize: '17px', fontWeight: 600 }}
          >
            Contact
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            <li style={{ marginBottom: 8 }}>
              <MuiLink component={Link} to="#" sx={contactStyles}>
                <MailOutlineIcon sx={{ mr: 1 }} />
                a.asikahamedm@gmail.com
              </MuiLink>
            </li>
            <li style={{ marginBottom: 8 }}>
              <MuiLink component={Link} to="#" sx={contactStyles}>
                <LocationOnIcon sx={{ mr: 1 }} />
                Nagercoil - Kanniyakumari. india
              </MuiLink>
            </li>
            <li>
              <MuiLink component={Link} to="#" sx={contactStyles}>
                <CallIcon sx={{ mr: 1 }} />
                +91 9500302681
              </MuiLink>
            </li>
          </Box>

        </Grid>
      </Grid>

      {/* Footer Bottom Text */}
      <Box sx={{ mt: '80px', position: 'relative' }}>

        <Typography align="center" sx={{ mt: 4, color: 'white', fontSize: { xs: '10px', sm: '12px', lg: '16px' } }}>
          Copyright  &copy; {new Date().getFullYear()} All rights reserved | This template is made with ❤️ by Asik
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
