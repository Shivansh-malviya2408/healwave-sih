import { useEffect, useRef, useState } from "react";

export default function VantaBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vanta, setVanta] = useState<any>(null);

  useEffect(() => {
    function init() {
      if (vanta || !ref.current) return;
      const VANTA = (window as any).VANTA;
      if (!VANTA?.NET) return;
      const effect = VANTA.NET({
        el: ref.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x10b981, // emerald-500 lines to match health brand
        backgroundColor: 0xf8fafc, // offwhite background
        maxDistance: 18.0,
        spacing: 20.0,
      });
      setVanta(effect);
    }

    // Try init immediately and also after scripts load
    init();
    const id = window.setInterval(init, 300);
    return () => {
      window.clearInterval(id);
      if (vanta?.destroy) vanta.destroy();
    };
  }, [vanta]);

  return <div ref={ref} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
}
