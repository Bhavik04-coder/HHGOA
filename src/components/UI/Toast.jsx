import React, { useEffect } from 'react'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const variants = {
    success: {
      icon: CheckCircle,
      colors: 'from-green-500/20 to-emerald-500/20 border-green-500/50',
      iconColor: 'text-green-400',
      glow: 'shadow-green-500/20'
    },
    error: {
      icon: XCircle,
      colors: 'from-red-500/20 to-rose-500/20 border-red-500/50',
      iconColor: 'text-red-400',
      glow: 'shadow-red-500/20'
    },
    info: {
      icon: Info,
      colors: 'from-blue-500/20 to-cyan-500/20 border-blue-500/50',
      iconColor: 'text-blue-400',
      glow: 'shadow-blue-500/20'
    },
    warning: {
      icon: AlertTriangle,
      colors: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50',
      iconColor: 'text-yellow-400',
      glow: 'shadow-yellow-500/20'
    }
  }

  const variant = variants[type]
  const Icon = variant.icon

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-md w-full sm:w-auto
        bg-gradient-to-br ${variant.colors}
        backdrop-blur-2xl border rounded-2xl
        shadow-2xl ${variant.glow}
        animate-slide-in-right
        px-6 py-4
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${variant.iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1 pt-0.5">
          <p className="text-white font-medium leading-relaxed">{message}</p>
        </div>
        
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200 p-1 hover:bg-white/10 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Toast
