/**
 * InteractiveFolder Component
 * A premium, interactive folder UI element that opens on click
 * to reveal contents with a "drifting" animation effect that responds to mouse movement.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  if (isNaN(num)) return hex;
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export function InteractiveFolder({ 
  color = '#82E16B', 
  size = 1, 
  items = [], 
  className = '',
  label,
  darkPapers = false,
  isOpen: controlledIsOpen,
  onToggle
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const maxVisibleItems = 3;
  const displayItems = items.slice(0, maxVisibleItems);
  while (displayItems.length < maxVisibleItems) {
    displayItems.push(null);
  }

  const folderBackColor = darkenColor(color, 0.22);
  
  // High-fidelity paper colors supporting both light paper and dark luxury stationery
  const paperColors = darkPapers 
    ? ['#0D281E', '#113527', '#174432'] 
    : [darkenColor('#ffffff', 0.1), darkenColor('#ffffff', 0.05), '#ffffff'];

  const paperBorderColors = darkPapers 
    ? 'rgba(130, 225, 107, 0.2)' 
    : 'rgba(0, 0, 0, 0.06)';

  const handleToggle = (e) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle(!isOpen);
    }
    if (!isControlled) {
      setInternalIsOpen(!isOpen);
    }
  };

  const handleMouseMove = (e, index) => {
    if (!isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setMousePos({ x, y });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  const getPaperTransform = (index) => {
    if (!isOpen) return { x: '-50%', y: '10%', rotate: 0, scale: 0.95 };
    
    const baseTransforms = [
      { x: '-120%', y: '-75%', rotate: -15 },
      { x: '10%', y: '-75%', rotate: 15 },
      { x: '-50%', y: '-105%', rotate: 5 }
    ];

    const base = baseTransforms[index] || { x: '-50%', y: '-50%', rotate: 0 };
    
    if (hoveredIndex === index) {
      return {
        x: `calc(${base.x} + ${mousePos.x}px)`,
        y: `calc(${base.y} + ${mousePos.y}px)`,
        rotate: base.rotate,
        scale: 1.15,
        zIndex: 40
      };
    }
    
    return {
      x: base.x,
      y: base.y,
      rotate: base.rotate,
      scale: 1,
      zIndex: 20 + index
    };
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ 
        transform: `scale(${size})`, 
        transformOrigin: 'center center',
        width: 120, 
        height: 100 
      }}
    >
      <div
        className="relative cursor-pointer group select-none"
        onClick={handleToggle}
        title={isOpen ? 'Click to close folder' : 'Click to open folder'}
      >
        {/* Folder Back Base */}
        <div
          className="relative w-[110px] h-[85px] transition-all duration-500 rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px]"
          style={{ 
            backgroundColor: folderBackColor,
            boxShadow: isOpen 
              ? '0 12px 35px -5px rgba(0,0,0,0.35)' 
              : '0 4px 14px -2px rgba(0,0,0,0.18)'
          }}
        >
          {/* Top Folder Tab */}
          <div
            className="absolute bottom-full left-0 w-[35px] h-[12px] rounded-t-[6px]"
            style={{ backgroundColor: folderBackColor }}
          />

          {/* Drifting Paper Elements */}
          {displayItems.map((item, i) => (
            <motion.div
              key={i}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={handleMouseLeave}
              animate={getPaperTransform(i)}
              transition={{ 
                type: 'spring', 
                stiffness: 280, 
                damping: 22,
                mass: 0.9 
              }}
              className="absolute left-1/2 flex items-center justify-center overflow-hidden transition-shadow"
              style={{
                backgroundColor: paperColors[i],
                borderRadius: '9px',
                width: i === 0 ? '78px' : i === 1 ? '88px' : '96px',
                height: i === 0 ? '68px' : i === 1 ? '72px' : '78px',
                boxShadow: hoveredIndex === i 
                  ? '0 14px 28px rgba(0,0,0,0.3), 0 0 15px rgba(130,225,107,0.2)' 
                  : '0 4px 12px rgba(0,0,0,0.15)',
                border: `1px solid ${paperBorderColors}`
              }}
            >
              {item || (
                <div className="w-full h-full p-2 flex flex-col gap-1.5 opacity-25">
                  <div className="w-3/4 h-1 bg-current rounded-full" />
                  <div className="w-1/2 h-1 bg-current rounded-full" />
                  <div className="w-2/3 h-1 bg-current rounded-full" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Folder Front Flap - Left Split */}
          <motion.div
            animate={{
              skewX: isOpen ? 16 : 0,
              scaleY: isOpen ? 0.58 : 1,
              translateY: isOpen ? 5 : 0
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="absolute inset-0 z-30 origin-bottom"
            style={{
              backgroundColor: color,
              borderRadius: '6px 12px 12px 12px',
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3)'
            }}
          />

          {/* Folder Front Flap - Right Split */}
          <motion.div
            animate={{
              skewX: isOpen ? -16 : 0,
              scaleY: isOpen ? 0.58 : 1,
              translateY: isOpen ? 5 : 0
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="absolute inset-0 z-30 origin-bottom"
            style={{
              backgroundColor: color,
              borderRadius: '6px 12px 12px 12px',
              clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)'
            }}
          >
            {label && !isOpen && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-extrabold text-[10px] tracking-wider uppercase whitespace-nowrap px-2 select-none drop-shadow-sm">
                {label}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveFolder;
