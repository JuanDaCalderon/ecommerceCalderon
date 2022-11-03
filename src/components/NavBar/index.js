import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import CartWidget from '../CartWidget';

import logo from '../../assets/logo.svg'
import isotipo from '../../assets/isotipo.svg'
import { Divider } from '@mui/material';

const CustomNavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#F7F7F7',
  color: '#1F3B53',
}));

const NavBar = ({ categories, settings }) => {
  const paginas = [...categories];
  const perfil = [...settings];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <CustomNavBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Box
              component="img"
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 5 }}
              width={100}
              src={logo}
              alt="logo"
            />
          </Link>


          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {paginas.map((page, index) => (
                <Box key={index}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={`/category/${page}`}>
                      <Typography textAlign="center" sx={{ color: '#1F3B53' }}>
                        {page}
                      </Typography>
                    </Link>
                  </MenuItem>
                  {index !== paginas.length - 1 && (
                    <Divider></Divider>
                  )}
                </Box>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="span"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/">
              <Box
                component="img"
                sx={{
                  ml: 3,
                  display: { xs: 'flex', md: 'none' }
                }}
                width={45}
                src={isotipo}
                alt="logo"
              />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {paginas.map((page) => (
              <Link key={page} to={`/category/${page}`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ mt: 2, mb: 1, color: '#1F3B53', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <CartWidget sx={{ mr: 4, mt: 1, display: { xs: 'flex', md: 'flex' } }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user" src={''} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {perfil.map((setting, index) => (
                <Box key={index}>
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ color: '#1F3B53' }} textAlign="center">{setting}</Typography>
                  </MenuItem>
                  {index !== perfil.length - 1 && (
                    <Divider ></Divider>
                  )
                  }
                </Box>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </CustomNavBar>
  )
}

export default NavBar