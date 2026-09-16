import type { LeadFormData } from './types';

export interface SubmitResult {
  ok: boolean;
  errors?: Record<string, string>;
}

/**
 * Thin browser-side adapter (PRD §4). Posts the raw form fields to the site's
 * OWN endpoint (/api/lead) — never a third party (US-20), never personal data
 * in the URL. Validation is the endpoint's job (buildLeadPayload runs there);
 * this just ships the fields and reports the outcome.
 *
 * When the real backend lands, only the URL here (and the endpoint) changes.
 */
export async function submitLead(formData: LeadFormData): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => ({}))) as { errors?: Record<string, string> };
    return { ok: false, errors: data.errors };
  } catch {
    return { ok: false, errors: { _form: 'Gönderim başarısız. Lütfen tekrar deneyin.' } };
  }
}
