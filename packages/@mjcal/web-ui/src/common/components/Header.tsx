import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useT } from '../../locales/hooks/useT';
import { useNavigate } from '../../router/hooks/useNavigate';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const t = useT();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 10, zIndex: 999 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="xl" sx={{ display: 'flex' }}>
            <Typography
              variant="h6"
              component="h1"
              sx={{ cursor: 'pointer', mr: 'auto' }}
              onClick={() => navigate({ path: '/' })}
            >
              {t.appName}
            </Typography>
            <LanguageSwitcher />
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
