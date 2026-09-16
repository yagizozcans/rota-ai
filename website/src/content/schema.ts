import { z } from 'zod';

/**
 * Typed content schemas (PRD §4 content module, §5 schema validation).
 * All site copy is validated against these at module load, so a missing or
 * malformed field fails fast instead of shipping a broken page. Sections
 * consume the parsed, typed content — they never hardcode strings.
 */

export const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const heroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
});

export const problemSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  pains: z.array(z.object({ title: z.string().min(1), body: z.string().min(1) })).min(1),
});

export const stepSchema = z.object({
  n: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const howItWorksSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  steps: z.array(stepSchema).length(4), // PRD: 4 adım
  humanNote: z.string().min(1), // human-in-the-loop (US-13)
});

// PRD: MVP tespit sınıfları yalnızca bunlar; çukur/çatlak "yakında" etiketli.
export const detectionSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  body: z.string().min(1),
  status: z.enum(['mvp', 'yakinda']),
});

export const detectionCatalogSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  items: z.array(detectionSchema).min(1),
});

export const useCaseSchema = z.object({
  key: z.string().min(1),
  audience: z.string().min(1),
  body: z.string().min(1),
});

export const useCasesSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  cases: z.array(useCaseSchema).min(1),
});

/**
 * Comparison rows. `value` is intentionally a free string so honest
 * placeholders ("— pilot sonrası —") can sit where real ₺ figures will go.
 * NO fabricated numbers (PRD §4/§7, CLAUDE.md §1) — a placeholder token is an
 * obvious blank, never a plausible fake metric.
 */
export const comparisonRowSchema = z.object({
  axis: z.string().min(1),
  rotaai: z.string().min(1),
  lidar: z.string().min(1),
  isPlaceholder: z.boolean().default(false),
});

export const comparisonSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  rows: z.array(comparisonRowSchema).min(1),
  note: z.string().min(1),
});

// Dün / Bugün / Yarın narrative (statik harita → sürekli otonom envanter).
export const timelineSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  phases: z
    .array(z.object({ tag: z.string().min(1), title: z.string().min(1), body: z.string().min(1) }))
    .length(3),
});

// GIS export teaser (IT/BT persona, US-6). Formats only — no fabricated metric.
export const apiTeaserSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  formats: z.array(z.string().min(1)).min(1),
});

export const trustSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  points: z.array(z.object({ title: z.string().min(1), body: z.string().min(1) })).min(1),
});

export const faqSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).min(1),
});

export const finalCtaSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  formIntro: z.string().min(1),
});

export const footerSchema = z.object({
  tagline: z.string().min(1),
  links: z.array(ctaSchema).min(1),
  legal: z.string().min(1),
});

export const siteMetaSchema = z.object({
  lang: z.string().min(2),
  brand: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const siteContentSchema = z.object({
  meta: siteMetaSchema,
  hero: heroSchema,
  problem: problemSchema,
  timeline: timelineSchema,
  howItWorks: howItWorksSchema,
  detectionCatalog: detectionCatalogSchema,
  useCases: useCasesSchema,
  comparison: comparisonSchema,
  apiTeaser: apiTeaserSchema,
  trust: trustSchema,
  faq: faqSchema,
  finalCta: finalCtaSchema,
  footer: footerSchema,
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type Detection = z.infer<typeof detectionSchema>;
export type ComparisonRow = z.infer<typeof comparisonRowSchema>;
export type Timeline = z.infer<typeof timelineSchema>;
export type ApiTeaser = z.infer<typeof apiTeaserSchema>;
