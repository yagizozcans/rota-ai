import type { LeadFormData, LeadResult } from './types';

// Deliberately small, standard-enough email shape. Not RFC-perfect on purpose:
// it rejects obvious junk without blocking real addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pure, DOM-free (PRD §4/§5). Turns raw form fields into a validated
 * LeadPayload or a ValidationError. The ONLY unit-tested seam in the project.
 *
 * Rules:
 * - name, org, email required; phone, message optional.
 * - email must match a basic shape.
 * - source is always 'website'; submitted_at is caller-supplied so the
 *   function stays pure (no Date.now() inside) and is testable.
 * - Only the named fields are copied into the payload — nothing else from
 *   formData leaks through (privacy, PRD §5 "no personal data leaks").
 */
export function buildLeadPayload(
  formData: LeadFormData,
  now: string = new Date().toISOString(),
): LeadResult {
  const errors: Record<string, string> = {};

  const name = (formData.name ?? '').trim();
  const org = (formData.org ?? '').trim();
  const email = (formData.email ?? '').trim();
  const phone = (formData.phone ?? '').trim();
  const message = (formData.message ?? '').trim();

  if (!name) errors.name = 'Ad zorunludur.';
  if (!org) errors.org = 'Kurum zorunludur.';
  if (!email) {
    errors.email = 'E-posta zorunludur.';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Geçerli bir e-posta girin.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    payload: {
      name,
      org,
      email,
      ...(phone ? { phone } : {}),
      ...(message ? { message } : {}),
      source: 'website',
      submitted_at: now,
    },
  };
}
