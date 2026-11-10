import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Flame, Play, Pause, X, Zap } from 'lucide-react';
import { soundService } from '../utils/soundService.ts';

type FireworkType = 'heart' | 'willow' | 'ring' | 'crackle' | 'random';

interface Rocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  distanceToTarget: number;
  distanceTraveled: number;
  coordinates: [number, number][];
  angle: number;
  speed: number;
  acceleration: number;
  brightness: number;
  hue: number;
  type: FireworkType;
}

interface Particle {
  x: number;
  y: number;
  coordinates: [number, number][];
  angle: number;
  speed: number;
  friction: number;
  gravity: number;
  hue: number;
  brightness: number;
  alpha: number;
  decay: number;
  size: number;
  flicker: boolean;
  type: FireworkType;
}

const COLOR_PALETTES = [
  330, // Pink
  345, // Rose
  45,  // Gold
  280, // Purple
  15,  // Coral
  190, // Cyan shimmer
];

export const CanvasFireworks: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
  fullScreenModal?: boolean;
  autoLaunch?: boolean;
}> = ({ isOpen = false, onClose, fullScreenModal = false, autoLaunch = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeType, setActiveType] = useState<FireworkType>('heart');
  const [isAutoShooting, setIsAutoShooting] = useState(autoLaunch);
  const [stats, setStats] = useState({ launched: 0 });

  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isAutoShootingRef = useRef(isAutoShooting);
  const activeTypeRef = useRef(activeType);

  isAutoShootingRef.current = isAutoShooting;
  activeTypeRef.current = activeType;

  // Create explosion particles at (x, y)
  const createExplosion = useCallback((x: number, y: number, type: FireworkType, baseHue: number) => {
    soundService.playFirework();
    setStats((prev) => ({ launched: prev.launched + 1 }));

    const resolvedType =
      type === 'random'
        ? (['heart', 'willow', 'ring', 'crackle'][Math.floor(Math.random() * 4)] as FireworkType)
        : type;

    if (resolvedType === 'heart') {
      // Parametric Heart Firework: x = 16 sin^3(t), y = -(13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t))
      const particleCount = 85;
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        const angle = Math.atan2(hy, hx);
        const rawDist = Math.sqrt(hx * hx + hy * hy);
        const speed = (rawDist / 16) * (Math.random() * 1.2 + 3.8);

        const hue = baseHue + (Math.random() - 0.5) * 35;
        particlesRef.current.push({
          x,
          y,
          coordinates: [
            [x, y],
            [x, y],
            [x, y],
          ],
          angle,
          speed,
          friction: 0.94,
          gravity: 0.6,
          hue: (hue + 360) % 360,
          brightness: Math.random() * 25 + 65,
          alpha: 1,
          decay: Math.random() * 0.014 + 0.012,
          size: Math.random() * 2.5 + 2,
          flicker: Math.random() > 0.4,
          type: 'heart',
        });
      }

      // Add spark center core
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particlesRef.current.push({
          x,
          y,
          coordinates: [
            [x, y],
            [x, y],
          ],
          angle,
          speed,
          friction: 0.92,
          gravity: 0.4,
          hue: 45, // Gold core
          brightness: 90,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.02,
          size: 2,
          flicker: true,
          type: 'heart',
        });
      }
    } else if (resolvedType === 'willow') {
      // Golden long-falling weeping willow
      const particleCount = 70;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1.5;
        particlesRef.current.push({
          x,
          y,
          coordinates: [
            [x, y],
            [x, y],
            [x, y],
            [x, y],
          ],
          angle,
          speed,
          friction: 0.96,
          gravity: 0.45, // gentle slow fall
          hue: 42 + Math.random() * 12, // Golden
          brightness: Math.random() * 30 + 65,
          alpha: 1,
          decay: Math.random() * 0.008 + 0.008, // Extra long trail
          size: Math.random() * 2 + 1.5,
          flicker: true,
          type: 'willow',
        });
      }
    } else if (resolvedType === 'ring') {
      // Double concentric circular rings
      const rings = [
        { count: 42, speed: 5.5, hue: baseHue },
        { count: 32, speed: 3.2, hue: (baseHue + 60) % 360 },
      ];

      rings.forEach((r) => {
        for (let i = 0; i < r.count; i++) {
          const angle = (i / r.count) * Math.PI * 2;
          particlesRef.current.push({
            x,
            y,
            coordinates: [
              [x, y],
              [x, y],
              [x, y],
            ],
            angle,
            speed: r.speed + (Math.random() - 0.5) * 0.4,
            friction: 0.95,
            gravity: 0.5,
            hue: r.hue,
            brightness: Math.random() * 20 + 70,
            alpha: 1,
            decay: Math.random() * 0.014 + 0.012,
            size: 2.2,
            flicker: false,
            type: 'ring',
          });
        }
      });
    } else {
      // Crackle Glitter Fireworks
      const particleCount = 80;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 1;
        particlesRef.current.push({
          x,
          y,
          coordinates: [
            [x, y],
            [x, y],
          ],
          angle,
          speed,
          friction: 0.92,
          gravity: 0.7,
          hue: baseHue + Math.random() * 40,
          brightness: 85,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          size: Math.random() * 3 + 1,
          flicker: Math.random() > 0.3,
          type: 'crackle',
        });
      }
    }
  }, []);

  // Launch rocket towards (targetX, targetY)
  const launchRocket = useCallback(
    (targetX: number, targetY: number, customType?: FireworkType) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const startX = Math.random() * (canvas.width * 0.6) + canvas.width * 0.2;
      const startY = canvas.height;

      const dx = targetX - startX;
      const dy = targetY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      const hue = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
      const type = customType || activeTypeRef.current;

      rocketsRef.current.push({
        x: startX,
        y: startY,
        targetX,
        targetY,
        startX,
        startY,
        distanceToTarget: distance,
        distanceTraveled: 0,
        coordinates: [
          [startX, startY],
          [startX, startY],
          [startX, startY],
        ],
        angle,
        speed: 3.5,
        acceleration: 1.055,
        brightness: Math.random() * 20 + 70,
        hue,
        type,
      });
    },
    []
  );

  // Trigger grand explosive barrage
  const triggerBarrage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    soundService.playSparkle();
    const width = canvas.width;
    const height = canvas.height;

    // Launch 7 rockets in an arc
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        const tx = (width * 0.15) + (i * (width * 0.7)) / 6 + (Math.random() - 0.5) * 40;
        const ty = height * 0.2 + (Math.random() * height * 0.25);
        const types: FireworkType[] = ['heart', 'willow', 'ring', 'crackle', 'heart'];
        launchRocket(tx, ty, types[i % types.length]);
      }, i * 220);
    }
  }, [launchRocket]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let lastAutoTime = Date.now();

    const loop = () => {
      animationFrameRef.current = requestAnimationFrame(loop);

      // Create smooth trailing alpha overlay
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Auto-launch periodic fireworks if enabled
      if (isAutoShootingRef.current && Date.now() - lastAutoTime > 900) {
        lastAutoTime = Date.now();
        const tx = Math.random() * (width * 0.7) + width * 0.15;
        const ty = Math.random() * (height * 0.45) + height * 0.15;
        launchRocket(tx, ty);
      }

      // Update & Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];

        r.coordinates.pop();
        r.coordinates.unshift([r.x, r.y]);

        r.speed *= r.acceleration;
        const vx = Math.cos(r.angle) * r.speed;
        const vy = Math.sin(r.angle) * r.speed;

        r.distanceTraveled = Math.sqrt(
          Math.pow(r.startX - r.x, 2) + Math.pow(r.startY - r.y, 2)
        );

        if (r.distanceTraveled >= r.distanceToTarget || r.y <= r.targetY || r.speed > 28) {
          createExplosion(r.targetX, r.targetY, r.type, r.hue);
          rocketsRef.current.splice(i, 1);
        } else {
          r.x += vx;
          r.y += vy;

          // Draw Rocket trail
          ctx.beginPath();
          ctx.moveTo(r.coordinates[r.coordinates.length - 1][0], r.coordinates[r.coordinates.length - 1][1]);
          ctx.lineTo(r.x, r.y);
          ctx.strokeStyle = `hsl(${r.hue}, 100%, ${r.brightness}%)`;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Rocket spark glow
          ctx.beginPath();
          ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      }

      // Update & Draw Explosion Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.coordinates.pop();
        p.coordinates.unshift([p.x, p.y]);

        p.speed *= p.friction;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed + p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= p.decay) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.moveTo(p.coordinates[p.coordinates.length - 1][0], p.coordinates[p.coordinates.length - 1][1]);
          ctx.lineTo(p.x, p.y);

          const brightness = p.flicker && Math.random() > 0.5 ? 95 : p.brightness;
          ctx.strokeStyle = `hsla(${p.hue}, 100%, ${brightness}%, ${p.alpha})`;
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Add shimmering sparkle head
          if (p.type === 'heart' && p.alpha > 0.4) {
            ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${p.alpha})`;
            ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
          }
        }
      }
    };

    loop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [createExplosion, launchRocket]);

  // Click on canvas to launch rocket directly to pointer location
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    launchRocket(x, y);
  };

  // Touch on canvas for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    launchRocket(x, y);
  };

  if (fullScreenModal && !isOpen) return null;

  return (
    <div
      className={
        fullScreenModal
          ? 'fixed inset-0 z-50 bg-black/95 flex flex-col justify-between overflow-hidden'
          : 'relative w-full rounded-3xl overflow-hidden border border-pink-500/30 bg-[#070308] shadow-2xl my-6'
      }
    >
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchStart={handleTouchStart}
        className="w-full h-full min-h-[420px] md:min-h-[500px] cursor-crosshair block select-none"
      />

      {/* Top Banner / Controls */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-pink-500/40 text-xs font-semibold text-pink-200">
          <Sparkles size={14} className="text-amber-300 animate-spin" />
          <span>Interactive Canvas Firework Sky</span>
          <span className="hidden sm:inline text-neutral-400">| Tap screen to explode</span>
        </div>

        {fullScreenModal && onClose && (
          <button
            onClick={onClose}
            className="pointer-events-auto w-9 h-9 rounded-full bg-black/70 hover:bg-neutral-800 text-neutral-200 hover:text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            title="Close Fireworks Sky"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Bottom Launcher Bar */}
      <div className="absolute bottom-4 inset-x-3 sm:inset-x-8 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none z-10">
        {/* Firework Pattern Selector */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-black/80 backdrop-blur-md border border-pink-500/30">
          {[
            { id: 'heart', label: '💖 Heart Burst' },
            { id: 'willow', label: '✨ Golden Willow' },
            { id: 'ring', label: '🎆 Ring Blast' },
            { id: 'crackle', label: '⚡ Crackle Flash' },
            { id: 'random', label: '🎲 Surprise' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => {
                soundService.playSparkle();
                setActiveType(type.id as FireworkType);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeType === type.id
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Action Triggers */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Mega Barrage Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerBarrage}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 shadow-xl border border-pink-200/40 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Zap size={15} className="animate-bounce" />
            <span>Grand Barrage (7x)</span>
          </motion.button>

          {/* Auto Sky Show Toggle */}
          <button
            onClick={() => {
              soundService.playSparkle();
              setIsAutoShooting((prev) => !prev);
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
              isAutoShooting
                ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/40'
                : 'bg-black/80 text-pink-300 border-pink-500/40 hover:bg-neutral-800'
            }`}
          >
            {isAutoShooting ? <Pause size={13} /> : <Play size={13} />}
            <span>{isAutoShooting ? 'Pause Auto' : 'Auto Show'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
