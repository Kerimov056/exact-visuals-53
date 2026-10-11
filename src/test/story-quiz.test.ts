import { describe, expect, it } from "vitest";
import { createAttempt, shuffle, stories } from "../lib/story-quiz";

describe("story quiz rules", () => {
  it("offers all three requested legal scenarios", () => {
    expect(stories.map((s) => s.title)).toEqual([
      "The Bank Heist & Investigation",
      "Financial Fraud & Court Trial",
      "A Minor Infraction & Rehabilitation",
    ]);
  });

  it.each(stories)("expands $title beyond eight questions with valid unique answers", (story) => {
    expect(story.questions.length).toBeGreaterThan(8);
    for (const q of story.questions) {
      expect(q.options.filter((o) => o === q.answer)).toHaveLength(1);
      expect(new Set(q.options).size).toBe(4);
    }
  });

  it.each(stories)("varies questions and answers for $title without mutating the pool", (story) => {
    const before = JSON.stringify(story);
    const first = createAttempt(story, () => 0);
    const second = createAttempt(story, () => 0.999);
    expect(first).toHaveLength(8);
    expect(second).toHaveLength(8);
    expect(first.map((q) => q.story)).not.toEqual(second.map((q) => q.story));
    const shared = first.find((q) => second.some((other) => other.story === q.story));
    expect(shared).toBeDefined();
    expect(shared?.options).not.toEqual(second.find((q) => q.story === shared?.story)?.options);
    expect(JSON.stringify(story)).toBe(before);
    const indices = first.map((q) => story.questions.findIndex((original) => original.story === q.story));
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });

  it("shuffling retains every choice", () => {
    expect(shuffle(["A", "B", "C", "D"], () => 0)).toEqual(["B", "C", "D", "A"]);
  });
});