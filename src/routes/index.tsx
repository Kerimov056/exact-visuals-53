import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Eye, EyeOff, ChevronRight, RotateCcw, Scale } from "lucide-react";
import { categories, vocab, quiz, pipeline, type Category } from "@/lib/vocab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crime & Legal Terminology — English–Azerbaijani" },
      { name: "description", content: "Learn crime and legal vocabulary in English with Azerbaijani translations, definitions, a legal flowchart and a quiz." },
      { property: "og:title", content: "Crime & Legal Terminology — English–Azerbaijani" },
      { property: "og:description", content: "Interactive crime & legal vocabulary with Azerbaijani translations and a quiz." },
    ],
  }),
  component: Index,
});

function Index() {
  const [showAz, setShowAz] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return vocab.filter(
      (v) => (cat === "all" || v.cat === cat) &&
        (!s || v.en.toLowerCase().includes(s) || v.az.toLowerCase().includes(s) || v.def.toLowerCase().includes(s)),
    );
  }, [q, cat]);

  const toggleFlip = (k: string) =>
    setFlipped((p) => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            <span className="font-display text-lg font-semibold">Legal Lexicon</span>
          </div>
          <button onClick={() => setShowAz(!showAz)} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            {showAz ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showAz ? "Hide" : "Show"} Azerbaijani Translations
          </button>
        </div>
      </header>

      <section className="hero-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">English · Azərbaycan</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-hero-foreground md:text-6xl">
            Crime & Legal Terminology
          </h1>
          <p className="mt-4 max-w-xl text-hero-muted">
            {vocab.length} essential words — from arson to acquittal. Tap any card to reveal its definition.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-2xl font-semibold">The Legal Pipeline</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-5">
          {pipeline.map((p, i) => (
            <div key={p.en} className="relative rounded-xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">STEP {i + 1}</div>
              <p.icon className="mt-2 h-7 w-7 text-accent" />
              <div className="mt-2 font-semibold">{p.en}</div>
              {showAz && <div className="text-sm text-accent">{p.az}</div>}
              <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
              {i < pipeline.length - 1 && <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground md:block" />}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search in English or Azerbaijani…"
              className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[{ id: "all" as const, en: "All", az: "Hamısı" }, ...categories].map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>
              {c.en}{showAz && <span className="opacity-70"> · {c.az}</span>}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => {
            const f = flipped.has(v.en);
            return (
              <button key={v.en} onClick={() => toggleFlip(v.en)}
                className="group flex min-h-44 flex-col rounded-2xl border border-border bg-card p-5 text-left transition hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-secondary p-3 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold leading-snug">{v.en}</div>
                    <div className={`text-sm text-accent transition ${showAz ? "" : "select-none blur-sm"}`}>{v.az}</div>
                  </div>
                </div>
                <p className={`mt-4 text-sm text-muted-foreground transition-opacity ${f ? "opacity-100" : "opacity-0"}`}>{v.def}</p>
                {!f && <span className="mt-auto text-xs text-muted-foreground">Tap for definition</span>}
              </button>
            );
          })}
          {list.length === 0 && <p className="text-muted-foreground">No terms found.</p>}
        </div>
      </section>

      <Quiz />
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">Crime & Legal Terminology · Cinayət və Hüquq Terminləri</footer>
    </div>
  );
}

function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= quiz.length;
  const item = quiz[i];

  return (
    <section className="hero-bg">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="font-display text-3xl font-semibold text-hero-foreground">Story Quiz: The Midnight Burglary</h2>
        <p className="mt-2 text-hero-muted">Choose the right word to continue the story.</p>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          {done ? (
            <div className="text-center">
              <div className="font-display text-4xl font-semibold">{score} / {quiz.length}</div>
              <p className="mt-2 text-muted-foreground">Case closed!</p>
              <button onClick={() => { setI(0); setScore(0); setPicked(null); }} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">
                <RotateCcw className="h-4 w-4" /> Try again
              </button>
            </div>
          ) : (
            <>
              <div className="text-xs font-semibold text-muted-foreground">CHAPTER {i + 1} OF {quiz.length}</div>
              <p className="mt-3 text-lg">{item.story}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {item.options.map((o) => {
                  const state = picked == null ? "" : o === item.answer ? "border-success bg-success/15" : o === picked ? "border-destructive bg-destructive/15" : "opacity-50";
                  return (
                    <button key={o} disabled={picked != null}
                      onClick={() => { setPicked(o); if (o === item.answer) setScore((s) => s + 1); }}
                      className={`rounded-xl border border-border px-4 py-3 text-left transition hover:bg-secondary ${state}`}>{o}</button>
                  );
                })}
              </div>
              {picked != null && (
                <button onClick={() => { setI(i + 1); setPicked(null); }} className="mt-5 inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
