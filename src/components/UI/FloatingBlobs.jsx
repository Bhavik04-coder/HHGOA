import React from 'react'

const FloatingBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1 - Orange */}
      <div 
        className="absolute top-0 -left-40 w-96 h-96 bg-goa-orange/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        style={{ animationDelay: '0s' }}
      ></div>
      
      {/* Blob 2 - Purple */}
      <div 
        className="absolute top-0 -right-40 w-96 h-96 bg-goa-purple/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        style={{ animationDelay: '2s' }}
      ></div>
      
      {/* Blob 3 - Blue */}
      <div 
        className="absolute -bottom-40 left-20 w-96 h-96 bg-goa-blue/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        style={{ animationDelay: '4s' }}
      ></div>
      
      {/* Blob 4 - Sunset */}
      <div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-goa-sunset/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
        style={{ animationDelay: '6s' }}
      ></div>

      {/* Additional smaller blobs for depth */}
      <div 
        className="absolute top-1/3 left-1/3 w-64 h-64 bg-goa-orange/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob-reverse"
        style={{ animationDelay: '1s' }}
      ></div>
      
      <div 
        className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-goa-purple/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob-reverse"
        style={{ animationDelay: '3s' }}
      ></div>
    </div>
  )
}

export default FloatingBlobs
