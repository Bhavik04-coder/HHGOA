import React, { useState, useRef, useCallback } from 'react'
import { Upload, Cloud, CheckCircle, FileImage, Sparkles } from 'lucide-react'
import { validateImage, formatFileSize, readImageFile } from '../../utils/helpers'
import { compressImage } from '../../utils/imageCompression'
import { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from '../../utils/constants'

const ImageUpload = ({ onImageSelect, selectedImage, imagePreview }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [compressionProgress, setCompressionProgress] = useState(0)
  const fileInputRef = useRef(null)
  const dragCounter = useRef(0)

  const handleFileValidationAndRead = useCallback(async (file) => {
    setError(null)
    setIsLoading(true)
    setCompressionProgress(0)

    // Validate file
    const validation = validateImage(file, MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES)
    
    if (!validation.valid) {
      setError(validation.error)
      setIsLoading(false)
      return
    }

    try {
      // Show compression progress
      setCompressionProgress(30)
      
      // Compress image before processing
      const compressedFile = await compressImage(file)
      
      setCompressionProgress(60)
      
      // Read compressed file and convert to data URL
      const dataUrl = await readImageFile(compressedFile)
      
      setCompressionProgress(100)
      
      onImageSelect(compressedFile, dataUrl)
    } catch (err) {
      setError('Failed to process image. Please try again.')
      console.error('Error processing file:', err)
    } finally {
      setIsLoading(false)
      setCompressionProgress(0)
    }
  }, [onImageSelect])

  const handleFileSelect = useCallback((event) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileValidationAndRead(file)
    }
  }, [handleFileValidationAndRead])

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  // Drag and Drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    dragCounter.current = 0

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileValidationAndRead(files[0])
    }
  }, [handleFileValidationAndRead])

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic,image/heif"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!imagePreview ? (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative glass-card p-8 sm:p-12 md:p-16 transition-all duration-300 cursor-pointer group
            ${isDragging ? 'border-goa-orange border-4 bg-goa-orange/10 scale-105' : 'border-2 border-white/20 active:border-goa-purple/50'}
            ${error ? 'border-red-500/50' : ''}
            touch-manipulation
          `}
          onClick={handleUploadClick}
        >
          {/* Upload Icon and Text */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
            {isLoading ? (
              <>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-goa-purple/30 border-t-goa-purple rounded-full animate-spin"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-goa-purple animate-pulse" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg sm:text-xl font-semibold text-gray-300 gradient-text-animate">
                    {compressionProgress > 0 ? 'Optimizing image...' : 'Loading...'}
                  </p>
                  {compressionProgress > 0 && (
                    <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-goa-orange via-goa-purple to-goa-blue transition-all duration-300"
                        style={{ width: `${compressionProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </>
            ) : isDragging ? (
              <>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-goa-orange to-goa-sunset flex items-center justify-center animate-scale-pulse shadow-2xl">
                  <Cloud className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-bounce" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold gradient-text-animate mb-2">Drop your image here!</p>
                  <p className="text-sm sm:text-base text-gray-400">Release to upload</p>
                </div>
              </>
            ) : (
              <>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-goa-orange via-goa-purple to-goa-blue flex items-center justify-center group-active:scale-95 transition-all duration-300 shadow-2xl">
                  <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-goa-orange animate-pulse" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-white mb-2 px-2">
                    <span className="hidden sm:inline gradient-text-animate">Drag & Drop your photo here</span>
                    <span className="sm:hidden gradient-text-animate">Tap to upload your photo</span>
                  </p>
                  <p className="text-gray-400 text-base sm:text-lg mb-3 sm:mb-4 hidden sm:block">or</p>
                  <button
                    type="button"
                    className="btn-primary inline-flex items-center space-x-2 min-h-[48px] touch-manipulation group"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUploadClick()
                    }}
                  >
                    <FileImage className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Click to Upload</span>
                    <span className="sm:hidden">Choose Photo</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 space-y-1">
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    JPG, PNG, HEIC supported
                  </p>
                  <p>Max size: {formatFileSize(MAX_IMAGE_SIZE)}</p>
                </div>
              </>
            )}
          </div>

          {/* Decorative corners - hidden on mobile */}
          <div className="hidden sm:block absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-goa-orange/30 rounded-tl-lg"></div>
          <div className="hidden sm:block absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-goa-purple/30 rounded-tr-lg"></div>
          <div className="hidden sm:block absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-goa-blue/30 rounded-bl-lg"></div>
          <div className="hidden sm:block absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-goa-sunset/30 rounded-br-lg"></div>
        </div>
      ) : (
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-gray-300 font-medium">Image uploaded successfully</span>
            <Sparkles className="w-4 h-4 text-goa-orange animate-pulse" />
          </div>
          {selectedImage && (
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <FileImage className="w-4 h-4" />
              {selectedImage.name} · {formatFileSize(selectedImage.size)}
            </p>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-red-400 font-medium">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-300 hover:text-red-200 text-sm mt-1 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
