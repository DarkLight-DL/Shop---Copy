import React, { useState, useEffect, useMemo } from 'react';
import {
  Button, Typography, Box, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Grid, Card, CardContent, CardMedia,
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from './CreateContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CartPage = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Utility
  const parsePrice = (priceStr) =>
    typeof priceStr === 'string' ? parseFloat(priceStr.replace(/[^\d.-]/g, '')) : 0;
  

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = parsePrice(item.price);
      return isNaN(price) ? acc : acc + price * item.quantity;
    }, 0).toFixed(2);
  }, [cart]);
  

  const increaseQuantity = (item) => addToCart(item);
  const decreaseItemQuantity = async (item) => {
    if (item.quantity > 1) await decreaseQuantity(item);
  };

  // Restore past order if exists
  useEffect(() => {
    const restoreOrder = async () => {
      const cached = localStorage.getItem('orderData');
      if (cached) {
        setOrderData(JSON.parse(cached));
        setOrderPlaced(true);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/delever`);
        const data = await res.json();

        if (data?.length) {
          setOrderData(data[data.length - 1]);
          setOrderPlaced(true);
        } else {
          setOrderPlaced(false);
          localStorage.removeItem('orderData');
        }
      } catch (err) {
        console.error('Error checking active orders:', err);
      }
    };

    restoreOrder();
  }, []);

  // Handlers
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePlaceOrder = async () => {
    if (!cart.length) {
      alert('Your cart is empty.');
      return;
    }

    if (!address.trim()) {
      alert('Please enter a delivery address.');
      return;
    }

    if (paymentMethod === 'UPI') {
      const upiRegex = /^[\w.-]+@[a-zA-Z]+$/;
      if (!upiRegex.test(upiId)) {
        setUpiError('Please enter a valid UPI ID (e.g., yourname@bank)');
        return;
      }
    }

    setUpiError('');
    setLoading(true);

    const order = {
      items: cart,
      address,
      paymentMethod,
      upiId: paymentMethod === 'UPI' ? upiId : null,
      total: cartTotal,
      date: new Date().toISOString()
    };

    try {
      const response = await fetch(`${API_URL}/delever`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (!response.ok) throw new Error('Failed to save the order');

      setOrderData(order);
      setOrderPlaced(true);
      setOpen(false);
      clearCart();
      localStorage.setItem('orderData', JSON.stringify(order));
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const response = await fetch(`${API_URL}/delever`);
      if (!response.ok) throw new Error('Failed to fetch orders');

      const allOrders = await response.json();

      await Promise.all(
        allOrders.map(order =>
          fetch(`${API_URL}/delever/${order.id}`, {
            method: 'DELETE'
          })
        )
      );

      setOrderPlaced(false);
      setOrderData(null);
      localStorage.removeItem('orderData');
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Failed to cancel your order. Try again.');
    }
  };

  const isUPI = orderData?.paymentMethod === 'UPI' && orderData?.upiId;

  return (


    <Box sx={{ minHeight: '700px', mt: '80px', padding: 2 }}>

      <Typography variant="h3" fontStyle='revert-layer' fontWeight='bold' color='rgb(12, 39, 147)' gutterBottom>Your Cart</Typography>

      {cart.length === 0 && !orderPlaced ? (
        <Box sx={{ textAlign: 'center', mt: '150px' }}>
          <Typography variant='h5'>No items in the cart</Typography>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ bgcolor: 'rgb(181, 53, 33)', mt: '10px' }}>
              Go for a Shopping
            </Button>
          </Link>
        </Box>
      ) : (
        <>

          <Grid container spacing={2} justifyContent="space-evenly">
            {cart.map((item) => (
              <Grid item xs={6} sm={4} md={2.4} lg={2} key={`${item.id}-${item.name}`}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: { xs: 120, sm: 170 },
                    boxShadow: 3,
                    p: 1.2,
                    mx: 'auto',
                    background: 'linear-gradient(160deg,rgb(199, 198, 198),rgb(120, 119, 119))',
                    border: '1px solid #00bcd4',
                    borderRadius: '10px',
                    color: '#e0f7fa',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 0 16px rgba(0, 255, 255, 0.6)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: '100px',
                      width: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#121212',
                      borderBottom: '1px solid #00bcd4',
                      borderRadius: '6px',
                      mb: 1,
                    }}
                    image={item.img}
                    alt={item.name}
                  />
                  <CardContent sx={{ padding: '8px', textAlign: 'center', width: '100%' }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '14px',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 1,
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: '13px' }}>
                      Price: ${(parsePrice(item.price) * item.quantity).toFixed(2)}
                    </Typography>
                    <Typography sx={{ fontSize: '13px' }}>
                      Quantity: {item.quantity}
                    </Typography>
                  </CardContent>

                  {!orderPlaced && (
                    <>
                      <Box display="flex" justifyContent="center" alignItems="center" mb="8px">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => decreaseItemQuantity(item)}
                          sx={{ height: '30px', fontSize: '20px', mr: '5px' }}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => increaseQuantity(item)}
                          sx={{ height: '30px', fontSize: '20px' }}
                        >
                          +
                        </Button>
                      </Box>
                      <Box display="flex" justifyContent="center" alignItems="center" mb="8px">
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => {
                            if (window.confirm('Remove this item from your cart?')) {
                              removeFromCart(item);
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>


          <Box sx={{ mt: '50px', textAlign: 'center' }}>
            <Typography variant="h6">Total: ${cartTotal}</Typography>
          </Box>

          {!orderPlaced && (
            <Box sx={{ textAlign: 'center', mt: '30px' }}>
              <Button
                variant="contained"
                sx={{ bgcolor: 'rgb(155, 7, 7)' }}
                onClick={handleClickOpen}
              >
                place order
              </Button>
            </Box>
          )}
        </>
      )}

      {/* Checkout Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Checkout</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '300px' }}>
            <TextField
              label=" Delivery Address"
              variant="outlined"
              margin="dense"
              multiline
              minRows={3}
              maxRows={4}
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <FormControl sx={{ mt: 2 }}>
            <FormLabel>Payment Method</FormLabel>
            <RadioGroup
              row
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
            </RadioGroup>
          </FormControl>
          <Box>

            {paymentMethod === 'UPI' && (
              <TextField
                label="UPI ID"
                fullWidth
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                error={!!upiError}
                helperText={upiError}
                margin="dense"
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#fff' }}>Cancel</Button>
          <Button onClick={handlePlaceOrder} variant="contained" sx={{ bgcolor: '#00c853' }} disabled={loading}>
            {loading ? 'Placing...' : 'Place Order'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Confirmation */}
      {orderPlaced && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" sx={{ color: '#00e676' }}>✅ Your order has been placed! </Typography>
          {isUPI ? (
            <Typography sx={{ mt: 1 }}>
              Paid via UPI ID: <strong>{orderData.upiId}</strong>
            </Typography>
          ) : (
            <>
              <Typography sx={{ mt: 1 }}>
                Payment will be collected on delivery. <span style={{ color: 'red' }}> <i>Thank you for your purchase</i></span> <span style={{ color: 'blue' }}>(●◡●)</span>
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Address: {orderData.address}
              </Typography>
            </>
          )}
          {/* <Typography sx={{ mt: 1, color: '#00bcd4' }}>
            Date: {new Date(orderData?.date).toLocaleString()}
          </Typography> */}

          <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:1}}>

          <Typography sx={{ mt: 1, color: '#00bcd4' }}>
            Date: {new Date(orderData?.date).toLocaleDateString()}
          </Typography>
          <Typography sx={{ mt: 1, color: '#00bcd4' }}>
           & Time: {new Date(orderData?.date).toLocaleTimeString()}
          </Typography>
          </Box>

          <Typography sx={{ mt: 1 }}>
            Items Ordered: {orderData?.items.length}
          </Typography>
          <Typography>Total Paid: ${orderData?.total}</Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => {
              if (window.confirm("Are you sure you want to cancel your order?")) {
                handleCancelOrder();
              }
            }}
          >
            Cancel Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
