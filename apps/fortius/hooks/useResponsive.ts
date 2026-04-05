'use client';

import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isMobile: isClient ? isMobile : false,
    isTablet: isClient ? isTablet : false,
    isDesktop: isClient ? isDesktop : false,
  };
};