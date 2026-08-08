import React, { useCallback, useRef, useState } from 'react'
import { CheckCircle, FileImage, Upload } from 'lucide-react'
import { validateImage, formatFileSize, readImageFile } from '../../utils/helpers'
import { compressImage } from '../../utils/imageCompression'
import { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from '../../utils/constants'

const ImageUpload = ({ onImageSelect, selectedImage, imagePreview }) => {
  const [dragging, setDragging] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState(null); const input = useRef(null)
  const processFile = useCallback(async file => { const result = validateImage(file, MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES); if (!result.valid) return setError(result.error); setError(null); setLoading(true); try { const compressed = await compressImage(file); onImageSelect(compressed, await readImageFile(compressed)) } catch { setError('Could not process this image. Please try again.') } finally { setLoading(false) } }, [onImageSelect])
  return <div><input ref={input} className="hidden" type="file" accept="image/jpeg,image/png,image/heic,image/heif" onChange={e => e.target.files?.[0] && processFile(e.target.files[0])} />
    {!imagePreview ? <div onClick={() => input.current?.click()} onDragEnter={e => { e.preventDefault(); setDragging(true) }} onDragOver={e => e.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]) }} className={`cursor-pointer border-2 border-dashed p-10 text-center transition-colors ${dragging ? 'border-pink-400 bg-pink-500/10' : 'border-yellow-300/60 hover:border-yellow-300 hover:bg-yellow-300/5'}`}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-yellow-300"><Upload className="h-7 w-7" /></div><p className="mt-5 hh-mono text-sm font-bold">{loading ? 'PROCESSING IMAGE…' : dragging ? 'DROP IT HERE' : 'DROP YOUR PORTRAIT HERE'}</p><p className="mt-2 text-xs text-yellow-100/70">or select a photo from your device</p><button type="button" onClick={e => { e.stopPropagation(); input.current?.click() }} className="hh-button mt-6 text-xs"><FileImage className="h-4 w-4" />Choose image</button>
    </div> : <div className="border border-yellow-300/50 p-4 text-center"><div className="flex items-center justify-center gap-2 hh-mono text-xs"><CheckCircle className="h-4 w-4 text-pink-400" />IMAGE LOADED</div><p className="mt-2 text-xs text-yellow-100/70">{selectedImage?.name} · {selectedImage && formatFileSize(selectedImage.size)}</p></div>}
    {error && <p className="mt-3 border border-pink-400 bg-pink-500/10 p-3 text-sm text-yellow-100">{error}</p>}</div>
}
export default ImageUpload
