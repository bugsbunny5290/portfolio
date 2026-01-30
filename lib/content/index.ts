import * as contentEn from "./en";
import * as contentDe from "./de";
import type { Locale } from "../i18n";

export type Content = typeof contentEn | typeof contentDe;

export function getContent(locale: Locale): Content {
  return locale === "de" ? contentDe : contentEn;
}

export type Experience = (typeof contentEn.experiences)[number];
export type Education = (typeof contentEn.education)[number];
export type Skill = (typeof contentEn.skills)[number];
export type WhatIDo = (typeof contentEn.whatIDo)[number];

export const skillCategories = ["cloud", "backend", "frontend", "devops", "languages"] as const;
export type SkillCategory = (typeof skillCategories)[number];
