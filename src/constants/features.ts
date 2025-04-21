import { Code, Star, Zap } from "lucide-react";

export const features = [
  {
    title: "Anonymous Suggestions",
    description:
      "Users can submit feedback without logging in—complete anonymity for honest input.",
    icon: Zap,
  },
  {
    title: "MetaMask Auth",
    description:
      "Admins authenticate securely via MetaMask wallet—no passwords required.",
    icon: Code,
  },
  {
    title: "Unique Shareable Links",
    description:
      "Create one-of-a-kind links to share with teams or audiences for collecting suggestions.",
    icon: Star,
  },
  {
    title: "Local Storage Only",
    description:
      "All suggestions are stored locally in the admin’s browser—fully private and under your control.",
    icon: Zap,
  },
  {
    title: "No Backend Needed",
    description:
      "Entirely frontend-driven—no need to worry about hosting a server or database.",
    icon: Code,
  },
  {
    title: "Private by Design",
    description:
      "Designed with privacy in mind—no IP tracking, cookies, or analytics by default.",
    icon: Star,
  },
];
