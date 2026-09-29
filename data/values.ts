import {
  CalendarCheck,
  HeartHandshake,
  ScanSearch,
  ShieldCheck,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

export type CoreValue = {
  name: string;
  icon: LucideIcon;
  /** One sentence, client-facing meaning of the value. */
  promise: string;
  /** Short paragraph for the About page. */
  detail: string;
};

export const coreValues: CoreValue[] = [
  {
    name: "Passion",
    icon: HeartHandshake,
    promise:
      "We treat every property as if our own name is on the door, because it is.",
    detail:
      "Cleaning is not a side job for us. It is the work we chose, and it shows in the care our crews bring to every room, whether it is a new estate handover or a family home.",
  },
  {
    name: "Integrity",
    icon: ShieldCheck,
    promise:
      "Clear quotes, agreed scopes and no surprises when the job is done.",
    detail:
      "We agree the scope before we start, quote clearly and do exactly what we said we would. If something falls outside the agreed scope, we tell you before we act.",
  },
  {
    name: "Reliability",
    icon: CalendarCheck,
    promise:
      "We arrive when we say we will and finish what we promise, on every visit.",
    detail:
      "We arrive when we say we will, with the equipment the job needs, and we finish what we start. You should never have to chase a cleaner.",
  },
  {
    name: "Satisfaction",
    icon: ThumbsUp,
    promise:
      "A job is only finished when you are happy with it. That is the standard we hold.",
    detail:
      "We measure success by how you feel when you walk in. Before we leave, we want you confident that the job is done to your standard.",
  },
  {
    name: "Detail Oriented",
    icon: ScanSearch,
    promise:
      "Skirting boards, switch plates, window tracks and grout lines. The details others skip are where we start.",
    detail:
      "Skirting boards, switch plates, window tracks, grout lines and the tops of door frames. The details others skip are exactly where we start.",
  },
];
