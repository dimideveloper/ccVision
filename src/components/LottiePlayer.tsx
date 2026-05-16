import lottie, { type AnimationItem } from 'lottie-web';
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

type Props = {
  src: string | object;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  hideControls?: boolean;
};

export type LottiePlayerRef = {
  getFramesAsBlobs: (onProgress: (p: number) => void) => Promise<Blob[]>;
  getTotalFrames: () => number;
  getDuration: () => number;
};

export const LottiePlayer = forwardRef<LottiePlayerRef, Props>(
  ({ src, loop = true, autoplay = true, className = '', hideControls = false }, ref) => {
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const exportContainerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<AnimationItem | null>(null);
    const [totalFrames, setTotalFrames] = useState(0);
    const [frame, setFrame] = useState(0);
    const [playing, setPlaying] = useState(autoplay);

    useEffect(() => {
      if (!svgContainerRef.current) return;
      animRef.current?.destroy();

      const anim = lottie.loadAnimation({
        container: svgContainerRef.current,
        renderer: 'svg',
        loop,
        autoplay,
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
        ...(typeof src === 'string' ? { path: src } : { animationData: src }),
      });

      animRef.current = anim;
      anim.addEventListener('DOMLoaded', () => setTotalFrames(Math.round(anim.totalFrames)));
      anim.addEventListener('enterFrame', () => setFrame(Math.round(anim.currentFrame)));
      return () => anim.destroy();
    }, [src, loop, autoplay]);

    useImperativeHandle(ref, () => ({
      getTotalFrames: () => animRef.current?.totalFrames ?? 0,
      getDuration: () => {
        const a = animRef.current as any;
        return a ? (a.totalFrames / (a.frameRate || 60)) * 1000 : 3000;
      },
      getFramesAsBlobs: async (onProgress: (p: number) => void): Promise<Blob[]> => {
        return new Promise((resolve, reject) => {
          if (!exportContainerRef.current) return reject('No container');
          
          exportContainerRef.current.innerHTML = '';
          const animData = src as any;
          const width = animData?.w ?? 1920;
          const height = animData?.h ?? 1080;

          // 1. Setup a temporary SVG renderer for export
          const exportAnim = lottie.loadAnimation({
            container: exportContainerRef.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            ...(typeof src === 'string' ? { path: src } : { animationData: src }),
          });

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;

          exportAnim.addEventListener('DOMLoaded', async () => {
            const total = exportAnim.totalFrames;
            const blobs: Blob[] = [];
            const svgElement = exportContainerRef.current!.querySelector('svg')!;

            for (let i = 0; i < total; i++) {
              exportAnim.goToAndStop(i, true);
              
              // 2. Convert SVG to Image
              const svgData = new XMLSerializer().serializeToString(svgElement);
              const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
              const url = URL.createObjectURL(svgBlob);
              
              const img = new Image();
              img.src = url;
              
              await new Promise((res) => {
                img.onload = () => {
                  // 3. Draw to Canvas
                  ctx.fillStyle = '#000000';
                  ctx.fillRect(0, 0, width, height);
                  ctx.drawImage(img, 0, 0, width, height);
                  URL.revokeObjectURL(url);
                  res(null);
                };
              });

              // 4. Capture Frame
              const frameBlob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/jpeg', 0.95));
              if (frameBlob) blobs.push(frameBlob);
              
              onProgress((i / total) * 100);
            }

            exportAnim.destroy();
            resolve(blobs);
          });
        });
      },
    }));

    return (
      <div className={`lottie-player-wrapper ${className} relative`}>
        {/* Hidden Export Engine */}
        <div ref={exportContainerRef} style={{ position: 'fixed', top: '-10000px', width: '1920px', height: '1080px', visibility: 'hidden' }} />
        
        <div ref={svgContainerRef} className="lottie-canvas" />
        
        {!hideControls && (
          <div className="lottie-controls">
            <button className="lottie-btn" onClick={() => { animRef.current?.togglePause(); setPlaying(!playing); }}>
              {playing ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
            </button>
            <input type="range" min={0} max={totalFrames} value={frame} onChange={e => animRef.current?.goToAndStop(Number(e.target.value), true)} className="lottie-scrubber" />
            <span className="lottie-frames text-[10px] font-bold opacity-40">{frame}/{totalFrames}</span>
          </div>
        )}
      </div>
    );
  }
);

LottiePlayer.displayName = 'LottiePlayer';
