import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1f3b53',
        },
        secondary: {
            main: '#f24e29',
        },
    },
    components:{
        MuiDivider:{
            styleOverrides:{
                root:{
                    margin: '0px !important',
                }
            }
        }
    }
});

export default theme