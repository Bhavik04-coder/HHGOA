import React from 'react'

const Header = () => (
  <header className="relative z-20 border-b border-yellow-300/40">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
      <a href="#top" className="hh-mono text-xs font-bold leading-none sm:text-sm">2:47 PM<br />STUDIO</a>
      <div className="hidden items-center gap-8 sm:flex"><span className="hh-label">BUILDER ID / 2026</span><a href="https://hhgoa.com/" target="_blank" rel="noreferrer" className="hh-label hover:text-pink-400">HH GOA ↗</a></div>
      <a href="#generator" className="hh-button text-xs">MAKE YOUR ID</a>
    </div>
  </header>
)

export default Header
