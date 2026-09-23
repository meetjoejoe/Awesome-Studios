import { createContext, useContext, useEffect, useRef, useState } from "react";

const SOUND_URLS = [
  "/manus-storage/awesome-studios-ambient_b4d540b0.mp3",
  "/assets/awesome-studios-ambient.mp3",
];
type SoundContextValue = { enabled: boolean; toggle: () => void };
const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = new Audio(SOUND_URLS[0]);
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = 0.22;
    audio.addEventListener("error", () => {
      if (audio.src.endsWith(SOUND_URLS[0])) audio.src = SOUND_URLS[1];
    });
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    const audio = audioRef.current;
    if (!audio) return;
    if (next) {
      void audio.play().catch(() => setEnabled(false));
    } else {
      audio.pause();
    }
  };

  return <SoundContext.Provider value={{ enabled, toggle }}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const value = useContext(SoundContext);
  if (!value) throw new Error("useSound must be used within SoundProvider");
  return value;
}
