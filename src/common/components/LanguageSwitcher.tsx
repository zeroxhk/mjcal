import { Button } from '@mui/material';
import { useLocale } from '../../locales/hooks/useLocale';

export const LanguageSwitcher = () => {
  const { t, setLocale, locale } = useLocale();
  console.log(locale);
  return {
    chinglish: () => (
      <Button color="inherit" onClick={() => setLocale('zh-hk')}>
        {t.locales.zhHk}
      </Button>
    ),
    'zh-hk': () => (
      <Button color="inherit" onClick={() => setLocale('chinglish')}>
        {t.locales.chinglish}
      </Button>
    ),
  }[locale]();
};
