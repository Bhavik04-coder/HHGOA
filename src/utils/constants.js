// Application Constants

export const APP_NAME = 'HH Goa 2026 Frame Generator'
export const APP_VERSION = '1.0.0'

// Frame options (to be used for future implementation)
export const FRAME_STYLES = {
  CLASSIC: 'classic',
  MODERN: 'modern',
  VINTAGE: 'vintage',
  MINIMAL: 'minimal',
}

// Image constraints
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/heic',
  'image/heif'
]

export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif']

// Canvas settings
export const CANVAS_MAX_WIDTH = 2000
export const CANVAS_MAX_HEIGHT = 2000
