import { Link } from "wouter";
import { Menu, Moon, Search, Sun, Volume2, VolumeX, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useSound } from "@/contexts/SoundContext";

const sections = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Comics", href: "/comics" },
  { label: "Games", href: "/games" },
  { label: "Videos", href: "/videos" },
  { label: "Animation", href: "/animation" },
  { label: "Music", href: "/music" },
  { label: "Projects", href: "/projects" },
  { label: "Characters", href: "/characters" },
  { label: "Universes", href: "/universes" },
  { label: "Artwork", href: "/artwork" },
  { label: "Latest releases", href: "/latest-releases" },
  { label: "Updates", href: "/updates" },
  { label: "Join us", href: "/join-us" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const sound = useSound();
  return <header className={`${home ? "absolute" : "relative border-b border-[var(--line)]"} top-0 z-30 w-full`}>
    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 lg:px-10">
      <Link href="/" className="focus-ring display text-[18px] font-semibold tracking-[-.06em]">AWESOME<span className="text-[#b78961]">.</span></Link>
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
        <Link href="/about" className="focus-ring site-muted text-[13px] transition hover:text-[var(--fg)]">About</Link>
        <div className="group relative"><button className="focus-ring site-muted text-[13px]">Explore</button><div className="invisible absolute right-0 top-full mt-3 grid w-[520px] grid-cols-3 gap-1 border border-[var(--line)] bg-[var(--surface-strong)] p-3 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">{sections.slice(2, 13).map(item => <Link key={item.href} href={item.href} className="focus-ring px-3 py-2 text-xs site-muted transition hover:bg-[var(--surface)] hover:text-[var(--fg)]">{item.label}</Link>)}</div></div>
        <Link href="/team" className="focus-ring site-muted text-[13px] transition hover:text-[var(--fg)]">Team</Link>
        <Link href="/join-us" className="focus-ring site-muted text-[13px] transition hover:text-[var(--fg)]">Join us</Link>
        <Link href="/search" aria-label="Search" className="focus-ring site-muted"><Search size={16} /></Link>
        <Link href="/admin" className="focus-ring mono text-[10px] uppercase tracking-[.16em] site-faint transition hover:text-[var(--fg)]">Studio login</Link>
        <button onClick={toggleTheme} aria-label="Toggle light and dark theme" className="focus-ring site-muted">{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
        <button onClick={() => sound?.toggle()} aria-label={sound?.enabled ? "Mute ambient sound" : "Enable ambient sound"} className="focus-ring site-muted">{sound?.enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
      </nav>
      <button className="focus-ring site-muted xl:hidden" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="mx-4 mb-4 max-h-[78vh] overflow-y-auto border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-2xl xl:hidden"><div className="grid grid-cols-2 gap-1 sm:grid-cols-3">{sections.map(item => <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className="focus-ring border-b border-[var(--line)] px-3 py-3 text-sm site-muted hover:text-[var(--fg)]">{item.label}</Link>)}</div><div className="mt-4 flex flex-wrap gap-4 border-t border-[var(--line)] pt-4"><Link onClick={() => setOpen(false)} href="/search" className="mono text-xs uppercase tracking-[.14em] text-[#b78961]">Search archive</Link><Link onClick={() => setOpen(false)} href="/admin" className="mono text-xs uppercase tracking-[.14em] site-faint">Studio login</Link><button onClick={toggleTheme} className="mono text-xs uppercase tracking-[.14em] site-faint">{theme === "dark" ? "Light theme" : "Dark theme"}</button><button onClick={() => sound?.toggle()} className="mono text-xs uppercase tracking-[.14em] site-faint">{sound?.enabled ? "Mute sound" : "Enable sound"}</button></div></div>}
  </header>;
}
