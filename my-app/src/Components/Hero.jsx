import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import pic1 from '../Assets/pic1.jpg';
import pic2 from '../Assets/pic2.jpg';
import pic3 from '../Assets/pic3.jpg';
import pic4 from '../Assets/pic4.jpg';
import pic5 from '../Assets/pic5.jpg';
import pic6 from '../Assets/pic6.jpg';

const slideData = [
  {
    img: pic1,
    title: 'Latest Microcontroller',
    subtitle: 'Power. Performance. Portability.',
    btnText: 'Shop Now',
  },
  {
    img: pic2,
    title: 'Sensor',
    subtitle: 'Transform Your Projects with Cutting-Edge Sensor Technology.',
    btnText: 'Explore Deals',
  },
  {
    img: pic3,
    title: 'BLDC Motor for Drone',
    subtitle: 'Speed Meets Style — Only Here',
    btnText: 'Buy Today',
  },
  {
    img: pic4,
    title: 'Module',
    subtitle: 'Ease of Use for Your Project — Speed Meets Style.',
    btnText: 'Buy Today',
  },
  {
    img: pic5,
    title: 'Tools',
    subtitle: 'Precision and Performance — Only Here.',
    btnText: 'Buy Today',
  },
  {
    img: pic6,
    title: 'Transistor',
    subtitle: 'All Types and Models — Power and Variety for All Your Needs.',
    btnText: 'Shop Now',
  },
];

const Hero = ({ interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
    }, interval);
    return () => clearInterval(autoSlide);
  }, [interval]);

  return (
    <Container disableGutters maxWidth={false}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          right: '-12px',
          transform: '15%',
          height: { xs: '55vh', sm: '60vh', md: '70vh', lg: '75vh' },
          overflow: 'hidden',
        }}
      >
        {/* Slider Track */}
        <Box
          sx={{
            display: 'flex',
            width: `${slideData.length * 100}%`,
            height: '100%',
            transition: 'transform 1s ease',
            transform: `translateX(-${currentIndex * (100 / slideData.length)}%)`,
          }}
        >
          {slideData.map((slide, index) => (
            <Box
              key={index}
              sx={{
                width: `${100 / slideData.length}%`,
                height: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center', // Centers horizontally
                alignItems: 'center', // Centers vertically
              }}
            >
              {/* Background Image */}
              <Box
                component="img"
                src={slide.img}
                alt={slide.title}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 1s ease',
                  transform: currentIndex === index ? 'scale(1.05)' : 'scale(1)',
                }}
              />

              {/* Overlay Content */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  p: { xs: 2, sm: 6, md: 10 },
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    color="white"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
                      fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{
                      mb: 4,
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                      fontSize: { xs: '0.8rem', sm: '1.5rem', md: '1.75rem' },
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    // size: { xs: 'small', sm: '1.5rem', md: '1.75rem' },

                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  >
                    {slide.btnText}
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Navigation */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          {slideData.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                border: currentIndex === index ? '2px solid #000' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
