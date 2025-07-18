import './App.css';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/CartPage';
import Login from './Components/Login';
import Nave from './Components/Nave';

import { CartProvider } from './Components/CreateContext';
import { MysearchProvider } from './Components/Mysearch';
import { MymenuProvider } from './Components/Mymenu';
import { FiltersProvider } from './Components/MyFilter';
import { TypeFilterProvider } from './Components/TypeFilterContext';



function App() {
  return (
    <>
      <Box sx={{
        background: " linear-gradient(174deg,rgba(9, 9, 121, 0.09) 0%, rgba(0, 212, 255, 0.16) 100%)"
      }}>

        <CartProvider>
          <MysearchProvider>
            <MymenuProvider>
              <FiltersProvider>
                <TypeFilterProvider>
                    <Box>
                      <Nave />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cart" element={<Cart />} />
                      </Routes>
                    </Box>
                </TypeFilterProvider>
              </FiltersProvider>
            </MymenuProvider>
          </MysearchProvider>
        </CartProvider>

      </Box>

    </>
  );
}

export default App;


