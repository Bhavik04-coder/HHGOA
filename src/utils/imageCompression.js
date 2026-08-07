import imageCompression from 'browser-image-compression'

/**
 * Compress image before upload
 * @param {File} file - Image file to compress
 * @returns {Promise<File>} Compressed image file
 */
export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 2, // Max file size in MB
    maxWidthOrHeight: 2048, // Max dimension
    useWebWorker: true, // Use web worker for better performance
    fileType: 'image/jpeg', // Convert to JPEG for better compression
    initialQuality: 0.85 // Quality setting (0-1)
  }

  try {
    // Skip compression for already small images
    if (file.size < 500000) { // Less than 500KB
      return file
    }

    const compressedFile = await imageCompression(file, options)
    
    // Return compressed file with original name
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now()
    })
  } catch (error) {
    console.error('Compression failed:', error)
    // Return original file if compression fails
    return file
  }
}

/**
 * Get image dimensions
 * @param {File} file - Image file
 * @returns {Promise<{width: number, height: number}>}
 */
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      
      img.onerror = reject
      img.src = e.target.result
    }
    
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Optimize image for display (create thumbnail)
 * @param {string} dataUrl - Image data URL
 * @param {number} maxSize - Maximum dimension
 * @returns {Promise<string>} Optimized data URL
 */
export const createOptimizedPreview = (dataUrl, maxSize = 800) => {
  return new Promise((resolve) => {
    const img = new Image()
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      let width = img.width
      let height = img.height
      
      // Calculate new dimensions
      if (width > height) {
        if (width > maxSize) {
          height = Math.round((height * maxSize) / width)
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = Math.round((width * maxSize) / height)
          height = maxSize
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw optimized image
      ctx.drawImage(img, 0, 0, width, height)
      
      // Return optimized data URL
      resolve(canvas.toDataURL('image/jpeg', 0.9))
    }
    
    img.src = dataUrl
  })
}
