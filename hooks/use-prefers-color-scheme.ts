import { useEffect, useState } from 'react';

export const usePrefersColorScheme = (): 'light' | 'dark' => {
  const [state, setState] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    setState(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = () => {
      setState(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () =>
      mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return state;
};
