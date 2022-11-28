import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Divider, TextField } from '@mui/material'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShortTextIcon from '@mui/icons-material/ShortText';
import { ecommerceContext } from '../../context/context';
import { toast } from 'react-toastify';

const CheckOutPage = () => {
  const { cart, setCart, products, setProducts } = useContext(ecommerceContext);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({ nombre: '', cedula: '', email: '', telefono: '', direccion: '' });

  useEffect(() => {
    const totalPrice = cart.products.reduce((acc, product) => {
      return acc + product.price * product.amount;
    }, 0);
    setTotal(totalPrice);
  }, [cart, total]);

  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const submitForm = () => {
    if (form.nombre.length !== 0 && form.cedula.length !== 0 && form.email.length !== 0 && form.telefono.length !== 0 && form.direccion.length !== 0) {
      toast.success('Compra realizada con exito');
      const newProducts = products.map((product) => {
        const productInCart = cart.products.find((cartProduct) => cartProduct.id === product.id);
        if (productInCart) {
          product.quantity = product.quantity - productInCart.amount;
        }
        return product;
      });
      setProducts(newProducts);
      setCart({ products: [] });
    }
    else toast.error('Por favor llene todos los campos');
  };

  return (
    <Box component='main' height='100vh' overflow='auto' paddingY={12}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              <ShoppingCartCheckoutIcon sx={{ fontSize: '2rem', margin: '0 1rem 0 0' }} />
              Checkout
            </Typography>
          </Grid>
          {
            cart.products.length > 0 && (
              <Grid item xs={6} sx={{ textAlign: 'end' }}>
                <Typography variant="h3" component="h2" gutterBottom>
                  <ShortTextIcon sx={{ fontSize: '2rem', margin: '0 1rem 0 0' }} />
                  Resumen
                </Typography>
              </Grid>
            )
          }
        </Grid>
        {
          cart.products.length <= 0 ?
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                No hay productos en el carrito
              </Typography>
              <Button variant="contained" component={Link} to='/'>Regresar y agregar productos al carrito para comprar</Button>
            </>
            :
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  <Grid item xs={12} >
                    <Card sx={{ display: 'flex', with: '100%', flexDirection: 'column' }}>
                      {cart.products.map((producto, index) => (
                        <Box component='div' key={index} sx={{ display: 'flex', width: '100%' }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 150 }}
                            image={producto.image}
                            alt="Product"
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <Typography component="div" variant="h5">
                                  {producto.title}
                                </Typography>
                                <Chip label={producto.category} />
                              </Box>
                              <Typography variant="subtitle1" color="text.secondary" component="div">
                                {producto.description}
                              </Typography>

                            </CardContent>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', textAlign: 'end' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography variant="h5" component="h2">
                                <b>$</b>{producto.price}
                              </Typography>
                              <Chip sx={{ marginY: 3 }} variant="outlined" label={`Cantidad: ${producto.amount}`} />
                            </CardContent>
                          </Box>
                        </Box>
                      ))}
                    </Card>
                  </Grid>
                </Grid>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  <Grid item xs={12} >
                    <Card sx={{ display: 'flex', with: '100%', flexDirection: 'column' }}>
                      <CardContent sx={{ textAlign: 'end', paddingBottom: '0' }}>
                        <Typography variant="h4" component="h3">
                          Formulario de envio
                        </Typography>
                      </CardContent>
                      <CardContent sx={{ flex: '1 0 auto', width: '100%' }}>
                        <TextField
                          required
                          sx={{ width: '100%', marginBottom: 2 }}
                          id="nombre"
                          label="Nombre"
                          onChange={handleChange('nombre')}
                        />
                        <TextField
                          required
                          sx={{ width: '100%', marginBottom: 2 }}
                          id="cedula"
                          label="Número de identificación"
                          onChange={handleChange('cedula')}
                        />
                        <TextField
                          required
                          sx={{ width: '100%', marginBottom: 2 }}
                          id="email"
                          label="Email"
                          onChange={handleChange('email')}
                        />
                        <TextField
                          required
                          sx={{ width: '100%', marginBottom: 2 }}
                          id="telefono"
                          label="Telélefono"
                          onChange={handleChange('telefono')}
                        />
                        <TextField
                          required
                          sx={{ width: '100%' }}
                          id="direccion"
                          label="Dirección de Envio"
                          onChange={handleChange('direccion')}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card>
                  {cart.products.map((producto, index) => (
                    <Box key={index}>
                      <CardContent sx={{ display: 'flex', flex: '1 0 auto' }}>
                        <Box component='div' sx={{ width: '70%' }}>
                          <Typography component="div" variant="h5">
                            {producto.title}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" component="div">
                            ${producto.price} x {producto.amount} und
                          </Typography>
                        </Box>
                        <Box component='div' sx={{ width: '30%', display: 'flex' }}>
                          <Typography component="div" variant="h5">
                            $ {producto.price * producto.amount}
                          </Typography>
                        </Box>
                      </CardContent>
                      {index !== cart.products.length - 1 && <Divider />}
                    </Box>
                  ))}
                  <Divider />
                  <Divider />
                  <CardContent sx={{ display: 'flex', flex: '1 0 auto', paddingBottom: 0 }}>
                    <Box component='div' sx={{ width: '70%' }}>
                      <Typography component="div" variant="h5" color='Highlight'>
                        ENVIO:
                      </Typography>
                    </Box>
                    <Box component='div' sx={{ width: '30%', display: 'flex' }}>
                      <Typography component="div" variant="h5" color='Highlight'>
                        $ 5000
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardContent sx={{ display: 'flex', flex: '1 0 auto' }}>
                    <Box component='div' sx={{ width: '70%' }}>
                      <Typography component="div" variant="h5">
                        TOTAL:
                      </Typography>
                    </Box>
                    <Box component='div' sx={{ width: '30%', display: 'flex' }}>
                      <Typography component="div" variant="h5">
                        $ {total + 5000}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to='/checkout' size="large" variant="contained" color="success" sx={{ width: '100%' }} onClick={submitForm}>
                      Comprar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
        }
      </Container>
    </Box>
  )
}

export default CheckOutPage