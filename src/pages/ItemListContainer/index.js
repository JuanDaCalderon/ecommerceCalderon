/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import { Button, CardActionArea, CardActions, Chip, Typography } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader } from '../../components';

const ItemListContainer = ({ productos }) => {
  const categoryId = useParams();
  let navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (categoryId.id) {
      const newProducts = productos.filter((item) => item.category === categoryId.id);
      if (newProducts.length > 0) {
        setItems(newProducts);
        setloading(false);
      } else {
        navigate('/');
      }
    }
    else {
      setItems(productos);
      setloading(false);
    }
  }, [categoryId, productos]);


  return (
    <Box component='main' height='100vh' overflow='auto' paddingY={12}>
      <Container maxWidth="xl">
        {!loading && productos.length ?
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {items.map((producto, index) => (
              <Grid sx={{ height: '100%' }} item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={producto.image}
                      alt="Product"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {producto.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`${producto.description.substr(0, 92)}...`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Grid container>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0.5rem 1rem 0.5rem 1rem' }}>
                          <Link to={`/item/${producto.id}`}>
                            <Button size="small" variant="contained" color="success">
                              Ver Más
                            </Button>
                          </Link>
                          <Chip label={`${producto.category.substr(0, 12)}...`} />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: '0.5rem 1rem 0.5rem 1rem' }}>
                          <Typography variant="h5" component="h2">
                            <b>$</b>{producto.price}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          :
          <Loader />
        }

      </Container>
    </Box>
  )
}

export default ItemListContainer