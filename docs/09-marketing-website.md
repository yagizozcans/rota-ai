# PRD — 09 Pazarlama Web Sitesi (Marketing Website)

*RotaAI kurumsal tanıtım sitesi. Katman haritası: `00-overview.md`. Bu doküman ürünün kendisini değil, ürünü **satan** vitrin sitesini tanımlar (B2G/B2B lead toplama).*
*Versiyon: 0.1 (MVP) — rakip analizi (Vaisala RoadAI, Mapillary, Blyncsy) temel alınarak türetildi.*

---

## 1. Problem Tanımı (kullanıcı gözünden)

RotaAI teknik olarak hazır (mobil çekim, AI pipeline, GIS, onay konsolu — 01–06), ama **karar vericinin ürünü görebileceği tek bir yer yok**. Bir KGM bölge müdürü, belediye fen işleri müdürü veya özel altyapı firması "yol envanterini yapay zeka ile nasıl çıkarırım" diye aradığında karşısına RotaAI çıkmıyor; çıksa bile ne yaptığını, rakiplerden (LiDAR taşeronu, manuel saha ekibi) neden ucuz/hızlı olduğunu, verisinin başka kurumla karışmayacağını (KVKK) tek bakışta anlayacağı bir sayfa yok.

Somut acılar:
- **Görünmezlik:** ürünün URL'i var, anlatısı yok → demo talebi gelmiyor.
- **Güven eksiği (B2G):** kamu alıcısı doğrulama, referans, KVKK/veri-yeri kanıtı ister; bunlar hiçbir yerde derli toplu değil.
- **Farklılaşma yok:** "LiDAR taşeronundan farkın ne, telefonla nasıl olur" sorusunun hazır cevabı yok → her satış görüşmesi sıfırdan başlıyor.
- **Lead kaçağı:** ilgilenen kurum iletişim/demo için net bir çağrı bulamıyor.

## 2. Çözüm (kullanıcı gözünden)

Tek sayfalık (long-form landing) + birkaç destek sayfalı, **statik, hızlı, SEO uyumlu, TR-öncelikli** bir tanıtım sitesi. Ziyaretçi tek kaydırmada: RotaAI ne yapar → nasıl çalışır (4 adım) → neyi tespit eder → kime yarar (KGM/belediye/özel) → LiDAR'a karşı neden ucuz/hızlı → veri güvenliği/KVKK → **demo talep et**. Ana dönüşüm hedefi: **demo/iletişim formu doldurma**.

Rakip kıyas (analiz edildi):
- **Vaisala RoadAI** (`xweather.com/roadai`): "Road-tested AI", same-day sonuç, sertifikasyon vurgusu, bölgesel demo takvimi, zengin tespit kataloğu. → doğrulama + katalog modelini örnek al.
- **Blyncsy** (`blyncsy.com`): "Smarter, Safer Roadways At Scale", %90 maliyet düşüşü, tekrarlanan "Book a Demo", isimli DOT referansları, LiDAR fiyat kıyası ($10/mil vs $200+). → nicel iddia + tekrarlı CTA + maliyet kıyası modelini örnek al.
- **Mapillary** (`mapillary.com`): "for everyone", ölçek vurgusu (3B görüntü), geliştirici/API katmanı, açık veri. → ölçek/sadelik tonunu örnek al (ama RotaAI açık-veri değil, kapalı kurumsal).

## 3. Kullanıcı Hikayeleri (User Stories)

1. Bir KGM bölge müdürü olarak, siteye girer girmez RotaAI'nin ne yaptığını tek cümlede görmek isterim, ki doğru yerde olup olmadığımı saniyeler içinde anlayayım.
2. Bir belediye fen işleri müdürü olarak, "nasıl çalışır"ı 4 basit adımda görmek isterim, ki teknik ekibim olmadan da mantığını kavrayayım.
3. Bir altyapı yöneticisi olarak, RotaAI'nin hangi yol varlıklarını (levha, pano, bariyer, direk, işaretleme) tespit ettiğini görsel bir katalogda görmek isterim, ki kendi envanter ihtiyacımı karşılayıp karşılamadığını anlayayım.
4. Bir kamu satın alma sorumlusu olarak, LiDAR taşeronu ile RotaAI arasındaki maliyet/hız farkını net bir kıyas tablosunda görmek isterim, ki bütçemi gerekçelendirebileyim.
5. Bir KVKK/hukuk sorumlusu olarak, plaka ve yüz bulanıklaştırma ile verinin Türkiye'de tutulduğunu açıkça görmek isterim, ki ihale şartnamesindeki gizlilik maddesini karşıladığını doğrulayayım.
6. Bir kurum BT sorumlusu olarak, "verimiz başka kurumla karışır mı" sorusunun cevabını (kiracı izolasyonu / `org_id` + RLS) görmek isterim, ki veri ayrımından emin olayım.
7. İlgilenen bir karar verici olarak, sayfanın her önemli noktasında "Demo Talep Et" butonu görmek isterim, ki karar verdiğim an aramaya çıkmadan iletişime geçeyim.
8. Bir potansiyel müşteri olarak, kısa bir demo formu (ad, kurum, e-posta, telefon, mesaj) doldurmak isterim, ki uzun kayıt olmadan hızlıca talep bırakayım.
9. Bir mobil ziyaretçi olarak, siteyi telefonda sorunsuz gezmek isterim, ki sahadan/araçtan bakarken de okuyabileyim.
10. Bir SEO ziyaretçisi olarak, "yapay zeka yol envanteri", "yol varlık tespiti", "KGM yol envanteri" aramalarında RotaAI'yi bulmak isterim.
11. Bir şüpheci alıcı olarak, gerçek referans/pilot sonuçlarını (örn. "X km tarandı", "Y varlık tespit edildi") görmek isterim, ki iddiaların kanıtını göreyim.
12. Bir teknik değerlendirici olarak, RotaAI'nin özel donanım değil **standart akıllı telefon + araç** ile çalıştığını görmek isterim, ki kurulum bariyerinin düşük olduğunu anlayayım.
13. Bir yönetici olarak, sonuçların insan onaylı (human-in-the-loop, onay konsolu) olduğunu görmek isterim, ki AI hatasına körü körüne güvenmediğimi bileyim.
14. Bir bütçe sahibi olarak, sürekli izleme (yılda tek geçiş değil) faydasını görmek isterim, ki proaktif bakımın değerini kavrayayım.
15. Bir uluslararası ziyaretçi olarak, siteyi İngilizce görmek isterim (opsiyonel), ki yerel olmayan paydaşlara da gösterebileyim.
16. Bir tekrar ziyaretçi olarak, sık sorulan soruları (SSS) bir bölümde görmek isterim, ki satış görüşmesi öncesi temel sorularımı gidereyim.
17. Site sahibi (RotaAI ekibi) olarak, gelen demo taleplerini e-posta/CRM'e düşen bir kayıt olarak almak isterim, ki hiçbir lead kaybolmasın.
18. Site sahibi olarak, site metinlerini (hero, tespit listesi, referanslar) koda dokunmadan güncellemek isterim, ki pazarlama içeriğini hızlı değiştirebileyim.
19. Bir paydaş olarak, ürün ekosistemini (yol hasarı modülü — çukur/çatlak, opsiyonel eklenti) görmek isterim, ki yol haritasını anlayayım.
20. Bir gizliliğe duyarlı ziyaretçi olarak, siteye ağır 3. parti takip yüklenmemesini isterim (sade analitik), ki KVKK tutarlılığı vitrinde de görünsün.

## 4. Uygulama Kararları (Implementation Decisions)

**Stack — ⚠️ kullanıcı onayı gerek:** Öneri **Astro + Tailwind CSS** (statik çıktı → hızlı + SEO güçlü; B2G pazarlama sitesi için SPA'dan üstün). Repo'da `review-console` zaten React+Vite+Tailwind kullanıyor, yani Tailwind bilinen bir yol. Alternatif: Next.js (statik export) veya düz Vite+React. Karar Astro lehine ama onay bekliyor.

**Yerleşim (repo):** yeni kardeş paket `./website` (mevcut `mobile/`, `backend/`, `ai-pipeline/`, `review-console/` yanında). `./website` dışında hiçbir şeye dokunulmaz.

**Modüller:**
- **`content` (veri-güdümlü içerik katmanı):** tüm kopya (hero, adımlar, tespit kataloğu kalemleri, referanslar, SSS) tipli içerik koleksiyonlarında (Astro content collections / TS objeler). *Derin modül:* metin değişince kod değişmez (US-18). Bölümler bu içeriği tüketir, string gömmez.
- **`sections` (sunum bileşenleri):** Hero, Problem, HowItWorks (4 adım), DetectionCatalog, UseCases (KGM/belediye/özel), Comparison (LiDAR kıyas tablosu), Trust (KVKK + kiracı izolasyonu), SocialProof (metrikler/referans), FAQ, FinalCTA, Footer. Sığ/sunumsal, içeriği `content`'ten alır.
- **`demo-lead` (form gönderimi):** *Derin, test edilebilir seam.* Saf `buildLeadPayload(formData) -> LeadPayload | ValidationError` fonksiyonu (RN/DOM'suz) + ince gönderim adaptörü. MVP hedefi: gönderim → e-posta (form servisi) veya `backend`'e basit `POST`. Doğrulama (zorunlu alan, e-posta formatı) saf fonksiyonda.
- **`i18n`:** TR birincil, EN opsiyonel (US-15). İçerik koleksiyonları dile göre anahtarlanır. MVP'de TR şart, EN "nice-to-have".

**İçerik kararları (rakip analizinden türetildi):**
- Hero başlık kalıbı: net değer önerisi + demo CTA (Blyncsy/Vaisala modeli). Örn. "Yapay zeka ile yol envanteri — özel donanım yok, standart telefonla."
- Nicel iddialar **yalnızca gerçek pilot verisi olınca** yayınlanır (US-11); placeholder/uydurma metrik konmaz. Veri gelene kadar bölüm "pilot sürüyor" tonunda.
- LiDAR kıyas tablosu: maliyet, hız (same-day), donanım, tekrar edilebilirlik eksenleri (Blyncsy $10/mil vs $200+ kıyasının TR karşılığı — gerçek fiyat girilmeden önce onaylanacak).
- Tespit kataloğu = 02 AI pipeline'ın MVP sınıfları: **levha, pano, bariyer, direk, yol işaretlemesi** (`00-overview §2`). Çukur/çatlak = opsiyonel yol hasarı modülü (07), "yakında/eklenti" olarak işaretlenir.
- Trust bölümü doğrudan `04 §4` (org_id + RLS) ve `06 §4` (plaka/yüz blur, veri-yeri) içeriğine dayanır — mevcut PRD kararlarıyla tutarlı, yeni iddia uydurulmaz.

**Form/veri kararları:**
- `LeadPayload` alanları: `name, org, email, phone?, message?, source='website', submitted_at`. Kişisel veri URL'e konmaz (KVKK). Form yalnızca kendi güvenli uç noktasına gönderilir.
- Analitik: sade/gizlilik-dostu (US-20) — ağır 3. parti takip yok.

**Kapsamdaki sayfalar:** ana landing (tek uzun sayfa) + KVKK/Gizlilik metni sayfası + (opsiyonel) demo teşekkür sayfası. Blog/çok-sayfa CMS MVP dışı.

## 5. Test Kararları (Testing Decisions)

İyi test = yalnızca **dış davranışı** test eder, uygulama detayını değil. Pazarlama sitesinde çoğu şey sunumsal (test değeri düşük); test bütçesi mantık taşıyan seam'e gider.

- **`demo-lead` (test edilir):** `buildLeadPayload` saf fonksiyonu — geçerli girdi → doğru `LeadPayload`; eksik zorunlu alan / bozuk e-posta → `ValidationError`; kişisel verinin payload dışında sızmadığı. Prior art: `mobile/` ve `backend/` saf-fonksiyon+jest deseni (örn. `distanceTrigger`, `blur.ts` testleri) — RN/DOM'suz saf mantık aynı şekilde test edilir.
- **`content` (hafif test):** koleksiyon şeması geçerli (zorunlu alanlar dolu, tespit kalemleri boş değil) — Astro content-collection şema doğrulaması yeterli, ayrı ağır test gerekmez.
- **`sections` (test edilmez):** saf sunum; görsel doğrulama tarayıcı önizlemesiyle (kabul kriteri altında) yapılır, birim test yazılmaz.
- **Kabul (manuel/önizleme):** mobil responsive, Lighthouse SEO/performans eşiği, TR içerik tam, tüm CTA'lar forma gidiyor, form gönderimi kayıt üretiyor.

*Kullanıcıya sorulacak:* hangi modüllere test isteniyor? Öneri: yalnızca `demo-lead`. Onay bekliyor.

## 6. Kapsam Dışı (Out of Scope)

- Ürünün kendisi (mobil app, AI, backend) — bunlar 01–07'de.
- Blog / haber / çok yazarlı CMS.
- Kullanıcı hesabı, login, müşteri paneli (onay konsolu 05 zaten ayrı ürün yüzeyi).
- Online ödeme / fiyat sayfası (satış demo üzerinden, enterprise model — rakiplerde de fiyat gizli).
- Açık veri / geliştirici API portalı (Mapillary'de var; RotaAI kapalı kurumsal, MVP dışı).
- Çok dilli tam lokalizasyon (EN opsiyonel; TR şart).
- A/B test altyapısı, pazarlama otomasyonu, CRM entegrasyonu (lead e-posta ile başlar).

## 7. Ek Notlar (Further Notes)

- Doğrulama/referans bölümü ürünün en zayıf B2G noktası: gerçek pilot çıkınca (KGM/belediye) buraya ölçülmüş metrik + isimli referans eklenmeli. O güne kadar dürüst "pilot aşamasında" tonu — sahte metrik yok (`CLAUDE.md §1`).
- Site tonu: kamu güveni odaklı, sade, iddiada ölçülü. Mapillary'nin "for everyone" açıklığından çok, Blyncsy/Vaisala'nın "kurumsal, doğrulanmış, ölçekli" tonu doğru hedef.
- Bu PRD proje issue tracker'a yayınlanacaktı; tracker bu oturumda kimlik doğrulaması olmadığından çıktı `docs/09-marketing-website.md` olarak yazıldı. Tracker'a taşınırsa `ready-for-agent` etiketiyle açılmalı.

**Kaynaklar (rakip analizi):** [Vaisala RoadAI](https://www.xweather.com/products/roadai) · [Mapillary](https://www.mapillary.com/) · [Blyncsy](https://blyncsy.com/) · [CityRover](https://cityrover.com/) · [Fugro Roads](https://www.fugro.com/expertise/roads)
