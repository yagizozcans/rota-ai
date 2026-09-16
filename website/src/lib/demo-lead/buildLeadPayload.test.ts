import { describe, it, expect } from 'vitest';
import { buildLeadPayload } from './buildLeadPayload';

const NOW = '2026-07-26T10:00:00.000Z';

describe('buildLeadPayload', () => {
  it('valid input -> LeadPayload with source and submitted_at', () => {
    const r = buildLeadPayload(
      { name: 'Ayşe Yılmaz', org: 'KGM 5. Bölge', email: 'ayse@kgm.gov.tr' },
      NOW,
    );
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.payload).toEqual({
        name: 'Ayşe Yılmaz',
        org: 'KGM 5. Bölge',
        email: 'ayse@kgm.gov.tr',
        source: 'website',
        submitted_at: NOW,
      });
    }
  });

  it('includes optional phone and message when present', () => {
    const r = buildLeadPayload(
      { name: 'A', org: 'B', email: 'a@b.co', phone: '0555', message: 'merhaba' },
      NOW,
    );
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.payload.phone).toBe('0555');
      expect(r.payload.message).toBe('merhaba');
    }
  });

  it('trims whitespace on all fields', () => {
    const r = buildLeadPayload(
      { name: '  A  ', org: '  B ', email: '  a@b.co ' },
      NOW,
    );
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.payload.name).toBe('A');
      expect(r.payload.org).toBe('B');
      expect(r.payload.email).toBe('a@b.co');
    }
  });

  it('missing required fields -> ValidationError listing each', () => {
    const r = buildLeadPayload({}, NOW);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.name).toBeDefined();
      expect(r.errors.org).toBeDefined();
      expect(r.errors.email).toBeDefined();
    }
  });

  it('bad email -> ValidationError on email', () => {
    const r = buildLeadPayload({ name: 'A', org: 'B', email: 'not-an-email' }, NOW);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.email).toBe('Geçerli bir e-posta girin.');
      expect(r.errors.name).toBeUndefined();
    }
  });

  it('empty optional phone/message are omitted, not stored as ""', () => {
    const r = buildLeadPayload(
      { name: 'A', org: 'B', email: 'a@b.co', phone: '   ', message: '' },
      NOW,
    );
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect('phone' in r.payload).toBe(false);
      expect('message' in r.payload).toBe(false);
    }
  });

  it('does not leak unknown/extra fields into the payload', () => {
    const r = buildLeadPayload(
      {
        name: 'A',
        org: 'B',
        email: 'a@b.co',
        // @ts-expect-error — extra field must be ignored, not copied through
        ssn: '123-45-6789',
        tracking: 'evil',
      },
      NOW,
    );
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(Object.keys(r.payload).sort()).toEqual(
        ['email', 'name', 'org', 'source', 'submitted_at'].sort(),
      );
      expect(JSON.stringify(r.payload)).not.toContain('123-45-6789');
    }
  });
});
