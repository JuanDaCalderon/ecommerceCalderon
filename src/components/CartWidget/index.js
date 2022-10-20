import React from 'react'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/material';

const CartWidget = ({ sx }) => {

  return (
    <Box component="div" sx={sx}>
      <IconButton aria-label="cart">
        <Badge badgeContent={4} color="secondary">
          <ShoppingCartIcon color='primary'/>
        </Badge>
      </IconButton>
    </Box>
  )
}

export default CartWidget