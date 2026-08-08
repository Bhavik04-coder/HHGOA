import React, { lazy, Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout/Layout'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import { ToastProvider } from './contexts/ToastContext'
const Hero = lazy(() => import('./components/Hero/Hero'))
function App() { return <ErrorBoundary><ToastProvider><Layout><Header /><main className="relative z-10 flex-1"><Suspense fallback={<div className="p-20 text-center hh-mono">LOADING BUILDER ID...</div>}><Hero /></Suspense></main><Footer /></Layout></ToastProvider></ErrorBoundary> }
export default App
