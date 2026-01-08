'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onClick?: () => void
}

export function SplineScene({ scene, className, onClick }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-blue-500/70 text-sm font-medium animate-pulse">Loading 3D Scene...</span>
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
  )
}

