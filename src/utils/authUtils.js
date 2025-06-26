// utils/authUtils.js

import {
  UserCheck,
  ClipboardList,
  CalendarClock,
  LayoutDashboard,
  Target,
} from "lucide-react";

/**
 * Feature list displayed on login/signup pages.
 * Each feature includes:
 * - icon: React icon component from Lucide
 * - text: Description of the feature
 */
export const schedoFeatures = [
  {
    icon: <UserCheck size={20} className="text-indigo-600" />,
    text: "Easy signup and secure authentication",
  },
  {
    icon: <ClipboardList size={20} className="text-indigo-600" />,
    text: "Create, update, and manage your tasks",
  },
  {
    icon: <CalendarClock size={20} className="text-indigo-600" />,
    text: "Smart scheduling with real-time updates",
  },
  {
    icon: <LayoutDashboard size={20} className="text-indigo-600" />,
    text: "Beautiful UI, tailored for productivity",
  },
  {
    icon: <Target size={20} className="text-indigo-600" />,
    text: "Stay focused, achieve more every day",
  },
];


