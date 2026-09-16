import React from 'react';

export const AlkutshLogo = ({ className = "h-9", light = true }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={light ? "./assets/alkutsh_logo_white.svg" : "./assets/alkutsh_logo_dark.svg"}
        alt="ALKUTSH DESIGNS"
        className="h-full w-auto object-contain select-none"
      />
    </div>
  );
};
