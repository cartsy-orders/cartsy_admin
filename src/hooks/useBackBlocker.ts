// hooks/useBackBlocker.ts
"use client"; // Add this at the very top

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const useBackBlocker = (isAuthenticated: boolean) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) return;

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.__NAVIGATION_STATE === 'back') {
        router.replace(pathname);
      }
    };

    window.history.replaceState(
      { ...window.history.state, __NAVIGATION_STATE: 'current' },
      ''
    );

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isAuthenticated, router, pathname]);
};