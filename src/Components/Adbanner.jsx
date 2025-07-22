import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      atOptions = {
        'key' : '5c5030dbcab36b13735ff4aba9513e04',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    document.getElementById('ad-container')?.appendChild(script);
  }, []);

  return (
    <div id="ad-container"></div>
  );
}
