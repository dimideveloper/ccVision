import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { LottiePlayer, type LottiePlayerRef } from '../components/LottiePlayer';
import { ANIMATIONS } from '../data/content';

type ExportState = 'idle' | 'recording' | 'done' | 'error';

import { usePageTitle } from '../lib/usePageTitle';

export function EditorPage() {
  const { id } = useParams();
  const animInfo = ANIMATIONS.find(a => a.id === Number(id)) || ANIMATIONS[0];
  usePageTitle(`Editor: ${animInfo.title}`);
  
  const playerRef = useRef<LottiePlayerRef>(null);
  const [loading, setLoading] = useState(true);
  const [animationData, setAnimationData] = useState<any>(null);
  const [exportState, setExportState] = useState<ExportState>('idle');
  const [exportProgress, setExportProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    const loadAnim = async () => {
      try {
        const path = animInfo.lottie || '/animations/firstanimationnew.json';
        const res = await axios.get(path);
        let jsonString = JSON.stringify(res.data);
        jsonString = jsonString.replace(/SFProDisplay-Medium/g, 'Arial').replace(/SF Pro Display/g, 'Arial');
        let data = JSON.parse(jsonString);
        if (data.fonts?.list) data.fonts.list.forEach((f: any) => { f.fFamily = 'Arial'; f.fName = 'Arial'; });
        const strip = (layers: any[]) => {
          layers?.forEach(l => { if (l.ty === 5 && l.t?.a) l.t.a = []; if (l.layers) strip(l.layers); });
        };
        strip(data.layers);
        data.assets?.forEach((a: any) => strip(a.layers));
        setAnimationData(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    loadAnim();
  }, [id]);

  const rgbToHex = (rgb: number[]) => '#' + rgb.map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
  const hexToRgb = (hex: string) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255] : [1, 1, 1];
  };

  const findFields = (obj: any) => {
    const res: any[] = [];
    const search = (item: any) => {
      // Text detection
      if (item?.ty === 5 && item.t?.d?.k?.[0]?.s?.t !== undefined) {
        res.push({ type: 'text', data: item, label: item.nm || 'Text', color: item.t.d.k[0].s.fc ? rgbToHex(item.t.d.k[0].s.fc) : '#ffffff' });
      }
      // Image detection (Layer type 2 is image, or search by name "Picture")
      if (item?.ty === 2 || (item?.nm && item.nm.toLowerCase().includes('picture'))) {
        res.push({ type: 'image', data: item, label: item.nm || 'Picture', refId: item.refId });
      }
      item?.layers?.forEach(search);
      item?.assets?.forEach(search);
    };
    search(obj);
    return res;
  };

  const updateField = (field: any, updates: { text?: string; color?: string; image?: string }) => {
    const newData = JSON.parse(JSON.stringify(animationData));
    
    if (field.type === 'image' && updates.image) {
      // Find the asset by refId and update its data
      const asset = newData.assets?.find((a: any) => a.id === field.refId);
      if (asset) {
        asset.p = updates.image; // Base64 or URL
        asset.u = ''; // Clear path if using base64
      }
    } else {
      const patch = (item: any) => {
        if (item?.ty === 5 && item.ind === field.data.ind) {
          if (updates.text !== undefined) item.t.d.k[0].s.t = updates.text;
          if (updates.color !== undefined) item.t.d.k[0].s.fc = hexToRgb(updates.color);
        }
        item?.layers?.forEach(patch);
        item?.assets?.forEach(patch);
      };
      patch(newData);
    }
    setAnimationData(newData);
  };

  const handleImageUpload = (field: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField(field, { image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const exportVideo = async () => {
    if (!playerRef.current) return;
    setExportState('recording');
    setExportProgress(0);

    try {
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      // Step 1: Get Frames as Blobs
      const blobs = await playerRef.current.getFramesAsBlobs((p) => {
        setExportProgress(Math.round(p * 0.5)); // First 50% for rendering
      });

      // Step 2: Write frames to FFmpeg
      for (let i = 0; i < blobs.length; i++) {
        const name = `frame${i.toString().padStart(3, '0')}.jpg`;
        ffmpeg.FS('writeFile', name, await fetchFile(blobs[i]));
        if (i % 10 === 0) setExportProgress(50 + Math.round((i / blobs.length) * 20));
      }

      // Step 3: Run FFmpeg on the JPEG sequence
      await ffmpeg.run(
        '-framerate', '60',
        '-i', 'frame%03d.jpg',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-b:v', '8M',
        'output.mp4'
      );
      
      const data = ffmpeg.FS('readFile', 'output.mp4');
      setVideoUrl(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
      setExportProgress(100);
      setExportState('done');

      // Cleanup
      blobs.forEach((_, i) => ffmpeg.FS('unlink', `frame${i.toString().padStart(3, '0')}.jpg`));
      ffmpeg.FS('unlink', 'output.mp4');
    } catch (e) {
      console.error('Export error:', e);
      setExportState('error');
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `${animInfo.title.replace(/\s+/g, '_')}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const fields = findFields(animationData);

  return (
    <div className="min-h-screen bg-[#FBFBFA] pt-24 pb-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/animations" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></Link>
            <div>
              <h1 className="text-xl font-bold text-[#1d1d1f]">{animInfo.title}</h1>
              <p className="text-xs font-semibold text-black/40 uppercase tracking-widest">{animInfo.category}</p>
            </div>
          </div>
          <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-6 py-2.5 rounded-full bg-black text-white text-[13px] font-bold shadow-lg flex items-center gap-2">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
             Export
          </button>
        </div>

        {/* Modal ccLeaf Style */}
        {(exportState === 'recording' || exportState === 'done' || exportState === 'error') && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl" onClick={() => exportState !== 'recording' && setExportState('idle')} />
            <div className="relative bg-[#121212] rounded-[32px] shadow-2xl w-full max-w-[440px] overflow-hidden border border-white/5">
              {exportState !== 'recording' && (
                <button onClick={() => setExportState('idle')} className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
              )}
              <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                 <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    {exportState === 'recording' ? <svg className="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> : <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>}
                 </div>
              </div>
              <div className="p-8 space-y-6 text-center">
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-xl">{exportState === 'recording' ? 'Exporting your animation' : 'Render Complete!'}</h3>
                  <p className="text-white/40 text-xs">{exportState === 'recording' ? 'Capturing every frame for perfect quality...' : 'Your high-quality MP4 is ready.'}</p>
                </div>
                {exportState === 'recording' && (
                  <div className="space-y-3">
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.4)]" style={{ width: `${exportProgress}%` }} />
                    </div>
                    <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{Math.round(exportProgress)}% Complete</span>
                  </div>
                )}
                {exportState === 'done' && (
                  <div className="flex gap-3">
                    {videoUrl && (
                      <>
                        <a href={videoUrl} target="_blank" rel="noreferrer" className="flex-1 py-4 rounded-2xl bg-white/5 text-white text-xs font-bold border border-white/5 text-center">Preview</a>
                        <button onClick={downloadVideo} className="flex-1 py-4 rounded-2xl bg-white text-black text-xs font-black shadow-xl">Download .mp4</button>
                      </>
                    )}
                  </div>
                )}
                {exportState === 'error' && (
                   <button onClick={() => setExportState('idle')} className="w-full py-4 rounded-2xl bg-white/5 text-white text-xs font-bold border border-white/5">Try Again</button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-[#111] rounded-[40px] border border-black/5 shadow-2xl overflow-hidden relative">
              <div className="aspect-video flex items-center justify-center p-10 relative z-10">
                <LottiePlayer ref={playerRef} key={JSON.stringify(animationData)} src={animationData} loop autoplay className="w-full h-full" />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-[32px] border border-black/5 shadow-xl overflow-hidden p-8 space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Properties</h2>
              {fields.map((f, i) => (
                <div key={i} className="space-y-6">
                  {f.type === 'text' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-black/40 uppercase tracking-widest">{f.label}</label>
                        <input type="text" defaultValue={f.data.t.d.k[0].s.t} onChange={(e) => updateField(f, { text: e.target.value })} className="w-full bg-[#F5F5F7] rounded-2xl px-5 py-4 text-sm font-bold text-[#1d1d1f] focus:bg-white focus:ring-2 ring-amber-500/20 outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-black/40 uppercase tracking-widest">Color</label>
                        <div className="flex gap-3">
                          <input type="color" defaultValue={f.color} onChange={(e) => updateField(f, { color: e.target.value })} className="w-12 h-12 rounded-xl border-none cursor-pointer overflow-hidden" />
                          <div className="flex-1 bg-[#F5F5F7] rounded-xl px-4 flex items-center text-xs font-mono font-bold text-black/30">{f.color.toUpperCase()}</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-black/40 uppercase tracking-widest">{f.label}</label>
                      <div className="relative group">
                        {/* Get current image from assets */}
                        {(() => {
                          const asset = animationData.assets?.find((a: any) => a.id === f.refId);
                          const currentImage = asset?.p;
                          const isBase64 = currentImage?.startsWith('data:');

                          if (currentImage && (isBase64 || currentImage.length > 0)) {
                            return (
                              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-[#F5F5F7]">
                                <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
                                <button 
                                  onClick={() => updateField(f, { image: ' ' })}
                                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-20"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                   <p className="text-white text-[10px] font-black uppercase tracking-widest">Change Image</p>
                                   <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(f, e)}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(f, e)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="w-full bg-[#F5F5F7] group-hover:bg-[#E8E8ED] rounded-2xl px-5 py-6 border-2 border-dashed border-black/5 group-hover:border-amber-500/30 flex flex-col items-center justify-center gap-2 transition-all">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/20 group-hover:text-amber-500 transition-colors"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                                <span className="text-[11px] font-bold text-black/40 group-hover:text-black/60">Upload Image</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={exportVideo} 
                disabled={exportState === 'recording'}
                className={`w-full py-4 rounded-2xl text-[13px] font-black transition-all flex items-center justify-center gap-2 ${
                  exportState === 'recording' 
                    ? 'bg-amber-500/50 cursor-not-allowed text-black/50' 
                    : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                }`}
              >
                {exportState === 'recording' ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    Rendering...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                    Render Video
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
