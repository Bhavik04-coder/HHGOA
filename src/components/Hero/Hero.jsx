import React, { useState, useCallback, memo } from 'react'
import { Download, Share2, Trash2, RefreshCw, Upload, Sparkles, Image as ImageIcon } from 'lucide-react'
import ImageUpload from '../Upload/ImageUpload'
import LivePreview from '../Preview/LivePreview'
import PremiumLoader from '../UI/PremiumLoader'
import { downloadFramedImage } from '../../utils/downloadFrame'
import { shareToX, getDefaultShareText } from '../../utils/shareToX'
import { useToast } from '../../contexts/ToastContext'

const Hero = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const toast = useToast()

  const handleImageSelect = useCallback((file, dataUrl) => {
    setSelectedImage(file)
    setImagePreview(dataUrl)
    toast.success('Image uploaded successfully! 🎉')
  }, [toast])

  const handleRemoveImage = useCallback(() => {
    setSelectedImage(null)
    setImagePreview(null)
    toast.info('Image removed')
  }, [toast])

  const handleDownload = useCallback(async () => {
    if (!imagePreview) return
    
    setIsDownloading(true)
    toast.info('Generating your frame...', 2000)
    
    try {
      await downloadFramedImage(imagePreview, 'HH-Goa-2026-Frame.png')
      toast.success('Frame downloaded successfully! 🎉')
    } catch (error) {
      console.error('Download failed:', error)
      toast.error('Failed to download. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }, [imagePreview, toast])

  const handleShareToX = useCallback(() => {
    const shareText = getDefaultShareText()
    shareToX(shareText)
    toast.success('Opening X... Share your excitement! 🐦')
  }, [toast])

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 flex-1 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Title Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
          <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 glass-card animate-float">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-goa-orange animate-pulse" />
              <span className="gradient-text-animate text-xs sm:text-sm font-bold tracking-wide">OFFICIAL FRAME GENERATOR</span>
              <Sparkles className="w-4 h-4 text-goa-purple animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 leading-tight px-2 animate-scale-pulse">
            <span className="gradient-text-animate goa-glow">HH Goa 2026</span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto font-light px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Create your official profile frame in seconds.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <ImageUpload
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            imagePreview={imagePreview}
          />
        </div>

        {/* Live Preview Section */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card glass-card-hover p-4 sm:p-6 md:p-8 lg:p-12 goa-glow relative overflow-hidden">
            {/* Animated shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 gradient-text-animate flex items-center justify-center gap-3">
                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                Live Preview
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
              </h2>
              
              {isDownloading ? (
                <div className="py-20">
                  <PremiumLoader message="Generating your premium frame..." size="xl" />
                </div>
              ) : (
                <LivePreview imagePreview={imagePreview} frameMode="circular" />
              )}

              {/* Action Buttons */}
              {imagePreview && !isDownloading && (
                <div className="flex flex-col items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {/* Primary Actions Row */}
                  <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="btn-primary w-full sm:w-auto min-h-[56px] group"
                    >
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                      <span>Download PNG</span>
                    </button>

                    <button
                      onClick={handleShareToX}
                      className="w-full sm:w-auto min-h-[56px] px-6 sm:px-8 py-4 bg-black hover:bg-gray-900 text-white font-bold rounded-xl transition-all duration-300 inline-flex items-center justify-center space-x-3 active:scale-95 border border-gray-700 hover:border-gray-600 touch-manipulation group relative overflow-hidden"
                    >
                      <Share2 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                      <span>Share on X</span>
                    </button>
                  </div>

                  {/* Secondary Actions Row */}
                  <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                    <button
                      onClick={handleRemoveImage}
                      className="btn-secondary w-full sm:w-auto min-h-[48px] group"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-red-400 transition-colors" />
                      <span>Remove Image</span>
                    </button>
                    
                    <button
                      onClick={handleRemoveImage}
                      className="btn-secondary w-full sm:w-auto min-h-[48px] group"
                    >
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                      <span className="hidden sm:inline">Upload New Photo</span>
                      <span className="sm:hidden">New Photo</span>
                    </button>
                  </div>

                  {/* Share Instructions */}
                  <div className="text-center mt-2 px-4">
                    <p className="text-xs sm:text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-goa-orange flex-shrink-0 animate-pulse" />
                      <span>Tip: Download your frame first, then share on X and attach the image manually</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Info */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Upload />}
            title="Drag & Drop"
            description="Simply drag your photo or click to upload"
            color="from-goa-orange to-goa-sunset"
            delay="0.8s"
          />
          <FeatureCard
            icon={<Download />}
            title="Download HD"
            description="Get your framed photo in high quality 1080x1080"
            color="from-goa-purple to-goa-blue"
            delay="1s"
          />
          <FeatureCard
            icon={<Share2 />}
            title="Share on X"
            description="Share your excitement for HH Goa 2026 instantly"
            color="from-goa-blue to-goa-ocean"
            delay="1.2s"
          />
        </div>
      </div>
    </section>
  )
}

const FeatureCard = memo(({ icon, title, description, color, delay }) => {
  return (
    <div 
      className="glass-card glass-card-hover p-5 sm:p-6 active:scale-95 transition-all duration-500 group touch-manipulation relative overflow-hidden animate-fade-in"
      style={{ animationDelay: delay }}
    >
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className={`text-white mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          {React.cloneElement(icon, { className: 'w-6 h-6 sm:w-7 sm:h-7' })}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-1 sm:mb-2 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
      </div>
    </div>
  )
})

FeatureCard.displayName = 'FeatureCard'

export default memo(Hero)
