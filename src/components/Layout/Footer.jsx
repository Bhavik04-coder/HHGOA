import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full glass border-t border-white/10 backdrop-blur-xl mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-goa-orange via-goa-purple to-goa-blue rounded-lg flex items-center justify-center" role="img" aria-label="HH Logo">
              <span className="text-sm font-bold text-white" aria-hidden="true">HH</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} HH Goa 2026. All rights reserved.
            </p>
          </div>
          
          {/* Built with Love */}
          <div className="text-gray-400 text-sm">
            Built with <span className="text-red-400" aria-label="love">❤️</span> for HH Goa 2026
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
