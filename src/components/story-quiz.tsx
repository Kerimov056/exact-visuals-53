import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, Shuffle, Landmark, BriefcaseBusiness, HandHelping } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stories, createAttempt, QUESTIONS_PER_ATTEMPT, type Story, type Question } from "@/lib/story-quiz";

const icons = [Landmark, BriefcaseBusiness, HandHelping];

export function StoryQuiz() {
  const [active, setActive] = useState<Story | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const done = active !== null && index >= questions.length;
  const item = questions[index];

  function start(story: Story) {
    setActive(story);
    setQuestions(createAttempt(story));
    setIndex(0);
    setPicked(null);
    setScore(0);
  }

  return (
    <section className="hero-bg" aria-labelledby="story-quiz-title">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="story-quiz-title" className="font-display text-3xl font-semibold text-hero-foreground">Story Quiz{active ? `: ${active.title}` : ""}</h2>
        {!active ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stories.map((story, i) => {
              const Icon = icons[i] ?? Landmark;
              return (
                <div key={story.id} className="flex flex-col rounded-lg border border-border bg-card p-6 text-card-foreground">
                  <div className="flex items-center justify-between"><Icon className="h-7 w-7 text-accent" /><span className="text-xs text-muted-foreground">STORY {i + 1}</span></div>
                  <h3 className="mt-5 text-xl font-semibold">{story.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{story.focus}</p>
                  <p className="mb-5 mt-4 text-xs text-muted-foreground">{QUESTIONS_PER_ATTEMPT} chapters · {story.questions.length} questions</p>
                  <Button onClick={() => start(story)} className="mt-auto w-full">Start story <ArrowRight /></Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-border bg-card p-6 text-card-foreground">
            {done ? (
              <div className="text-center" aria-live="polite">
                <CheckCircle2 className="mx-auto h-9 w-9 text-success" />
                <h3 className="mt-3 text-xl font-semibold">Case closed!</h3>
                <div className="mt-3 font-display text-4xl font-semibold">{score} / {questions.length}</div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button variant="outline" onClick={() => start(active)}><RotateCcw /> Restart Quiz</Button>
                  <Button onClick={() => { setActive(null); setPicked(null); }}><Shuffle /> Try Another Story</Button>
                </div>
              </div>
            ) : item ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">CHAPTER {index + 1} OF {questions.length}</span>
                  <Button variant="ghost" size="sm" onClick={() => setActive(null)}><ArrowLeft /> Stories</Button>
                </div>
                <div className="mt-3 flex gap-1" aria-label={`Progress: ${index} of ${questions.length} completed`}>
                  {questions.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full ${i < index ? "bg-success" : i === index ? "bg-primary" : "bg-muted"}`} />)}
                </div>
                <p className="mt-6 text-lg leading-relaxed">{item.story}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {item.options.map((option) => {
                    const correct = picked !== null && option === item.answer;
                    const wrong = picked === option && !correct;
                    return <Button key={option} variant="outline" disabled={picked !== null} onClick={() => { setPicked(option); if (option === item.answer) setScore((s) => s + 1); }} className={`h-auto min-h-12 justify-between whitespace-normal px-4 py-3 text-left disabled:opacity-100 ${correct ? "border-success bg-success/15" : wrong ? "border-destructive bg-destructive/15" : ""}`}>
                      {option}{correct ? <CheckCircle2 className="text-success" /> : wrong ? <XCircle className="text-destructive" /> : null}
                    </Button>;
                  })}
                </div>
                <div className="mt-5 min-h-20">
                  {picked !== null && <>
                    <p role="status" className="text-sm text-foreground">{picked === item.answer ? "Correct!" : `The correct answer is ${item.answer}.`}</p>
                    <Button onClick={() => { setIndex((i) => i + 1); setPicked(null); }} className="mt-3">{index === questions.length - 1 ? "Finish story" : "Next chapter"}<ArrowRight /></Button>
                  </>}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}