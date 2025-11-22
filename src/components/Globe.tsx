import { useEffect, useRef, useState } from 'react';

interface Continent {
  name: string;
  path: string;
  offset: number;
}

const continents: Continent[] = [
  {
    name: 'Africa',
    path: 'M 180 140 Q 170 120, 180 100 Q 190 85, 200 90 Q 210 95, 215 110 Q 220 130, 210 150 Q 200 165, 180 140 Z',
    offset: 0
  },
  {
    name: 'Europe',
    path: 'M 200 70 Q 190 60, 200 50 Q 215 48, 225 55 Q 230 65, 220 75 Q 210 82, 200 70 Z',
    offset: 60
  },
  {
    name: 'Asia',
    path: 'M 250 60 Q 240 45, 260 40 Q 290 38, 320 50 Q 335 65, 330 85 Q 320 105, 300 110 Q 275 115, 260 100 Q 245 85, 250 60 Z',
    offset: 120
  },
  {
    name: 'North America',
    path: 'M 60 60 Q 50 45, 70 35 Q 95 30, 115 45 Q 125 60, 120 80 Q 110 100, 90 105 Q 70 100, 60 80 Q 55 70, 60 60 Z',
    offset: 240
  },
  {
    name: 'South America',
    path: 'M 100 130 Q 95 115, 105 105 Q 120 100, 130 110 Q 140 125, 135 145 Q 125 170, 110 175 Q 95 170, 100 130 Z',
    offset: 210
  },
  {
    name: 'Australia',
    path: 'M 310 160 Q 300 150, 315 145 Q 335 143, 350 150 Q 360 160, 355 175 Q 345 185, 330 180 Q 315 175, 310 160 Z',
    offset: 150
  },
  {
    name: 'Antarctica',
    path: 'M 80 200 Q 120 195, 180 200 Q 240 195, 300 200 Q 320 205, 280 210 Q 200 215, 120 210 Q 80 208, 80 200 Z',
    offset: 300
  }
];

interface GlobeProps {
  onContinentClick?: (continent: string) => void;
}

export default function Globe({ onContinentClick }: GlobeProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isDragging) {
      const animate = () => {
        setRotation(prev => (prev + 0.2) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentRotation(rotation);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setRotation(currentRotation + deltaX * 0.5);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentRotation(rotation);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - startX;
      setRotation(currentRotation + deltaX * 0.5);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-[400px] h-[400px]">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          style={{ 
            transform: `perspective(1000px) rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <defs>
            <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#1e40af" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="200"
            cy="200"
            r="180"
            fill="url(#globeGradient)"
            stroke="#60a5fa"
            strokeWidth="1"
            opacity="0.6"
          />

          {continents.map((continent, index) => {
            const angle = (rotation + continent.offset) % 360;
            const isVisible = angle > 90 && angle < 270;
            const scale = Math.cos((angle * Math.PI) / 180) * 0.5 + 0.5;
            const opacity = isVisible ? 0 : scale;
            
            return (
              <g
                key={continent.name}
                style={{
                  opacity,
                  transform: `scale(${0.7 + scale * 0.3})`,
                  transformOrigin: 'center',
                  transition: 'opacity 0.3s, transform 0.3s'
                }}
              >
                <path
                  d={continent.path}
                  fill={hoveredContinent === continent.name ? '#60a5fa' : '#e2e8f0'}
                  stroke="#94a3b8"
                  strokeWidth="1"
                  filter={hoveredContinent === continent.name ? 'url(#glow)' : undefined}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredContinent(continent.name)}
                  onMouseLeave={() => setHoveredContinent(null)}
                  onClick={() => onContinentClick?.(continent.name)}
                />
              </g>
            );
          })}

          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`lat-${i}`}
              x1="20"
              y1={20 + i * 30}
              x2="380"
              y2={20 + i * 30}
              stroke="#60a5fa"
              strokeWidth="0.5"
              opacity="0.2"
            />
          ))}

          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`lon-${i}`}
              x1={20 + i * 30}
              y1="20"
              x2={20 + i * 30}
              y2="380"
              stroke="#60a5fa"
              strokeWidth="0.5"
              opacity="0.2"
            />
          ))}
        </svg>

        {hoveredContinent && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-xl animate-scale-in">
              <p className="text-foreground font-medium">{hoveredContinent}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
