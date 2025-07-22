import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Inject the ad options script
    const optionsScript = document.createElement('script');
    optionsScript.type = 'text/javascript';
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '1fe444ce385d32ed8ca503408bbf8ddb',
        'format' : 'iframe',
        'height' : 60,
        'width' : '100%',
        'params' : {}
      };
    `;
    adRef.current.appendChild(optionsScript);

    // Inject the invoke script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/1fe444ce385d32ed8ca503408bbf8ddb/invoke.js';
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <div ref={adRef} style={{ width: '100%' }}></div>
    </div>
  );
}
