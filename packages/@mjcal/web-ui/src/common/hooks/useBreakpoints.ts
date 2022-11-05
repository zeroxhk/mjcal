import { Theme, useMediaQuery } from '@mui/material';

export const useBreakpoints = () => {
  const isMobile = useMediaQuery<Theme>(({ breakpoints }) => breakpoints.down('xl')).valueOf();

  return {
    isMobile,
    isDesktop: !isMobile,
  };
};
