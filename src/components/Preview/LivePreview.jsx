import React, { useState, useEffect, memo } from 'react'
import FrameOverlay from '../Frame/FrameOverlay'

const LivePreview = memo(({ imagePreview, frameMode = 'circular', className = '' }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [fadeKey, setFadeKey] = useState(0)

  // Reset animation when image changes
  useEffect(() => {
    if (imagePreview) {
      setIsImageLoaded(false)
      setFadeKey(prev => prev + 1)
    }
  }, [imagePreview])

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  // Circular frame mode - uses FrameOverlay component
  if (frameMode === 'circular') {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative aspect-square w-full max-w-2xl mx-auto">
          <div className="absolute inset-0">
            {imagePreview ? (
              <div
                key={fadeKey}
                className={`
                  w-full h-full
                  transition-opacity duration-500 ease-in-out
                  ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
                `}
              >
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10 rounded-full">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 border-4 border-goa-purple border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-400 font-medium">Loading preview...</p>
                    </div>
                  </div>
                )}
                
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="hidden"
                  onLoad={handleImageLoad}
                />

                <FrameOverlay imagePreview={imagePreview} />
              </div>
            ) : (
              <EmptyCircularPreview />
            )}
          </div>
        </div>
      </div>
    )
  }

  // Square frame mode (original)
  return (
    <div className={`w-full ${className}`}>
      <div className="relative aspect-square w-full max-w-2xl mx-auto">
        {/* Preview Container */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-gray-900">
          {imagePreview ? (
            <div
              key={fadeKey}
              className="w-full h-full relative"
            >
              {/* Loading overlay */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-goa-purple border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium">Loading preview...</p>
                  </div>
                </div>
              )}

              {/* Image with fade animation */}
              <img
                src={imagePreview}
                alt="Preview"
                className={`
                  w-full h-full object-contain
                  transition-opacity duration-500 ease-in-out
                  ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                onLoad={handleImageLoad}
                style={{ 
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          ) : (
            <EmptyPreview />
          )}
        </div>
      </div>
    </div>
  )
})

LivePreview.displayName = 'LivePreview'

const EmptyPreview = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm">
      {/* Animated placeholder icon */}
      <div className="relative mb-6">
        {/* Outer ring animation */}
        <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-goa-purple/20 animate-ping" style={{ animationDuration: '3s' }}></div>
        
        {/* Icon container */}
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-white/10 flex items-center justify-center shadow-xl">
          <svg 
            className="w-16 h-16 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2 px-4">
        <p className="text-gray-400 text-xl font-semibold">
          No image selected
        </p>
        <p className="text-gray-600 text-sm">
          Upload a photo to see the preview
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/5 rounded-tl-2xl"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/5 rounded-tr-2xl"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/5 rounded-bl-2xl"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/5 rounded-br-2xl"></div>
      </div>
    </div>
  )
}

const EmptyCircularPreview = () => {
  return (
    <div className="w-full h-full rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 sm:border-4 border-white/10">
      {/* Animated placeholder icon */}
      <div className="relative mb-4 sm:mb-6">
        {/* Outer ring animation */}
        <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-3 sm:border-4 border-goa-orange/20 animate-ping" style={{ animationDuration: '3s' }}></div>
        
        {/* Icon container */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-goa-orange/20 to-goa-purple/20 border-2 border-white/20 flex items-center justify-center shadow-xl">
          <svg 
            className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-1 sm:space-y-2 px-4">
        <p className="text-gray-400 text-base sm:text-xl font-semibold">
          Upload your photo
        </p>
        <p className="text-gray-600 text-xs sm:text-sm">
          to see it with the HH Goa 2026 frame
        </p>
      </div>
    </div>
  )
}

export default LivePreview
