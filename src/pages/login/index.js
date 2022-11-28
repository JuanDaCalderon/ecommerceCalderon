import React, { useState, useContext } from 'react'
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    CardMedia,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Loader } from '../../components'
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ecommerceContext } from '../../context/context';

const Login = () => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorPassword, setIsErrorPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(ecommerceContext);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submitData = () => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                setIsErrorEmail(false);
                setIsErrorPassword(false);
                setUser({ ...userCredential.user });
                localStorage.setItem('user', JSON.stringify(userCredential.user));
                localStorage.setItem('x-user-token', JSON.stringify(userCredential.user.accessToken));
                localStorage.setItem('uid', JSON.stringify(userCredential.user.uid));
                toast.success(`Has iniciado sesión correctamente como ${userCredential.user.email}`);
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/');
                }, 4000);
            })
            .catch((error) => {
                const errorObject = { ...error };
                if (errorObject.code === 'auth/invalid-email') { toast.error('Ups parece que los datos de ingreso no son correctos, intenta de nuevo !'); setIsErrorEmail(true); setIsErrorPassword(false); }
                else if (errorObject.code === 'auth/wrong-password') { toast.error('Ups parece que la contraseña ingresada es incorrecta !'); setIsErrorPassword(true); setIsErrorEmail(false); }
                else { toast.error('Ups ha ocurrido un error, intenta de nuevo mas tarde!'); setIsErrorEmail(true); setIsErrorPassword(true); }
                setIsLoading(false);
            });
    }

    return (
        <Box component='main' height='100vh' paddingY={16} sx={{ background: '#1f3b53' }}>
            <Container maxWidth="xs">
                <Link to='/'>
                    <Button variant="text" sx={{ color: 'white' }} startIcon={<ReplyIcon sx={{ color: 'white' }} />}>
                        Volver
                    </Button>
                </Link>
                {isLoading && (<Loader />)}
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid sx={{ height: '100%' }} item xs={12}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="auto"
                                image={logo}
                                alt="logo"
                                sx={{ width: '70%', height: 'auto', margin: 'auto' }}
                            />
                            <Grid container>
                                <Grid item xs={12} sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: '0.5rem 1rem 0.5rem 1rem' }}>
                                    <Typography component="h1" variant='h5'>
                                        <b>
                                            INICIAR SESIÓN
                                        </b>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: '0.5rem 1rem 0.5rem 1rem' }}>
                                        <FormControl sx={{ width: '100%' }} variant="outlined">
                                            <TextField
                                                error={isErrorEmail}
                                                required
                                                name='email'
                                                id="email"
                                                label="Email"
                                                type='email'
                                                size="large"
                                                sx={{ width: '100%' }}
                                                onChange={handleChange('email')}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: '0.5rem 1rem 0.5rem 1rem' }}>
                                        <Box component="form" sx={{ width: '100%' }}>
                                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                                <InputLabel htmlFor="password">Contraseña</InputLabel>
                                                <OutlinedInput
                                                    error={isErrorPassword}
                                                    id="password"
                                                    name='password'
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    value={values.password}
                                                    onChange={handleChange('password')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Contraseña"
                                                    size='large'
                                                    autoComplete='true'
                                                    sx={{ width: '100%' }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Typography marginX={1}> No tienes una cuenta?  </Typography>
                                        <Link to='/registro'>
                                            <b>
                                                Registrarte
                                            </b>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid container>
                                    <Grid item xs={12} sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: '0.5rem 1rem 2rem 1rem' }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={submitData}
                                        >Iniciar Sesión</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={3000}
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

export default Login