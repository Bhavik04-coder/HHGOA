import React, { useCallback, useMemo, useRef } from 'react'

const BuilderCard = ({ imagePreview, name, role, title, className = '' }) => {
  const cardRef = useRef(null)
  const glareRef = useRef(null)

  const serial = useMemo(() => {
    return `HHG-2026-${String(
      (name || 'GOA').split('').reduce((total, char) => total + char.charCodeAt(0), 247) % 9999
    ).padStart(4, '0')}`
  }, [name])

  const nameFontSize = useMemo(() => {
    const len = (name || 'ANONYMOUS BUILDER').length
    if (len > 24) return '3.6cqw'
    if (len > 18) return '4.8cqw'
    if (len > 12) return '6.0cqw'
    return '6.8cqw'
  }, [name])

  const tilt = useCallback(event => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const rx = (0.5 - y) * 12
    const ry = (x - 0.5) * 12
    card.style.transition = 'transform 80ms linear, box-shadow 80ms linear'
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
    card.style.boxShadow = `${-ry}px ${rx + 14}px 24px rgba(0, 20, 10, .48)`
    if (glareRef.current) {
      glareRef.current.style.opacity = '1'
      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.3), transparent 38%)`
    }
  }, [])

  const reset = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 420ms cubic-bezier(.2,.8,.2,1), box-shadow 420ms ease'
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)'
    card.style.boxShadow = '8px 10px 0 rgba(0,38,21,.35)'
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }, [])

  return (
    <article
      ref={cardRef}
      onPointerMove={tilt}
      onPointerLeave={reset}
      onPointerUp={reset}
      onPointerCancel={reset}
      onPointerDown={event => event.currentTarget.setPointerCapture?.(event.pointerId)}
      onBlur={reset}
      tabIndex="0"
      className={`builder-card builder-card-3d relative aspect-[4/5] overflow-hidden border-2 border-yellow-300 bg-[#004b2c] ${className}`}
      aria-label="HH Goa Builder Pass preview. Move or drag to tilt."
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-30 hh-grid" />
      
      {/* Inner pink boundary */}
      <div className="pointer-events-none absolute inset-[2.22cqw] border border-pink-500/80" />

      {/* Header section */}
      <div className="absolute left-[6.48cqw] right-[6.48cqw] top-[4%] text-center">
        <div className="flex items-center justify-between">
          <p className="hh-mono text-[2.04cqw] font-bold tracking-[.4em] text-yellow-200">BUILDER PASS</p>
          <span className="hh-mono text-[1.48cqw] font-black text-yellow-300 text-right leading-tight">
            2:47<br />STUDIO
          </span>
        </div>
        
        {/* Centered HACKERगोवाHOUSE to prevent overlapping */}
        <h2 className="mt-[1.5cqw] flex items-center justify-center gap-[1.5cqw] font-sans text-[5.93cqw] font-black leading-none tracking-[0.05em] text-yellow-300 uppercase">
          <span>HACKER</span>
          <span className="hh-pink font-serif tracking-normal text-[5.0cqw] transform translate-y-[-0.3cqw] select-none">
            गोवा
          </span>
          <span>HOUSE</span>
        </h2>
        
        <p className="mt-[2%] hh-mono text-[1.94cqw] text-yellow-200 font-bold whitespace-nowrap">
          GOA, INDIA · 28—31 OCT 2026
        </p>
      </div>

      {/* Header divider line */}
      <div className="absolute top-[16.67cqw] left-[6.48cqw] right-[6.48cqw] border-b border-yellow-300/60" />

      {/* Photo Container */}
      <div className="absolute left-[15.37cqw] top-[20.83cqw] w-[69.26cqw] h-[69.26cqw] border-[1.3cqw] border-pink-500 bg-yellow-300 p-[1.3cqw] shadow-[.8cqw_.8cqw_0_#ffe11a]">
        {/* Inner green corners */}
        <i className="absolute left-[2.4cqw] top-[2.4cqw] z-10 h-[6cqw] w-[6cqw] border-l-[.7cqw] border-t-[.7cqw] border-[#005c35]" />
        <i className="absolute right-[2.4cqw] top-[2.4cqw] z-10 h-[6cqw] w-[6cqw] border-r-[.7cqw] border-t-[.7cqw] border-[#005c35]" />
        
        {/* Image wrapper */}
        <div className="relative h-full overflow-hidden border border-[#004b2c]">
          <img
            src={imagePreview || ''}
            alt="Builder"
            className="h-full w-full object-cover saturate-[.85] contrast-110"
            style={{ display: imagePreview ? 'block' : 'none' }}
          />
          <div className={`absolute inset-0 flex items-center justify-center bg-[#d8c414] hh-mono text-[3cqw] text-[#005c35] ${imagePreview ? 'hidden' : ''}`}>
            UPLOAD PHOTO
          </div>
        </div>

        {/* VERIFIED Badge */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] z-20 whitespace-nowrap border border-[#005c35] bg-yellow-300 px-[6%] py-[1.5%] hh-mono text-[1.8cqw] font-bold text-[#005c35] leading-none shadow-[2px_2px_0_rgba(0,0,0,0.15)]">
          VERIFIED
        </span>
      </div>

      {/* Text Container / Fields */}
      <div className="absolute left-[8%] right-[8%] top-[93cqw] flex flex-col items-center text-center">
        <p className="hh-mono text-[2.2cqw] font-bold uppercase text-pink-400 leading-none">
          {title}
        </p>
        <h3 
          className="mt-[1.8cqw] break-words font-sans font-black uppercase leading-[0.95] tracking-[-.045em] text-yellow-100 w-full"
          style={{ fontSize: nameFontSize }}
        >
          {name || 'ANONYMOUS BUILDER'}
        </h3>
        <p className="mt-[1.5cqw] hh-mono text-[2.5cqw] font-bold text-yellow-300 leading-none">
          @{(name || 'builder').trim().replace(/\s+/g, '').toLowerCase()}
        </p>
        <div className="mt-[2.2cqw] flex items-center justify-center border border-yellow-300/60 px-[4%] py-[1.2%] h-[4.44cqw] max-w-full">
          <span className="hh-mono text-[1.76cqw] text-yellow-100 whitespace-nowrap overflow-hidden text-ellipsis uppercase">
            STACK: {role || '—'}
          </span>
        </div>
      </div>

      {/* Separator line above bottom section */}
      <div className="absolute top-[114.80cqw] left-[6.48cqw] right-[6.48cqw] border-t border-yellow-300/50" />

      {/* Bottom Section */}
      {/* Left Column (Serial Verification) */}
      <div className="absolute left-[6.48cqw] bottom-[3.5cqw] flex flex-col items-start text-left">
        <p className="hh-mono text-[1.39cqw] text-yellow-100/70 leading-none">SERIAL VERIFICATION ID</p>
        <p className="mt-[0.4cqw] hh-mono text-[2.31cqw] font-bold text-yellow-300 leading-none">{serial}</p>
        <div 
          className="mt-[0.8cqw] h-[2.04cqw] w-[16.67cqw] opacity-80" 
          style={{ background: 'repeating-linear-gradient(90deg,#ffe11a 0 2px,transparent 2px 4px,#ffe11a 4px 7px,transparent 7px 9px)' }} 
        />
      </div>

      {/* Center Column (Hashtag) */}
      <div className="absolute left-[62.5cqw] bottom-[3.5cqw] -translate-x-1/2 flex flex-col items-center text-center">
        <p className="hh-mono text-[2.4cqw] font-bold text-yellow-100 leading-none">#FrameInGoa</p>
        <p className="mt-[0.4cqw] hh-mono text-[1.3cqw] text-yellow-300 leading-none">hhgoa.com</p>
      </div>

      {/* Right Column (Grid Code) */}
      <div className="absolute right-[6.48cqw] bottom-[3.5cqw]">
        <div className="grid w-[8.33cqw] grid-cols-5 gap-[0.32cqw] border border-yellow-300 p-[0.65cqw]">
          {Array.from({ length: 25 }, (_, index) => (
            <i 
              key={index} 
              className={`${[0, 1, 4, 6, 7, 10, 12, 13, 16, 18, 20, 21, 24].includes(index) ? 'bg-yellow-300' : ''} aspect-square`} 
            />
          ))}
        </div>
      </div>

      {/* Interactive Glare Overlay */}
      <div ref={glareRef} className="builder-card-glare pointer-events-none absolute inset-0" />
    </article>
  )
}

export default BuilderCard
