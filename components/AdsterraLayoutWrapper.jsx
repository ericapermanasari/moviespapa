"use client";

import { useEffect } from 'react';

export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scriptsLoaded = false;
      
      const loadAdScripts = () => {
        if (scriptsLoaded) return;
        
        // Memuat skrip iklan Native Banner
        const nativeBannerScript = document.createElement('script');
        nativeBannerScript.src = "//eminencehillsidenutrition.com/94239f574c56d0c3eb0e8dcb1de02d4f/invoke.js";
        nativeBannerScript.async = true;
        nativeBannerScript.setAttribute('data-cfasync', 'false');
        nativeBannerScript.id = 'adsterra-native-banner';
        document.body.appendChild(nativeBannerScript);

        // Memuat skrip iklan Popunder
        const popunderScript = document.createElement('script');
        popunderScript.type = 'text/javascript';
        popunderScript.src = "//eminencehillsidenutrition.com/de/bd/47/debd47641e0cd0c62f99d4a85fb3386e.js";
        popunderScript.async = true;
        popunderScript.id = 'adsterra-popunder';
        document.body.appendChild(popunderScript);

        // Memuat skrip iklan Social Bar
        const socialBarScript = document.createElement('script');
        socialBarScript.type = 'text/javascript';
        socialBarScript.src = "//eminencehillsidenutrition.com/2c/c8/07/2cc807a848d822dbc4048fe8a1a68dc4.js";
        socialBarScript.async = true;
        socialBarScript.id = 'adsterra-social-bar';
        document.body.appendChild(socialBarScript);

        scriptsLoaded = true;
      };

      // Delay loading untuk memastikan DOM siap
      const timer = setTimeout(loadAdScripts, 1000);

      return () => {
        clearTimeout(timer);
        
        // Hapus scripts jika ada
        const scriptsToRemove = [
          'adsterra-native-banner',
          'adsterra-popunder', 
          'adsterra-social-bar'
        ];
        
        scriptsToRemove.forEach(id => {
          const script = document.getElementById(id);
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
      };
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}