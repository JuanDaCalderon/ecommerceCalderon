import React from 'react'
import { Box, Link, Typography, Container } from '@mui/material';

import footerStyles from './index.module.scss';

const Footer = () => {
  return (
    <Box component='footer' className={footerStyles.root} position="absolute" width='100%' bottom={0}>
      <Container maxWidth="xl">
        <Box className={footerStyles.wrapper}>
          <Box>
            <Typography className={footerStyles.footer_copyright} color="textSecondary" fontSize='0.7rem' sx={{ display: { xs: 'none', md: 'flex' }}}>
              {`© ${new Date().getFullYear()} Made by JuanDa Calderón`}
            </Typography>
            <Typography className={footerStyles.footer_copyright} color="textSecondary" fontSize='0.7rem' sx={{ display: { xs: 'flex', md: 'none' }}}>
              {`© ${new Date().getFullYear()} Made by`}<br/>
              JuanDa Calderón
            </Typography>
          </Box>
          <Box className={footerStyles.link_container}>
            <Typography component="div" fontSize='0.7rem' sx={{ mt: { xs: 1, md: 0 }}}>
              <Link href="https://www.coderhouse.com.co/" target="_blank" color="secondary" sx={{ textDecoration: "none" }}>
                {'Coder House'}
              </Link>
              <Link href="#" color="secondary" sx={{ pl: 3, textDecoration: "none" }}>
                {'Términos'}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer