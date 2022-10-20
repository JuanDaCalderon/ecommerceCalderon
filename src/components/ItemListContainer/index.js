import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, CardActionArea, CardActions } from '@mui/material';

import isotipo from '../../assets/isotipo.svg'

const ItemListContainer = ({ greeting }) => {
  return (
    <Box component='main' height='100vh' overflow='auto' paddingY={12}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {Array.from(Array(18)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={isotipo}
                    alt="Product"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {greeting}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ItemListContainer