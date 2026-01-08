'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
  onClick?: () => void;
}

export function InteractiveRobotSpline({ scene, className, onClick }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-transparent ${className}`}>
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
            </svg>
            <span className="text-blue-500 font-medium animate-pulse">Loading 3D Agent...</span>
          </div>
        </div>
      }
    >
      <div onClick={onClick} className={onClick ? 'cursor-pointer' : ''}>
        <Spline
          scene={scene}
          className={className} 
        />
      </div>
    </Suspense>
  );
}

