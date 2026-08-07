import React from 'react'
import { Menu } from 'lucide-react'

const Header = () => {
  return (
    <header className="w-full glass border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-goa-orange via-goa-purple to-goa-blue rounded-xl flex items-center justify-center shadow-lg" role="img" aria-label="HH Goa 2026 Logo">
              <span className="text-2xl font-bold text-white" aria-hidden="true">HH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">HH Goa 2026</h1>
              <p className="text-xs text-gray-400">Frame Generator</p>
            </div>
          </div>
          
          {/* Desktop Navigation - Hidden since not functional */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            {/* Navigation removed - Add real links when routes are implemented */}
          </nav>

          {/* Mobile Menu Button - Hidden since navigation is removed */}
          {/* <button 
            className="md:hidden text-gray-300 hover:text-goa-orange transition-colors"
            aria-label="Open navigation menu"
            aria-expanded="false"
          >
            <Menu className="w-6 h-6" />
          </button> */}
        </div>
      </div>
    </header>
  )
}

export default Header
