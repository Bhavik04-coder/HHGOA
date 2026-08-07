// Helper Functions

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Validate image file
 * @param {File} file - Image file to validate
 * @param {number} maxSize - Maximum file size in bytes
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {object} Validation result
 */
export const validateImage = (file, maxSize, allowedTypes) => {
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }
  
  // Check file type
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
  const isValidType = allowedTypes.includes(file.type) || 
                     ['.jpg', '.jpeg', '.png', '.heic', '.heif'].includes(fileExtension)
  
  if (!isValidType) {
    return { valid: false, error: 'Invalid file type. Please upload a JPG, PNG, or HEIC image.' }
  }
  
  // Check file size
  if (file.size > maxSize) {
    return { valid: false, error: `File size too large. Maximum size is ${formatFileSize(maxSize)}` }
  }
  
  return { valid: true, error: null }
}

/**
 * Read image file and convert to data URL
 * @param {File} file - Image file to read
 * @returns {Promise<string>} Data URL of the image
 */
export const readImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    
    reader.onerror = (error) => {
      reject(error)
    }
    
    reader.readAsDataURL(file)
  })
}

/**
 * Download file to user's device
 * @param {string} dataUrl - Data URL of the file
 * @param {string} filename - Name for the downloaded file
 */
export const downloadFile = (dataUrl, filename) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
