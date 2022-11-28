import React, { useContext, useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/material';
import { ecommerceContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const CartWidget = ({ sx }) => {
  const { cart, user } = useContext(ecommerceContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(user).length > 0 && localStorage.getItem('user')) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [user, cart]);

  const redirectAction = () => {
    if (!isLoggedIn) {
      toast.error('Debes iniciar sesión para poder acceder al carrito');
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
    else navigate('/cart')
  };

  return (
    <Box component="div" sx={sx}>
      <IconButton onClick={redirectAction} aria-label="cart">
        <Badge badgeContent={isLoggedIn ? cart.products.length : 'x'} color="secondary">
          <ShoppingCartIcon color='primary' />
        </Badge>
      </IconButton>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </Box>
  )
}

export default CartWidget