import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import Side from './Side';
import Hero from './Hero';
import Mymenu from './Mymenu';
import Data from './Data';
import Footer from './Footer';

const Home = () => {
  const { sidemenu } = useContext(Mymenu);


  const mainGridSizes = sidemenu
    ? { xs: 12, sm: 12, md: 12, lg: 12 }
    : { xs: 12, sm: 7.5, md: 9.2, lg: 9.5 };

  // const contentMarginLeft = !sidemenu ? '60px' : '6%';

  return (
    <>

      <Grid container spacing={3} px={2}>

        <Grid itemxs={12}
          sx={{
            mt: '110px',
            height: 'auto',
            width: '100%',
            // background: gradientBackground
          }}
        >
          <Hero />
        </Grid>

        {!sidemenu && (
          <Grid item sm={4.5} md={2.8} lg={2.5}
            sx={{
              position: 'sticky', top: 80,

              mt: '30px',
              mb: '50px',
              pb: '50px',
              height: '100vh',
              boxShadow: 2,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 6,
              },
              display: { xs: 'none', sm: 'block' },

            }}
          >
            <Side />
          </Grid>
        )}

        {/* Main Content Section */}
        <Grid item {...mainGridSizes}
          sx={{
            height: 'auto',
            width: '100%',
          }}
        >

          <Data />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Home;
