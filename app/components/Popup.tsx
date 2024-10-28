import { useEffect, useRef } from 'react';

export default function AdsterraBanner(): JSX.Element {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.firstChild) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//paymentperiodiciceberg.com/82/f1/7f/82f17ff90a55bc3d928591d2e7fcaf96.js';
      
      bannerRef.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (bannerRef.current) {
        while (bannerRef.current.firstChild) {
          bannerRef.current.removeChild(bannerRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="mx-auto my-4 flex justify-center items-center"
    />
  );
}