import React, { useCallback, useState } from 'react'
import { Download, RefreshCw, Share2, Trash2, Upload } from 'lucide-react'
import ImageUpload from '../Upload/ImageUpload'
import BuilderCard from '../BuilderCard/BuilderCard'
import { downloadBuilderCard } from '../../utils/downloadFrame'
import { shareToX, getDefaultShareText } from '../../utils/shareToX'
import { useToast } from '../../contexts/ToastContext'

const Hero = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const toast = useToast()
  const titleOptions = ['Signal Chaser', 'Ship It Specialist', 'Terminal Nomad', 'Build Station Regular', 'Idea-to-Impact Operator', 'Ocean-side Debugger']
  const builderTitle = titleOptions[((name + role).split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % titleOptions.length]
  const handleImageSelect = useCallback((file, url) => { setSelectedImage(file); setImagePreview(url); toast.success('Builder image uploaded.') }, [toast])
  const removeImage = useCallback(() => { setSelectedImage(null); setImagePreview(null) }, [])
  const download = useCallback(async () => { if (!imagePreview || !name.trim()) return; setIsDownloading(true); try { await downloadBuilderCard(imagePreview, { name: name.trim(), role: role.trim(), title: builderTitle }); toast.success('Builder ID downloaded — ready to post.') } catch { toast.error('Download failed. Please try again.') } finally { setIsDownloading(false) } }, [imagePreview, name, role, builderTitle, toast])
  const share = useCallback(() => { shareToX(`My HH Goa 2026 Builder ID is ready.\n\n${builderTitle} · ${role || 'builder'}\n\nDownload your card, attach it here, and show what you’re building.\n\n#FrameInGoa #HHGoa2026`); toast.info('Attach your downloaded Builder ID to finish the post.') }, [builderTitle, role, toast])
  return <section id="top" className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
    <div className="flex flex-wrap items-center justify-between gap-3 border-y border-yellow-300/40 py-3 hh-label"><span>GOA, INDIA</span><span>28 — 31 OCT 2026</span><span>FRAME / ID GENERATOR</span></div>
    <div className="relative py-12 text-center sm:py-16">
      <p className="hh-label mb-4">TASK #1 — BUILDER ID</p>
      <h1 className="hh-display text-[17vw] leading-[.72] text-yellow-300 sm:text-[9.8rem] lg:text-[11.8rem]">HACKER HOUSE</h1>
      <div className="hh-pink relative -mt-3 text-6xl font-black leading-none sm:-mt-6 sm:text-8xl">गोवा</div>
      <p className="mx-auto mt-7 max-w-xl text-sm leading-6 text-yellow-100/80 sm:text-base">Make a shareable HH Goa Builder ID in seconds. Upload your photo, download your card, and show the internet what you’re building.</p>
    </div>
    <div id="generator" className="grid gap-7 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
      <div className="hh-panel p-5 sm:p-7">
        <div className="mb-6 flex items-center justify-between"><span className="hh-label">01 / Builder details</span><Upload className="h-5 w-5" /></div>
        <div className="mb-6 grid gap-4">
          <label className="block"><span className="hh-label">Name <b className="text-pink-400">*</b></span><input value={name} onChange={e => setName(e.target.value.slice(0, 32))} placeholder="YOUR NAME" className="mt-2 w-full border-b border-yellow-300/60 bg-transparent px-0 py-3 font-serif text-2xl text-yellow-200 outline-none placeholder:text-yellow-200/35 focus:border-pink-400" /></label>
          <label className="block"><span className="hh-label">Stack / role</span><input value={role} onChange={e => setRole(e.target.value.slice(0, 42))} placeholder="FRONTEND · DESIGN · AI" className="mt-2 w-full border-b border-yellow-300/60 bg-transparent px-0 py-3 hh-mono text-sm uppercase text-yellow-200 outline-none placeholder:text-yellow-200/35 focus:border-pink-400" /></label>
          <div className="border border-pink-400/70 bg-pink-500/10 p-3"><span className="hh-label">Generated builder title</span><p className="mt-1 font-serif text-lg text-yellow-200">{builderTitle}</p></div>
        </div>
        <div className="mb-6 flex items-center justify-between"><span className="hh-label">02 / Upload image</span></div>
        <ImageUpload onImageSelect={handleImageSelect} selectedImage={selectedImage} imagePreview={imagePreview} />
        <div className="mt-7 border-t border-yellow-300/30 pt-5 text-xs leading-5 text-yellow-100/70"><span className="hh-label mr-2">FORMAT</span>JPG, PNG, HEIC · MAX 10 MB<br /><span className="hh-label mr-2">MODE</span>YOUR PHOTO STAYS ON YOUR DEVICE.</div>
      </div>
      <div className="hh-panel relative p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between"><span className="hh-label">03 / Preview Builder ID</span><span className="hh-label text-pink-400">LIVE</span></div>
        <div className="mx-auto max-w-md"><BuilderCard imagePreview={imagePreview} name={name} role={role} title={builderTitle} /></div>
        {imagePreview && name.trim() ? <div className="mt-7 grid gap-3 sm:grid-cols-2"><button onClick={download} disabled={isDownloading} className="hh-button">{isDownloading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}{isDownloading ? 'Generating' : 'Download PNG'}</button><button onClick={share} className="hh-button hh-button--ghost"><Share2 className="h-4 w-4" />Share on X</button><button onClick={removeImage} className="hh-button hh-button--ghost sm:col-span-2"><Trash2 className="h-4 w-4" />Reset image</button></div> : <p className="mt-7 text-center hh-label text-yellow-100/60">{imagePreview ? 'Add your name to unlock download' : 'Add your details and photo to unlock your Builder ID'}</p>}
      </div>
    </div>
    <div className="mt-12 grid gap-px overflow-hidden border border-yellow-300/40 bg-yellow-300/40 sm:grid-cols-3"><Info n="01" title="UPLOAD" copy="Drop any portrait. We’ll prepare it for the card." /><Info n="02" title="DOWNLOAD" copy="Get a crisp 1080 × 1350 Builder ID PNG." /><Info n="03" title="SIGNAL" copy="Post it on X with #FrameInGoa." /></div>
  </section>
}
const Info = ({ n, title, copy }) => <div className="bg-[#00653a] p-6"><span className="hh-label text-pink-400">{n}</span><h2 className="mt-5 hh-mono text-lg font-bold">{title}</h2><p className="mt-2 text-sm leading-5 text-yellow-100/75">{copy}</p></div>
export default Hero
