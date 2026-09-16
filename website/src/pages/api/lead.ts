import type { APIRoute } from 'astro';
import { buildLeadPayload } from '../../lib/demo-lead/buildLeadPayload';
import type { LeadFormData } from '../../lib/demo-lead/types';

// The lead form's own server endpoint (PRD §4). Functional NOW: validates with
// the shared pure fn, then logs the payload. When the real backend is built,
// swap the "persist" step below for a POST to 03-backend — the contract
// (LeadPayload) stays identical.
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let form: LeadFormData;
  try {
    form = (await request.json()) as LeadFormData;
  } catch {
    return json({ ok: false, errors: { _form: 'Geçersiz istek.' } }, 400);
  }

  const result = buildLeadPayload(form);
  if (!result.ok) {
    return json({ ok: false, errors: result.errors }, 422);
  }

  // TODO(backend): POST result.payload to 03-backend lead endpoint.
  // Şimdilik işlevsel: lead'i sunucu loguna düşür (hiçbir lead kaybolmasın).
  console.info('[lead]', JSON.stringify(result.payload));

  return json({ ok: true }, 200);
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
