import React, { useEffect, useRef } from 'react';

export default function Banner1(): JSX.Element {
  const banner = useRef<HTMLDivElement | null>(null);

  const atOptions = {
    key: 'a4c0ad42899275d2ecea6a914152be0a',
    format: 'iframe',
    height: 600,
    width: 160,
    params: {},
  };

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highperformancedformats.com/${atOptions.key}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, []);

  return (
    <div
      className='mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center'
      ref={banner}
      style={{ transform: 'scale(0.8)' }}
    ></div>
  );
}