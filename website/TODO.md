# RotaAI Pazarlama Sitesi — TODO / Durum

PRD: `../docs/09-marketing-website.md`. Her gereksinim → durum. Kapsam sınırı = PRD §6 (blog/login/fiyat/API portal YOK).

## Stack & altyapı
- [x] Astro + Tailwind (§4) — statik çıktı, node adapter yalnız `/api/lead` için
- [x] Yalnız `./website` içinde çalışıldı, repo geri kalanına dokunulmadı (§4)
- [x] Sade/gizlilik-dostu — 3. parti takip yok (US-20)

## Modüller (§4)
- [x] `content` — tipli içerik koleksiyonu (zod şema `content/schema.ts` + `content/tr.ts`); section'lar string gömmez
- [x] `sections` — sunumsal: Hero, Problem, HowItWorks(4), DetectionCatalog, UseCases, Comparison, Trust, FAQ, FinalCTA, Footer (+ Header)
- [x] `demo-lead` — saf `buildLeadPayload(formData) -> LeadPayload | ValidationError` + ince `submit` adaptörü + `/api/lead` ucu
- [x] SocialProof — kullanıcı kararıyla ÇIKARILDI (gereksiz, sıfır rakam)

## Tespit kataloğu (§4)
- [x] MVP sınıfları: levha, pano, bariyer, direk, yol işaretlemesi
- [x] Çukur/çatlak = "yakında · eklenti" etiketi

## Dürüstlük / no fake metrics (§4, §7, CLAUDE.md §1)
- [x] Comparison ₺/km + km satırları bariz placeholder ("— pilot sonrası —"), sahte sayı yok
- [x] SocialProof rakamı yok; ton "pilot aşamasında"
- [ ] Gerçek pilot rakamları geldiğinde Comparison placeholder'ları doldur (kullanıcı verecek)

## Gizlilik / KVKK
- [x] Form yalnız kendi ucuna POST (`/api/lead`); URL'de kişisel veri yok
- [x] `buildLeadPayload` yalnız adlı alanları geçirir (extra alan sızmaz — testli)
- [x] KVKK sayfası (`/kvkk`): plaka/yüz blur, org_id/RLS izolasyon, 3. parti takip yok

## Dil (§4 i18n)
- [x] TR birincil, tam içerik
- [x] Yapı EN'e hazır (aynı şema ile `en.ts` eklenebilir)
- [ ] EN içerik — opsiyonel, MVP dışı (US-15)

## User stories → durum
- [x] US1 Hero tek cümle değer önerisi
- [x] US2 HowItWorks 4 adım
- [x] US3 DetectionCatalog (5 MVP sınıf + çukur "yakında")
- [x] US4 Comparison LiDAR (niteliksel + ₺ placeholder)
- [x] US5 Trust: plaka/yüz blur + veri yeri
- [x] US6 Trust: org_id/RLS kurum ayrımı
- [x] US7 Tekrarlı "Demo Talep Et" (header + hero + final)
- [x] US8 Kısa demo formu (ad/kurum/e-posta/telefon?/mesaj?)
- [x] US9 Mobil responsive (Tailwind md/sm breakpoint) — önizlemede doğrulanacak
- [x] US10 SEO meta (title/description/og) + semantik başlık
- [x] US11 Gerçek metrik yok → dürüst ton
- [x] US12 Standart telefon + araç vurgusu (Hero/FAQ)
- [x] US13 Human-in-the-loop notu (HowItWorks)
- [x] US14 Sürekli izleme faydası (Problem)
- [x] US15 EN yapı hazır (içerik opsiyonel)
- [x] US16 FAQ bölümü
- [x] US17 Form kaydı üretir (`/api/lead` loglar; backend seam hazır)
- [x] US18 İçerik koda dokunmadan düzenlenebilir (`content/tr.ts`)
- [x] US19 Ekosistem: yol hasarı modülü "yakında" olarak görünür
- [x] US20 Sade analitik / 3. parti takip yok

## Test (§5)
- [x] `buildLeadPayload` unit testleri: valid→payload, eksik/bozuk email→ValidationError, extra alan sızmaz
- [x] Section'lar unit-test edilmez (sunumsal)

## Doğrulama
- [x] `npm run build` temiz
- [x] `npm run test` yeşil
- [ ] Tarayıcı önizleme: responsive + form akışı (verification workflow)

## Açık / kullanıcıya bağlı
- [ ] Gerçek LiDAR ₺ karşılaştırma rakamları (kullanıcı verecek → placeholder dolacak)
- [ ] Gerçek backend lead ucu (03) — `submit.ts` + `/api/lead` seam hazır, bağlanacak
- [ ] Gerçek domain (`astro.config.mjs` `site`)
