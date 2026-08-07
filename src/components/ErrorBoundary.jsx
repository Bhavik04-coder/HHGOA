import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Store error details
    this.setState({
      error,
      errorInfo
    })
    
    // In production, you would send this to an error reporting service
    // Example: Sentry.captureException(error)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4">
          <div className="max-w-2xl w-full glass-card p-8 md:p-12 text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
                <p className="text-red-400 font-mono text-sm break-all">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="text-gray-400 cursor-pointer hover:text-gray-300">
                      Error Details
                    </summary>
                    <pre className="mt-2 text-xs text-gray-500 overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-goa-orange via-goa-sunset to-goa-purple text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl active:scale-95"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reload Page</span>
              </button>
              
              <a
                href="/"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium rounded-xl transition-all duration-300 active:scale-95"
              >
                <span>Go to Home</span>
              </a>
            </div>

            {/* Help Text */}
            <p className="text-gray-500 text-sm mt-8">
              If the problem persists, please try clearing your browser cache or contact support.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
