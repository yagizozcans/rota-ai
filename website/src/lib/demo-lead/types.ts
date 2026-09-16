/**
 * demo-lead contract (PRD §4). LeadPayload is exactly the fields the PRD
 * names — nothing more. `source` is fixed to 'website'; `submitted_at` is an
 * ISO8601 string minted at build time.
 */
export interface LeadFormData {
  name?: string;
  org?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface LeadPayload {
  name: string;
  org: string;
  email: string;
  phone?: string;
  message?: string;
  source: 'website';
  submitted_at: string; // ISO8601
}

export interface ValidationError {
  ok: false;
  errors: Record<string, string>;
}

export interface ValidationOk {
  ok: true;
  payload: LeadPayload;
}

export type LeadResult = ValidationOk | ValidationError;
