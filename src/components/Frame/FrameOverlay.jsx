import React from 'react'
import CircularFrame from './CircularFrame'

const FrameOverlay = ({ imagePreview, className = '' }) => {
  return (
    <div className={`relative w-full aspect-square ${className}`}>
      {/* Image Layer - Behind frame */}
      <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-900">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center',
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center">
              <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-sm font-medium">No image uploaded</p>
            </div>
          </div>
        )}
      </div>

      {/* Frame Layer - On top of image */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <CircularFrame size="100%" className="w-full h-full" />
      </div>
    </div>
  )
}

export default FrameOverlay
