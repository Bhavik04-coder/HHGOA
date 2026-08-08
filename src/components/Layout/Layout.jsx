import React from 'react'

const Layout = ({ children }) => (
  <div className="hh-page relative flex min-h-screen flex-col overflow-hidden">
    <div className="hh-grid pointer-events-none absolute inset-0 opacity-30" />
    <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border-[18px] border-yellow-300/20" />
    {children}
  </div>
)

export default Layout
