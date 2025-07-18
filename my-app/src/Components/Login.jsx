import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, IconButton, InputAdornment, Link as MuiLink, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { email, password });
  };

  return (
    <>

      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to right,rgba(28, 146, 210, 0.66),rgba(98, 97, 161, 0.73))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          px: 2,
        }}
      >
        {/* Blur Overlay for Glass Effect */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            filter: 'blur(8px)',
            zIndex: 1,
          }}
        />

        <Paper
          elevation={6}
          sx={{
            position: 'relative',
            zIndex: 2,
            width: { xs: '100%', sm: '400px' },
            mt: { xs: '80px', sm: '100px', md: '100px' },

            p: 4,
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'fadeIn 0.6s ease-in-out',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'white',
              textShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
          >
            Login
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, opacity: 0.8 }}
          >
            Please login to your account
          </Typography>

          {/* Form */}
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="filled"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                },
              }}
            />

            <TextField
              label="Password"
              type={showPass ? 'text' : 'password'}
              variant="filled"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                      sx={{ color: 'white' }}
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                },
              }}
            />

            <MuiLink
              href="#"
              underline="hover"
              sx={{
                display: 'block',
                textAlign: 'right',
                mt: 1,
                mb: 2,
                fontSize: '13px',
                color: 'lightblue',
                cursor: 'pointer',
                '&:hover': {
                  color: '#ffcc80',
                },
              }}
            >
              Forgot password?
            </MuiLink>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '16px',
                borderRadius: 2,
                background: 'linear-gradient(90deg,rgb(16, 21, 170), #d62828)',
                '&:hover': {
                  background: 'linear-gradient(90deg,rgb(14, 29, 139), #aa1010)',
                },
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
