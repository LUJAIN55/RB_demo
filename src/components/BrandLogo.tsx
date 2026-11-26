import React, { useState } from 'react';

const PRIMARY_SVG_LOGO = '/assets/aistudio/RELAY_BUS-09_3aefcf03.svg';
const FALLBACK_PNG_LOGO = '/assets/aistudio/RELAY_BUS-09_586200e7.png';

interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-8 sm:h-9 w-auto',
  alt = 'RelayBus',
}) => {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <img
      src={useFallback ? FALLBACK_PNG_LOGO : PRIMARY_SVG_LOGO}
      alt={alt}
      onError={() => {
        if (!useFallback) {
          setUseFallback(true);
        }
      }}
      className={`${className} object-contain shrink-0 select-none`}
      draggable={false}
    />
  );
};
