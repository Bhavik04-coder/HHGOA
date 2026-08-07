import React, { lazy, Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout/Layout'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import FloatingBlobs from './components/UI/FloatingBlobs'
import PremiumLoader from './components/UI/PremiumLoader'
import { ToastProvider } from './contexts/ToastContext'

// Lazy load Hero component
const Hero = lazy(() => import('./components/Hero/Hero'))

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <FloatingBlobs />
        <Layout>
          <Header />
          <main className="flex-1 relative z-10">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <PremiumLoader message="Loading..." size="xl" />
              </div>
            }>
              <Hero />
            </Suspense>
          </main>
          <Footer />
        </Layout>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
