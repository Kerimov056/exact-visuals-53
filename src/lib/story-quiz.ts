export type Question = { story: string; answer: string; options: string[] };
export type Story = { id: string; title: string; focus: string; questions: Question[] };

const question = (story: string, answer: string, ...others: string[]): Question => ({ story, answer, options: [answer, ...others] });

export const stories: Story[] = [
  {
    id: "bank", title: "The Bank Heist & Investigation", focus: "Robbery · Investigation · Arrest · Forensics",
    questions: [
      question("A masked man threatened a bank cashier and stole cash. Taking money by force is called ___.", "Robbery", "Burglary", "Bribery", "Embezzlement"),
      question("The cashier who was threatened was the ___ of the crime.", "Victim", "Judge", "Accomplice", "Prosecutor"),
      question("A customer saw the robber leave and became a key ___.", "Witness", "Suspect", "Jury", "Offender"),
      question("Detectives arrived to ___ the bank and establish what happened.", "investigate", "acquit", "sentence", "surrender"),
      question("Specialists examined fingerprints and DNA. This scientific analysis is known as ___.", "Forensics", "Probation", "Extortion", "Verdict"),
      question("A fingerprint on the vault door became physical ___ linking someone to the scene.", "Evidence", "Sentence", "Fine", "Trial"),
      question("The fingerprint matched a man police believed might be involved. He became a ___.", "Suspect", "Judge", "Victim", "Prosecutor"),
      question("Before police arrived at his flat, the man tried to ___ through a rear window.", "escape", "testify", "acquit", "convict"),
      question("Officers found him nearby and made an ___, taking him into custody.", "Arrest", "Acquittal", "Appeal", "Verdict"),
      question("The driver who knowingly helped the robber get away was an ___.", "Accomplice", "Witness", "Victim", "Attorney"),
      question("The driver went voluntarily to the police station to ___.", "surrender", "embezzle", "smuggle", "acquit"),
      question("After reviewing the evidence, officials decided to ___ the suspect with robbery.", "charge", "acquit", "pardon", "testify"),
    ],
  },
  {
    id: "fraud", title: "Financial Fraud & Court Trial", focus: "White-collar crimes · Evidence · Lawyers · Verdict",
    questions: [
      question("A director persuaded investors to buy shares using false financial reports. This deception is ___.", "Fraud", "Arson", "Robbery", "Vandalism"),
      question("She secretly took company funds entrusted to her. This is ___.", "Embezzlement", "Burglary", "Kidnapping", "Shoplifting"),
      question("She moved the stolen funds through apparently legitimate companies to conceal their origin: ___.", "Money laundering", "Community service", "Probation", "Assault"),
      question("She offered an auditor cash to ignore the missing funds. This is ___.", "Bribery", "Theft", "Forensics", "Detention"),
      question("Investigators collected bank statements and emails as ___ for the case.", "Evidence", "Verdicts", "Sentences", "Fines"),
      question("The formal hearing to examine the allegations and evidence was the ___.", "Trial", "Arrest", "Probation", "Investigation"),
      question("The lawyer presenting the case against the director was the ___.", "Prosecutor", "Defense attorney", "Witness", "Accomplice"),
      question("The lawyer representing the accused director was her ___.", "Defense attorney", "Prosecutor", "Judge", "Victim"),
      question("An accountant took an oath and began to ___ about the false reports.", "testify", "acquit", "detain", "sentence"),
      question("The citizens selected to assess the evidence together formed the ___.", "Jury", "Police", "Defense", "Courtroom"),
      question("After deliberation, the jury announced its decision, also called a ___.", "Verdict", "Charge", "Fine", "Testimony"),
      question("The director was found guilty. The court then imposed a prison ___.", "Sentence", "Acquittal", "Investigation", "Witness"),
    ],
  },
  {
    id: "rehab", title: "A Minor Infraction & Rehabilitation", focus: "Minor crimes · Detention · Fines · Community service",
    questions: [
      question("A teenager deliberately scratched a bus shelter. Deliberate damage to property is ___.", "Vandalism", "Fraud", "Robbery", "Embezzlement"),
      question("In this fictional case, the damage was classified as a less serious offence, a ___.", "Misdemeanor", "Felony", "Homicide", "Verdict"),
      question("A ___ arrived after a passer-by reported the damage.", "Police officer", "Juror", "Prosecutor", "Defense attorney"),
      question("Police needed to stop the teenager and hold him temporarily; they decided to ___ him.", "detain", "acquit", "convict", "sentence"),
      question("The passer-by who saw the damage happen gave a statement as a ___.", "Witness", "Judge", "Accomplice", "Offender"),
      question("When asked about the damage, the teenager chose to ___ rather than deny responsibility.", "plead guilty", "plead innocent", "escape", "testify for the victim"),
      question("The official responsible for deciding his punishment was the ___.", "Judge", "Witness", "Victim", "Suspect"),
      question("The court ordered him to pay money as punishment. He had to ___.", "pay a fine", "commit arson", "launder money", "acquit a suspect"),
      question("He could stay in the community under supervision instead of going to prison: ___.", "Probation", "Life imprisonment", "Detention", "Acquittal"),
      question("The court also ordered unpaid work cleaning public spaces. This is ___.", "Community service", "Bribery", "Tax evasion", "Extortion"),
      question("The court's aim was to help him change his behaviour and return to responsible life: ___.", "Rehabilitation", "Retaliation", "Smuggling", "Conviction"),
      question("After completing the work and supervision, he had fulfilled the court's ___.", "Sentence", "Investigation", "Arrest", "Charge"),
    ],
  },
];

export const QUESTIONS_PER_ATTEMPT = 8;

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const current = result[i];
    const other = result[j];
    if (current === undefined || other === undefined) continue;
    result[i] = other;
    result[j] = current;
  }
  return result;
}

export function createAttempt(story: Story, random: () => number = Math.random): Question[] {
  // Select different chapters, but retain chronology so each attempt remains a story.
  const selected = new Set(shuffle(story.questions.map((_, i) => i), random).slice(0, QUESTIONS_PER_ATTEMPT));
  return story.questions.filter((_, i) => selected.has(i)).map((q) => ({ ...q, options: shuffle(q.options, random) }));
}