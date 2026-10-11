import {
  Skull, HeartCrack, Swords, UserX, Wallet, Banknote, Home, ShoppingBag, BadgeAlert, Fingerprint,
  Briefcase, HandCoins, Mail, Receipt, Droplets, Ship, Pill, Users, Flame, Hammer, Bug, Bomb,
  AlertTriangle, Search, Siren, Lock, FileText, Footprints, Flag, Scale, Mic, MessageSquare,
  Gavel, CheckCircle2, User, UserSearch, HeartHandshake, Eye, ShieldCheck, Landmark, UsersRound,
  BriefcaseBusiness, ShieldHalf, Link2, Building2, XCircle, ScrollText, Clock, Coins, Timer,
  HandHelping, Infinity as InfinityIcon, Ban, AlertOctagon, AlertCircle, type LucideIcon,
} from "lucide-react";

export type Category = "crimes" | "process" | "people" | "court";

export const categories: { id: Category; en: string; az: string }[] = [
  { id: "crimes", en: "Types of Crimes", az: "Cinayət Növləri" },
  { id: "process", en: "Legal Process & Actions", az: "Hüquqi Proses və Əməllər" },
  { id: "people", en: "People Involved", az: "Əlaqədar Şəxslər" },
  { id: "court", en: "Court Decisions & Punishments", az: "Məhkəmə Qərarları və Cəzalar" },
];

export type Term = { en: string; az: string; def: string; icon: LucideIcon; cat: Category };

const t = (cat: Category, en: string, az: string, def: string, icon: LucideIcon): Term => ({ cat, en, az, def, icon });

export const vocab: Term[] = [
  t("crimes", "Murder / Homicide", "Qətl / Adam öldürmə", "The intentional, unlawful killing of another person.", Skull),
  t("crimes", "Manslaughter", "Ehtiyatsızlıqdan adam öldürmə", "Killing someone without the intention to do so, e.g. through carelessness.", HeartCrack),
  t("crimes", "Assault", "Qəsdən fiziki zorakılıq / Hücum", "A physical attack or threat of violence against a person.", Swords),
  t("crimes", "Kidnapping / Abduction", "İnsan oğurluğu", "Taking someone away illegally by force, often to demand money.", UserX),
  t("crimes", "Theft / Larceny", "Oğurluq", "Taking someone else's property without permission.", Wallet),
  t("crimes", "Robbery", "Soyğunçuluq", "Stealing from a person using force or threats.", Banknote),
  t("crimes", "Burglary / Break-in", "Mənzil oğurluğu / Qanunsuz daxilolma", "Illegally entering a building in order to steal.", Home),
  t("crimes", "Shoplifting", "Mağazadan oğurluq", "Stealing goods from a shop while pretending to be a customer.", ShoppingBag),
  t("crimes", "Fraud", "Dələduzluq / Fırıldaqçılıq", "Deceiving people to gain money or advantage illegally.", BadgeAlert),
  t("crimes", "Identity Theft", "Şəxsiyyət oğurluğu", "Using another person's personal information to commit fraud.", Fingerprint),
  t("crimes", "Embezzlement", "Mənimsəmə / İsraf etmə", "Secretly stealing money that you are responsible for, e.g. at work.", Briefcase),
  t("crimes", "Bribery", "Rüşvətxorluq", "Offering or accepting money to influence an official's decision.", HandCoins),
  t("crimes", "Extortion / Blackmail", "Hədə-qorxu ilə tələb etmə", "Getting money or favours from someone through threats.", Mail),
  t("crimes", "Tax Evasion / Tax Fraud", "Vergidən yayınma / Vergi dələduzluğu", "Illegally avoiding paying the taxes you owe.", Receipt),
  t("crimes", "Money Laundering", "Çirkli pulların yuyulması", "Hiding the illegal origin of money by moving it through legal businesses.", Droplets),
  t("crimes", "Smuggling / Contraband", "Qaçaqmalçılıq", "Secretly moving illegal goods into or out of a country.", Ship),
  t("crimes", "Drug Dealing / Trafficking", "Narkotik vasitələrin alveri", "Buying, selling or transporting illegal drugs.", Pill),
  t("crimes", "Human Trafficking", "İnsan alveri", "Moving and exploiting people for forced labour or other abuse.", Users),
  t("crimes", "Arson", "Qəsdən yandırma (od vurma)", "Deliberately setting fire to property.", Flame),
  t("crimes", "Vandalism", "Vandalizm", "Deliberately damaging public or private property.", Hammer),
  t("crimes", "Cybercrime / Hacking", "Kiber-cinayət / Hakerlik", "Crimes committed using computers, such as breaking into systems.", Bug),
  t("crimes", "Terrorism", "Terrorizm", "Using violence against civilians to achieve political goals.", Bomb),

  t("process", "Commit a crime", "Cinayət törətmək", "To do something that is against the law.", AlertTriangle),
  t("process", "Investigate / Investigate a crime scene", "Araşdırmaq / Hadisə yerini araşdırmaq", "To examine facts and evidence to find out what happened.", Search),
  t("process", "Arrest / Apprehend", "Həbs etmək / Tutmaq", "When police take a suspect into custody.", Siren),
  t("process", "Catch / Detain", "Ələ keçirmək / Saxlamaq", "To stop someone and keep them in custody for a time.", Lock),
  t("process", "Charge with a crime", "Cinayətdə ittiham etmək", "To formally accuse someone of a specific crime.", FileText),
  t("process", "Escape / Run away", "Qaçmaq / Aradan çıxmaq", "To get away from police or prison.", Footprints),
  t("process", "Surrender / Turn oneself in", "Təslim olmaq", "To voluntarily go to the police and give up.", Flag),
  t("process", "Trial", "Məhkəmə prosesi (duruşma)", "The formal examination of evidence in court to decide guilt.", Scale),
  t("process", "Testify", "İfadə vermək", "To give evidence in court under oath.", Mic),
  t("process", "Plead guilty / innocent", "Günahını etiraf etmək / Təqsirsiz olduğunu bildirmək", "To formally say in court whether you committed the crime.", MessageSquare),
  t("process", "Convict", "Məhkum etmək", "To officially decide in court that someone is guilty.", Gavel),
  t("process", "Acquit", "Bəraət vermək", "To officially decide in court that someone is not guilty.", CheckCircle2),

  t("people", "Criminal / Offender", "Cinayətkar", "A person who has committed a crime.", User),
  t("people", "Suspect", "Şübhəli şəxs", "A person thought to have committed a crime.", UserSearch),
  t("people", "Victim", "Zərərçəkən / Qurban", "A person harmed by a crime.", HeartHandshake),
  t("people", "Witness", "Şahid", "A person who saw a crime happen and can describe it.", Eye),
  t("people", "Police Officer / Law Enforcement", "Polis əməkdaşı / Hüquq-mühafizə", "A person whose job is to enforce the law.", ShieldCheck),
  t("people", "Judge", "Hakim", "The official who controls a trial and decides the sentence.", Landmark),
  t("people", "Jury", "Münsiflər heyəti", "A group of citizens who decide whether the accused is guilty.", UsersRound),
  t("people", "Prosecutor", "Prokuror / İttihamçı", "The lawyer who tries to prove the accused is guilty.", BriefcaseBusiness),
  t("people", "Defense Attorney / Lawyer", "Vəkil / Müdafiəçi", "The lawyer who defends the accused person.", ShieldHalf),
  t("people", "Accomplice", "Əlbir olan şəxs / Şərik", "A person who helps someone else commit a crime.", Link2),

  t("court", "Court", "Məhkəmə", "The place where legal cases are heard and decided.", Building2),
  t("court", "Guilty", "Təqsirkar / Günahkar", "Responsible for committing a crime.", AlertCircle),
  t("court", "Innocent", "Təqsirsiz / Günahsız", "Not responsible for a crime.", XCircle),
  t("court", "Verdict", "Məhkəmə hökmü / Qərarı", "The official decision of guilty or not guilty.", ScrollText),
  t("court", "Sentence", "Cəza kəsmək / Hökm", "The punishment given by a judge; or to give that punishment.", Clock),
  t("court", "Prison / Jail / Penitentiary", "Həbsxana / Zindan", "A building where criminals are kept as punishment.", Lock),
  t("court", "Pay a fine", "Cərimə ödəmək", "To pay money as punishment for breaking the law.", Coins),
  t("court", "Probation", "Şərti cəza / Müşahidə altı", "A period where an offender stays free but under supervision.", Timer),
  t("court", "Community service", "İctimai işlər", "Unpaid work for the public as a punishment.", HandHelping),
  t("court", "Life imprisonment", "Ömürlük azadlıqdan məhrum etmə", "Being kept in prison for the rest of one's life.", InfinityIcon),
  t("court", "Death penalty / Capital punishment", "Ölüm cəzası", "Execution as legal punishment for a serious crime.", Ban),
  t("court", "Major crime (Felony)", "Ağır cinayət", "A serious crime, such as murder or robbery.", AlertOctagon),
  t("court", "Minor crime (Misdemeanor)", "Yüngül cinayət / Xırda xətalar", "A less serious offence, such as minor vandalism.", AlertTriangle),
];

export const pipeline = [
  { en: "Crime", az: "Cinayət", icon: AlertTriangle, note: "An offender commits a crime." },
  { en: "Investigation", az: "Araşdırma", icon: Search, note: "Police investigate, arrest and charge a suspect." },
  { en: "Trial", az: "Məhkəmə prosesi", icon: Scale, note: "Witnesses testify; prosecutor and defense argue." },
  { en: "Verdict", az: "Hökm", icon: Gavel, note: "The jury or judge decides: guilty or innocent." },
  { en: "Sentence", az: "Cəza", icon: Lock, note: "The judge sentences: fine, probation or prison." },
];
