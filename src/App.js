import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import AppWrapper from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppWrapper />
    </ThemeProvider>
  );
}

export default App;
