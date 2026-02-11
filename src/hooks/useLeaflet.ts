import { useEffect, useRef, useState } from 'react';

interface UseLeafletResult {
  isLoaded: boolean;
  error: Error | null;
}

export const useLeaflet = (): UseLeafletResult => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const loadLeaflet = async () => {
      try {
        if (typeof window !== 'undefined' && window.L) {
          if (isMounted.current) setIsLoaded(true);
          return;
        }

        // Check if script is already loading
        const existingScript = document.querySelector(
          'script[src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"]'
        );

        if (existingScript) {
          existingScript.addEventListener('load', () => {
            if (isMounted.current) setIsLoaded(true);
          });
          return;
        }

        // Load CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        cssLink.integrity =
          'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        cssLink.crossOrigin = '';
        document.head.appendChild(cssLink);

        // Load JS
        await new Promise<void>((resolve, reject) => {
          const jsScript = document.createElement('script');
          jsScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          jsScript.integrity =
            'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          jsScript.crossOrigin = '';

          jsScript.onload = () => resolve();
          jsScript.onerror = () => reject(new Error('Failed to load Leaflet'));

          document.head.appendChild(jsScript);
        });

        if (isMounted.current) setIsLoaded(true);
      } catch (err) {
        if (isMounted.current) {
          setError(
            err instanceof Error ? err : new Error('Failed to load Leaflet')
          );
        }
      }
    };

    loadLeaflet();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { isLoaded, error };
};
