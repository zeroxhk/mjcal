import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="xl">
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              MJCal
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
