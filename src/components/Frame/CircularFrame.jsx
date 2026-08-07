import React from 'react'

const CircularFrame = ({ size = 800, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient Definitions */}
      <defs>
        {/* Sunset Gradient */}
        <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="50%" stopColor="#FF8C42" />
          <stop offset="100%" stopColor="#FFB830" />
        </linearGradient>

        {/* Ocean Gradient */}
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#004E89" />
          <stop offset="50%" stopColor="#1A5F7A" />
          <stop offset="100%" stopColor="#2E8B9E" />
        </linearGradient>

        {/* Tropical Gradient */}
        <linearGradient id="tropicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9B59B6" />
          <stop offset="50%" stopColor="#E74C3C" />
          <stop offset="100%" stopColor="#FF8C42" />
        </linearGradient>

        {/* Beach Gradient */}
        <linearGradient id="beachGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB830" />
          <stop offset="50%" stopColor="#FF8C42" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>

        {/* Purple-Blue Gradient */}
        <linearGradient id="purpleBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9B59B6" />
          <stop offset="100%" stopColor="#004E89" />
        </linearGradient>

        {/* Gold Shimmer */}
        <radialGradient id="goldShimmer" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF8C42" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Outer Ring - Tropical Gradient */}
      <circle
        cx="400"
        cy="400"
        r="380"
        fill="none"
        stroke="url(#tropicalGradient)"
        strokeWidth="24"
      />

      {/* Second Ring - Sunset */}
      <circle
        cx="400"
        cy="400"
        r="356"
        fill="none"
        stroke="url(#sunsetGradient)"
        strokeWidth="8"
        opacity="0.7"
      />

      {/* Decorative Dots Around Frame */}
      {[...Array(32)].map((_, i) => {
        const angle = (i * 360) / 32
        const rad = (angle * Math.PI) / 180
        const x = 400 + 370 * Math.cos(rad)
        const y = 400 + 370 * Math.sin(rad)
        const colors = ['#FF6B35', '#9B59B6', '#004E89', '#FFB830']
        const color = colors[i % colors.length]
        
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="4"
            fill={color}
            opacity="0.8"
          />
        )
      })}

      {/* Palm Leaves - Top Left */}
      <g transform="translate(120, 100) rotate(-15)">
        <path
          d="M 0,0 Q -20,-40 -25,-80 Q -28,-100 -30,-120 L -25,-118 Q -20,-90 -15,-60 Q -10,-30 0,0 Z"
          fill="url(#oceanGradient)"
          opacity="0.8"
        />
        <path
          d="M 0,0 Q 20,-40 25,-80 Q 28,-100 30,-120 L 25,-118 Q 20,-90 15,-60 Q 10,-30 0,0 Z"
          fill="url(#oceanGradient)"
          opacity="0.7"
        />
        <path
          d="M 0,0 Q -10,-35 -12,-70 Q -14,-85 -15,-100 L -12,-98 Q -10,-75 -8,-50 Q -5,-25 0,0 Z"
          fill="#2E8B9E"
          opacity="0.6"
        />
      </g>

      {/* Palm Leaves - Top Right */}
      <g transform="translate(680, 100) rotate(15)">
        <path
          d="M 0,0 Q -20,-40 -25,-80 Q -28,-100 -30,-120 L -25,-118 Q -20,-90 -15,-60 Q -10,-30 0,0 Z"
          fill="url(#oceanGradient)"
          opacity="0.8"
        />
        <path
          d="M 0,0 Q 20,-40 25,-80 Q 28,-100 30,-120 L 25,-118 Q 20,-90 15,-60 Q 10,-30 0,0 Z"
          fill="url(#oceanGradient)"
          opacity="0.7"
        />
      </g>

      {/* Palm Leaves - Bottom Left */}
      <g transform="translate(150, 700) rotate(165)">
        <path
          d="M 0,0 Q -15,-30 -20,-60 Q -22,-75 -25,-90 L -20,-88 Q -15,-65 -10,-40 Q -5,-20 0,0 Z"
          fill="url(#oceanGradient)"
          opacity="0.7"
        />
        <path
          d="M 0,0 Q 15,-30 20,-60 Q 22,-75 25,-90 L 20,-88 Q 15,-65 10,-40 Q 5,-20 0,0 Z"
          fill="#2E8B9E"
          opacity="0.6"
        />
      </g>

      {/* Palm Leaves - Bottom Right */}
      <g transform="translate(650, 700) rotate(195)">
        <path
          d="M 0,0 Q -15,-30 -20,-60 Q -22,-75 -25,-90 L -20,-88 Q -15,-65 -10,-40 Q -5,-20 0,0 Z"
          fill="url(#oceanGradient)"
          opacity="0.7"
        />
        <path
          d="M 0,0 Q 15,-30 20,-60 Q 22,-75 25,-90 L 20,-88 Q 15,-65 10,-40 Q 5,-20 0,0 Z"
          fill="#2E8B9E"
          opacity="0.6"
        />
      </g>

      {/* Wave Graphics - Bottom Arc */}
      <g transform="translate(400, 650)">
        {/* Main Wave */}
        <path
          d="M -200,0 Q -150,-15 -100,-10 Q -50,-5 0,0 Q 50,5 100,0 Q 150,-5 200,-10"
          fill="none"
          stroke="url(#oceanGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Second Wave */}
        <path
          d="M -180,20 Q -130,5 -80,10 Q -30,15 20,10 Q 70,5 120,10 Q 170,15 180,10"
          fill="none"
          stroke="#2E8B9E"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Small Wave Details */}
        <path
          d="M -160,35 Q -110,25 -60,30 Q -10,35 40,30 Q 90,25 140,30"
          fill="none"
          stroke="#1A5F7A"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.4"
        />
      </g>

      {/* Sunset Accent Circles - Top */}
      <g transform="translate(400, 80)">
        <circle cx="0" cy="0" r="30" fill="url(#goldShimmer)" opacity="0.5" />
        <circle cx="0" cy="0" r="20" fill="url(#sunsetGradient)" opacity="0.7" />
        <circle cx="0" cy="0" r="12" fill="#FFB830" opacity="0.9" />
        
        {/* Sun Rays */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8
          const rad = (angle * Math.PI) / 180
          const x1 = 25 * Math.cos(rad)
          const y1 = 25 * Math.sin(rad)
          const x2 = 40 * Math.cos(rad)
          const y2 = 40 * Math.sin(rad)
          
          return (
            <line
              key={`ray-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFB830"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.6"
            />
          )
        })}
      </g>

      {/* Text Container - Top Arc */}
      <g>
        {/* HH Text - Top */}
        <text
          x="400"
          y="170"
          fontSize="48"
          fontWeight="900"
          fill="url(#sunsetGradient)"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          letterSpacing="3"
        >
          HH
        </text>

        {/* Goa 2026 Text - Following the arc */}
        <path
          id="topArc"
          d="M 200,200 A 250,250 0 0,1 600,200"
          fill="none"
        />
        <text
          fontSize="42"
          fontWeight="800"
          fill="url(#tropicalGradient)"
          fontFamily="Arial, sans-serif"
          letterSpacing="8"
        >
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">
            GOA 2026
          </textPath>
        </text>
      </g>

      {/* Decorative Stars */}
      {[
        { x: 180, y: 250, size: 8, color: '#FFB830' },
        { x: 620, y: 250, size: 8, color: '#FFB830' },
        { x: 200, y: 550, size: 6, color: '#FF6B35' },
        { x: 600, y: 550, size: 6, color: '#FF6B35' },
      ].map((star, i) => (
        <g key={`star-${i}`} transform={`translate(${star.x}, ${star.y})`}>
          <polygon
            points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2"
            fill={star.color}
            opacity="0.8"
          />
        </g>
      ))}

      {/* Bottom Text Container */}
      <g>
        {/* Bottom Arc Text Path */}
        <path
          id="bottomArc"
          d="M 220,600 A 250,250 0 0,0 580,600"
          fill="none"
        />
        <text
          fontSize="24"
          fontWeight="700"
          fill="url(#purpleBlueGradient)"
          fontFamily="Arial, sans-serif"
          letterSpacing="4"
        >
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
            PROFILE FRAME
          </textPath>
        </text>
      </g>

      {/* Decorative Corner Elements */}
      {[
        { angle: 45, color: '#FF6B35' },
        { angle: 135, color: '#9B59B6' },
        { angle: 225, color: '#004E89' },
        { angle: 315, color: '#FFB830' },
      ].map((corner, i) => {
        const rad = (corner.angle * Math.PI) / 180
        const x = 400 + 340 * Math.cos(rad)
        const y = 400 + 340 * Math.sin(rad)
        
        return (
          <g key={`corner-${i}`} transform={`translate(${x}, ${y}) rotate(${corner.angle})`}>
            <circle cx="0" cy="0" r="8" fill={corner.color} opacity="0.7" />
            <circle cx="0" cy="0" r="12" fill="none" stroke={corner.color} strokeWidth="2" opacity="0.5" />
          </g>
        )
      })}

      {/* Inner Decorative Ring */}
      <circle
        cx="400"
        cy="400"
        r="310"
        fill="none"
        stroke="url(#beachGradient)"
        strokeWidth="2"
        strokeDasharray="10 10"
        opacity="0.4"
      />

      {/* Transparent Center Circle (for reference, not visible) */}
      <circle
        cx="400"
        cy="400"
        r="300"
        fill="none"
        stroke="transparent"
        strokeWidth="1"
      />
    </svg>
  )
}

export default CircularFrame
