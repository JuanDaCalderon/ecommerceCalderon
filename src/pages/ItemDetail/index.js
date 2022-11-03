import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, Grid, Container, Card, CardMedia, Typography, Divider, Chip, Button } from '@mui/material';
import { ItemCount, Loader } from '../../components';

const ItemDetailContainer = () => {
  let navigate = useNavigate();
  const itemId = useParams();
  const productsState = useSelector(state => state.tienda);
  const [productDetail, setproductDetail] = useState({});
  const [amount, setamount] = useState(1);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    const newProductDetail = productsState.products.find(product => product.id === itemId.id) || null;
    if (newProductDetail) {
      setproductDetail(newProductDetail);
      setloading(false);
    }
    else {
      navigate('/');
    }
  }, [itemId, productsState, navigate]);

  const sumaHandleClick = () => {
    setamount(amount + 1);
  };

  const restaHandleClick = () => {
    if (amount > 1) setamount(amount - 1);
  };

  return (
    <Box component='main' height='100vh' overflow='auto' paddingY={14} >
      <Container Container maxWidth="xl" >
        {!loading ?
          <Grid container spacing={6}>
            <Grid item sm={12} md={6}>
              <Card sx={{ maxWidth: '100%' }}>
                <CardMedia
                  component="img"
                  image={productDetail.image}
                  alt={productDetail.title}
                />
              </Card>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography component='h1' variant="h2" gutterBottom>
                {productDetail.title}
              </Typography>
              <Divider />
              <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Chip label={productDetail.category} sx={{ margin: '1rem 0 0 0', fontSize: '1rem' }} />
                  </Grid>
                  <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography component='h2' variant="h4" color='secondary' sx={{ display: 'flex', marginTop: '0.5rem', fontWeight: '500' }}>
                      ${productDetail.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Typography variant="body1" sx={{ my: 5 }}>
                {productDetail.description}
              </Typography>
              <Box sx={{ marginBottom: '1rem' }}>
                <Grid container spacing={2} sx={{ display: 'flex' }}>
                  <Grid item md={6} lg={8}>
                    <Button variant="contained" color='secondary' startIcon={<ShoppingCartCheckoutIcon color='action' />}>
                      Agregar al carrito
                    </Button>
                  </Grid>
                  <Grid item md={6} lg={4} sx={{ display: 'flex' }}>
                    <ItemCount
                      amount={amount}
                      sumaHandleClick={sumaHandleClick}
                      restaHandleClick={restaHandleClick}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Box sx={{ my: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ p: 1 }}>{`Total Available ${productDetail.title}:`}</Typography>
                <Chip label={productDetail.quantity} variant="outlined" />
              </Box>
            </Grid>
          </Grid>
          :
          <Loader />
        }
      </Container >
    </Box>
  )
}

export default ItemDetailContainer