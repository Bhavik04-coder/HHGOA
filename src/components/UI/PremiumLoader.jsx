import React from 'react'
import { Loader2, Sparkles } from 'lucide-react'

const PremiumLoader = ({ message = 'Loading...', size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated loader with gradient */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className={`absolute inset-0 ${sizes[size]} rounded-full bg-gradient-to-r from-goa-orange via-goa-purple to-goa-blue opacity-20 blur-xl animate-pulse`}></div>
        
        {/* Spinning gradient ring */}
        <div className={`relative ${sizes[size]}`}>
          <Loader2 className={`${sizes[size]} text-transparent bg-gradient-to-r from-goa-orange via-goa-purple to-goa-blue bg-clip-text animate-spin-slow`} />
        </div>

        {/* Sparkle effect */}
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-goa-orange animate-pulse" />
      </div>

      {/* Loading text */}
      {message && (
        <div className="text-center space-y-2">
          <p className={`${textSizes[size]} font-semibold gradient-text animate-pulse`}>
            {message}
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-goa-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-goa-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-goa-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PremiumLoader
