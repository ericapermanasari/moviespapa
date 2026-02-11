// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-9156c3de27e1ec2f44f51e093659fb12');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/9156c3de27e1ec2f44f51e093659fb12/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/a7/03/83/a7038315f411b7b3eaec974d415e7e84.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="277a325e83144ef5809448401f7ab5ae"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/27/7a/32/277a325e83144ef5809448401f7ab5ae.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}