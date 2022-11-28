import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Divider } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShortTextIcon from '@mui/icons-material/ShortText';
import { ecommerceContext } from '../../context/context';

const CartPage = () => {
    const { cart, setCart } = useContext(ecommerceContext);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalPrice = cart.products.reduce((acc, product) => {
            return acc + product.price * product.amount;
        }, 0);
        setTotal(totalPrice);
    }, [cart, total]);

    const productRemoveCart = (producto) => {
        const newProductsArray = cart.products.filter((product) => product.id !== producto.id);
        const newCart = { ...cart, products: [...newProductsArray] };
        setCart(newCart);
    }

    return (
        <Box component='main' height='100vh' overflow='auto' paddingY={12}>
            <Container maxWidth="xl">
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            <ShoppingCartIcon sx={{ fontSize: '2rem', margin: '0 1rem 0 0' }} />
                            Carrito de compras
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
                            <Button variant="contained" component={Link} to='/'>Regresar y agregar productos al carrito</Button>
                        </>
                        :
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            <Grid item xs={12} sm={8}>
                                <Grid container spacing={{ xs: 2, md: 3 }}>
                                    {cart.products.map((producto, index) => (
                                        <Grid item xs={12} key={index}>
                                            <Card sx={{ display: 'flex', with: '100%' }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: 150 }}
                                                    image={producto.image}
                                                    alt="Product"
                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    <CardContent sx={{ flex: '1 0 auto', paddingBottom: '0' }}>
                                                        <Typography component="div" variant="h5">
                                                            {producto.title}
                                                        </Typography>
                                                        <Chip sx={{ marginY: '1rem' }} label={producto.category} />
                                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                                            {producto.description}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', width: '100%' }}>
                                                            <Typography variant="h5" component="h2">
                                                                <b>$</b>{producto.price}
                                                            </Typography>

                                                            <Chip variant="outlined" color="secondary" label={`Cantidad: ${producto.amount}`} />

                                                            <Link to={`/item/${producto.id}`}>
                                                                <Button size="small" variant="contained" color="success">
                                                                    Ver el producto
                                                                </Button>
                                                            </Link>
                                                            <Button size="small" variant="contained" color="error" onClick={() => productRemoveCart(producto)}>
                                                                Remover del carrito
                                                            </Button>
                                                        </Box>
                                                    </CardActions>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))}
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
                                    <CardContent sx={{ display: 'flex', flex: '1 0 auto' }}>
                                        <Box component='div' sx={{ width: '70%' }}>
                                            <Typography component="div" variant="h5">
                                                TOTAL:
                                            </Typography>
                                        </Box>
                                        <Box component='div' sx={{ width: '30%', display: 'flex' }}>
                                            <Typography component="div" variant="h5">
                                                $ {total}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Button component={Link} to='/checkout' size="large" variant="contained" color="info" sx={{ width: '100%' }}>
                                            Continuar al checkout
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

export default CartPage