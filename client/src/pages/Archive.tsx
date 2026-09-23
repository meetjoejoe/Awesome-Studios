import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const labels = {
  comic: { eyebrow: "Comics / Issues / Panels", title: "Worlds in panels.", description: "Follow the stories as they move from a first sketch into a living universe." },
  game: { eyebrow: "Games / Interactive", title: "Play the impossible.", description: "Interactive worlds designed to be entered, explored and remembered." },
  video: { eyebrow: "Film / Video", title: "Moving images.", description: "Short form, long form and everything with a frame and a pulse." },
  animation: { eyebrow: "Animation", title: "Bring it to life.", description: "Animation work classified in the CMS and surfaced alongside the studio's film work." },
  music: { eyebrow: "Music / Sound", title: "Sound for the worlds.", description: "Original music and sonic ideas that give each story another dimension." },
  release: { eyebrow: "Latest releases", title: "The shelf.", description: "A record of published work, updates and moments ready to meet an audience." },
  update: { eyebrow: "Updates / News", title: "From the studio.", description: "Notes on what is moving, what is being made and what comes next." },
  project: { eyebrow: "Projects", title: "Work in motion.", description: "The projects that connect people, formats and worlds across the studio." },
  character: { eyebrow: "Characters", title: "Meet the cast.", description: "The people, creatures and presences at the centre of each story." },
  universe: { eyebrow: "Universes / Worlds", title: "Step inside.", description: "Places with their own rules, histories and doors into other stories." },
  artwork: { eyebrow: "Artwork / Gallery", title: "The visual language.", description: "Images, studies and finished pieces from the studio's creative archive." },
};

export default function Archive({ kind }: { kind: keyof typeof labels }) {
  const { data = [], isLoading } = trpc.content.list.useQuery({ kind, limit: 24 });
  const copy = labels[kind];
  return <div className="site-page min-h-screen"><SiteHeader /><main className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><p className="mono text-[10px] uppercase tracking-[.24em] text-[#b78961]">{copy.eyebrow}</p><h1 className="display mt-6 max-w-[900px] text-6xl font-medium leading-[.94] md:text-8xl">{copy.title}</h1><p className="mt-8 max-w-[560px] text-lg leading-8 text-white/55">{copy.description}</p>{isLoading ? <div className="mt-20 h-24 animate-pulse bg-white/5" /> : data.length ? <div className="mt-20 grid gap-4 md:grid-cols-3">{data.map(item => <article key={item.id} className="border border-white/10 p-6 transition hover:border-[#8b5e3c]"><p className="mono text-[10px] uppercase tracking-[.16em] text-[#b78961]">{item.kind} · {item.status}</p><h2 className="display mt-16 text-2xl">{item.title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{item.description || "Published by Awesome Studios."}</p>{item.releaseDate && <p className="mono mt-6 text-[10px] uppercase tracking-[.14em] text-white/30">{new Date(item.releaseDate).toLocaleDateString()}</p>}</article>)}</div> : <div className="mt-20 border border-dashed border-white/15 p-8"><p className="display text-3xl text-white/70">This part of the universe is still being built.</p><p className="mt-3 max-w-xl text-sm leading-6 text-white/40">There is no published {copy.eyebrow.toLowerCase()} content yet. Check back when the studio is ready to share the next piece.</p><Link href="/join-us" className="mt-7 inline-flex items-center gap-2 text-sm text-[#c29268]">Bring your work to the studio <ArrowUpRight size={14} /></Link></div>}</main><footer className="border-t border-[var(--line)] px-5 py-10 lg:px-10"><div className="mx-auto flex max-w-[1440px] justify-between text-sm site-faint"><span>Awesome Studios · Nigeria</span><Link href="/contact" className="hover:text-[var(--fg)]">Start a conversation <ArrowUpRight className="inline" size={14} /></Link></div></footer></div>;
}
