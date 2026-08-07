/**
 * Share to X (Twitter) with pre-filled text
 * @param {string} text - Tweet text
 * @param {string} url - Optional URL to include
 */
export const shareToX = (text, url = '') => {
  // Encode the text for URL
  const encodedText = encodeURIComponent(text)
  const encodedUrl = url ? encodeURIComponent(url) : ''
  
  // Build Twitter intent URL
  let twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`
  
  if (url) {
    twitterUrl += `&url=${encodedUrl}`
  }
  
  // Open in new window
  const width = 550
  const height = 420
  const left = (window.innerWidth - width) / 2
  const top = (window.innerHeight - height) / 2
  
  window.open(
    twitterUrl,
    'Share on X',
    `width=${width},height=${height},left=${left},top=${top},toolbar=0,scrollbars=1,status=0,resizable=1,location=0,menuBar=0`
  )
}

/**
 * Get default share text for HH Goa 2026
 */
export const getDefaultShareText = () => {
  return `Ready for HH Goa 2026 🚀

Excited to build with amazing people!

#FrameInGoa #HHGoa2026`
}
