'use client';

import { SplineScene } from '@/components/ui/splite';

interface RobotSceneProps {
  onClick?: () => void;
}

export default function RobotScene({ onClick }: RobotSceneProps) {
  return (
    <div className="w-full h-full relative">
      <SplineScene 
        scene="https://prod.spline.design/84j-Is2QiPhIQfXt/scene.splinecode"
        className="w-full h-full"
        onClick={onClick}
      />
      
      {/* Overlay to hide Spline watermark */}
      <div className="absolute bottom-0 right-0 w-44 h-14 bg-gradient-to-l from-white via-white to-transparent z-50 pointer-events-none" />
    </div>
  );
}
