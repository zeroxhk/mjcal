import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocale } from '../../locales/hooks/useLocale';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const { t } = useLocale();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="xl" sx={{ display: 'flex' }}>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              {t.appName}
            </Typography>
            <LanguageSwitcher />
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
