/**
 * Download the framed image as PNG
 * @param {string} imageDataUrl - Base64 image data URL
 * @param {string} frameHtml - SVG frame HTML string
 * @param {string} filename - Download filename
 */
export const downloadFramedImage = async (imageDataUrl, filename = 'HH-Goa-2026-Frame.png') => {
  try {
    // Create canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const size = 1080
    
    canvas.width = size
    canvas.height = size
    
    // Load and draw the image first (background layer)
    const image = new Image()
    image.crossOrigin = 'anonymous'
    
    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = reject
      image.src = imageDataUrl
    })
    
    // Save context state
    ctx.save()
    
    // Create circular clip path for image
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    
    // Calculate image dimensions to cover the circle
    const imageAspect = image.width / image.height
    let drawWidth, drawHeight, offsetX, offsetY
    
    if (imageAspect > 1) {
      // Landscape image
      drawHeight = size
      drawWidth = drawHeight * imageAspect
      offsetX = (size - drawWidth) / 2
      offsetY = 0
    } else {
      // Portrait or square image
      drawWidth = size
      drawHeight = drawWidth / imageAspect
      offsetX = 0
      offsetY = (size - drawHeight) / 2
    }
    
    // Draw image (centered and covering the circle)
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
    
    // Restore context (remove clip)
    ctx.restore()
    
    // Now draw the SVG frame on top
    const svgString = getSVGFrameString(size)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    
    const svgImage = new Image()
    await new Promise((resolve, reject) => {
      svgImage.onload = resolve
      svgImage.onerror = reject
      svgImage.src = svgUrl
    })
    
    // Draw SVG frame on top
    ctx.drawImage(svgImage, 0, 0, size, size)
    
    // Clean up
    URL.revokeObjectURL(svgUrl)
    
    // Convert canvas to blob
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/png', 1.0)
    })
    
    // Download
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Error downloading framed image:', error)
    throw error
  }
}

/**
 * Get SVG frame as string for rendering
 * @param {number} size - Size of the SVG
 * @returns {string} SVG XML string
 */
const getSVGFrameString = (size) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B35" />
      <stop offset="50%" stop-color="#FF8C42" />
      <stop offset="100%" stop-color="#FFB830" />
    </linearGradient>
    <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#004E89" />
      <stop offset="50%" stop-color="#1A5F7A" />
      <stop offset="100%" stop-color="#2E8B9E" />
    </linearGradient>
    <linearGradient id="tropicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9B59B6" />
      <stop offset="50%" stop-color="#E74C3C" />
      <stop offset="100%" stop-color="#FF8C42" />
    </linearGradient>
    <linearGradient id="beachGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFB830" />
      <stop offset="50%" stop-color="#FF8C42" />
      <stop offset="100%" stop-color="#FF6B35" />
    </linearGradient>
    <linearGradient id="purpleBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9B59B6" />
      <stop offset="100%" stop-color="#004E89" />
    </linearGradient>
    <radialGradient id="goldShimmer" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFD700" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#FF8C42" stop-opacity="0.4" />
    </radialGradient>
  </defs>
  
  <circle cx="400" cy="400" r="380" fill="none" stroke="url(#tropicalGradient)" stroke-width="24" />
  <circle cx="400" cy="400" r="356" fill="none" stroke="url(#sunsetGradient)" stroke-width="8" opacity="0.7" />
  
  ${[...Array(32)].map((_, i) => {
    const angle = (i * 360) / 32
    const rad = (angle * Math.PI) / 180
    const x = 400 + 370 * Math.cos(rad)
    const y = 400 + 370 * Math.sin(rad)
    const colors = ['#FF6B35', '#9B59B6', '#004E89', '#FFB830']
    const color = colors[i % colors.length]
    return `<circle cx="${x}" cy="${y}" r="4" fill="${color}" opacity="0.8" />`
  }).join('')}
  
  <g transform="translate(120, 100) rotate(-15)">
    <path d="M 0,0 Q -20,-40 -25,-80 Q -28,-100 -30,-120 L -25,-118 Q -20,-90 -15,-60 Q -10,-30 0,0 Z" fill="url(#oceanGradient)" opacity="0.8" />
    <path d="M 0,0 Q 20,-40 25,-80 Q 28,-100 30,-120 L 25,-118 Q 20,-90 15,-60 Q 10,-30 0,0 Z" fill="url(#oceanGradient)" opacity="0.7" />
    <path d="M 0,0 Q -10,-35 -12,-70 Q -14,-85 -15,-100 L -12,-98 Q -10,-75 -8,-50 Q -5,-25 0,0 Z" fill="#2E8B9E" opacity="0.6" />
  </g>
  
  <g transform="translate(680, 100) rotate(15)">
    <path d="M 0,0 Q -20,-40 -25,-80 Q -28,-100 -30,-120 L -25,-118 Q -20,-90 -15,-60 Q -10,-30 0,0 Z" fill="url(#oceanGradient)" opacity="0.8" />
    <path d="M 0,0 Q 20,-40 25,-80 Q 28,-100 30,-120 L 25,-118 Q 20,-90 15,-60 Q 10,-30 0,0 Z" fill="url(#oceanGradient)" opacity="0.7" />
  </g>
  
  <g transform="translate(150, 700) rotate(165)">
    <path d="M 0,0 Q -15,-30 -20,-60 Q -22,-75 -25,-90 L -20,-88 Q -15,-65 -10,-40 Q -5,-20 0,0 Z" fill="url(#oceanGradient)" opacity="0.7" />
    <path d="M 0,0 Q 15,-30 20,-60 Q 22,-75 25,-90 L 20,-88 Q 15,-65 10,-40 Q 5,-20 0,0 Z" fill="#2E8B9E" opacity="0.6" />
  </g>
  
  <g transform="translate(650, 700) rotate(195)">
    <path d="M 0,0 Q -15,-30 -20,-60 Q -22,-75 -25,-90 L -20,-88 Q -15,-65 -10,-40 Q -5,-20 0,0 Z" fill="url(#oceanGradient)" opacity="0.7" />
    <path d="M 0,0 Q 15,-30 20,-60 Q 22,-75 25,-90 L 20,-88 Q 15,-65 10,-40 Q 5,-20 0,0 Z" fill="#2E8B9E" opacity="0.6" />
  </g>
  
  <g transform="translate(400, 650)">
    <path d="M -200,0 Q -150,-15 -100,-10 Q -50,-5 0,0 Q 50,5 100,0 Q 150,-5 200,-10" fill="none" stroke="url(#oceanGradient)" stroke-width="6" stroke-linecap="round" opacity="0.8" />
    <path d="M -180,20 Q -130,5 -80,10 Q -30,15 20,10 Q 70,5 120,10 Q 170,15 180,10" fill="none" stroke="#2E8B9E" stroke-width="5" stroke-linecap="round" opacity="0.6" />
    <path d="M -160,35 Q -110,25 -60,30 Q -10,35 40,30 Q 90,25 140,30" fill="none" stroke="#1A5F7A" stroke-width="4" stroke-linecap="round" opacity="0.4" />
  </g>
  
  <g transform="translate(400, 80)">
    <circle cx="0" cy="0" r="30" fill="url(#goldShimmer)" opacity="0.5" />
    <circle cx="0" cy="0" r="20" fill="url(#sunsetGradient)" opacity="0.7" />
    <circle cx="0" cy="0" r="12" fill="#FFB830" opacity="0.9" />
    ${[...Array(8)].map((_, i) => {
      const angle = (i * 360) / 8
      const rad = (angle * Math.PI) / 180
      const x1 = 25 * Math.cos(rad)
      const y1 = 25 * Math.sin(rad)
      const x2 = 40 * Math.cos(rad)
      const y2 = 40 * Math.sin(rad)
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFB830" stroke-width="3" stroke-linecap="round" opacity="0.6" />`
    }).join('')}
  </g>
  
  <text x="400" y="170" font-size="48" font-weight="900" fill="url(#sunsetGradient)" text-anchor="middle" font-family="Arial, sans-serif" letter-spacing="3">HH</text>
  
  <path id="topArc" d="M 200,200 A 250,250 0 0,1 600,200" fill="none" />
  <text font-size="42" font-weight="800" fill="url(#tropicalGradient)" font-family="Arial, sans-serif" letter-spacing="8">
    <textPath href="#topArc" startOffset="50%" text-anchor="middle">GOA 2026</textPath>
  </text>
  
  ${[
    { x: 180, y: 250, color: '#FFB830' },
    { x: 620, y: 250, color: '#FFB830' },
    { x: 200, y: 550, color: '#FF6B35' },
    { x: 600, y: 550, color: '#FF6B35' },
  ].map((star, i) => 
    `<g transform="translate(${star.x}, ${star.y})">
      <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="${star.color}" opacity="0.8" />
    </g>`
  ).join('')}
  
  <path id="bottomArc" d="M 220,600 A 250,250 0 0,0 580,600" fill="none" />
  <text font-size="24" font-weight="700" fill="url(#purpleBlueGradient)" font-family="Arial, sans-serif" letter-spacing="4">
    <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">PROFILE FRAME</textPath>
  </text>
  
  ${[
    { angle: 45, color: '#FF6B35' },
    { angle: 135, color: '#9B59B6' },
    { angle: 225, color: '#004E89' },
    { angle: 315, color: '#FFB830' },
  ].map((corner, i) => {
    const rad = (corner.angle * Math.PI) / 180
    const x = 400 + 340 * Math.cos(rad)
    const y = 400 + 340 * Math.sin(rad)
    return `<g transform="translate(${x}, ${y}) rotate(${corner.angle})">
      <circle cx="0" cy="0" r="8" fill="${corner.color}" opacity="0.7" />
      <circle cx="0" cy="0" r="12" fill="none" stroke="${corner.color}" stroke-width="2" opacity="0.5" />
    </g>`
  }).join('')}
  
  <circle cx="400" cy="400" r="310" fill="none" stroke="url(#beachGradient)" stroke-width="2" stroke-dasharray="10 10" opacity="0.4" />
</svg>`
}
