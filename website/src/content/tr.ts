import { siteContentSchema, type SiteContent } from './schema';

/**
 * TR site content (PRD §4: TR zorunlu, birincil dil). EN opsiyonel — aynı
 * şema ile `en.ts` eklenebilir; yapı çok-dile hazır (US-15), MVP'de yalnız TR.
 *
 * Kural: burada UYDURMA nicel iddia YOK (PRD §4/§7). Rakamlar (₺/km, taranan
 * km, referans) gerçek pilot verisiyle gelir; o güne kadar dürüst placeholder.
 */
const tr = {
  meta: {
    lang: 'tr',
    brand: 'RotaAI',
    title: 'RotaAI — Yapay Zeka Destekli Yol Envanteri',
    description:
      'Standart akıllı telefonla, özel donanım olmadan yol varlıklarını (levha, pano, bariyer, direk, işaretleme) otomatik tespit eden yapay zeka destekli yol envanteri ve bakım karar destek platformu.',
  },

  hero: {
    eyebrow: 'Yol envanteri · yapay zeka',
    title: 'Yol envanterinizi yapay zeka ile çıkarın — özel donanım yok.',
    subtitle:
      'Saha aracına monte edilen standart bir akıllı telefonla yol varlıklarını otomatik tespit edin, koordinatlayın ve insan onayıyla tasdikleyin. LiDAR taşeronu yok, haftalarca bekleme yok.',
    primaryCta: { label: 'Demo Talep Et', href: '#demo' },
    secondaryCta: { label: 'Nasıl çalışır?', href: '#nasil-calisir' },
  },

  problem: {
    title: 'Yol envanteri neden zor?',
    intro:
      'Geleneksel yol envanteri pahalı taşeron, özel LiDAR aracı ve haftalarca süren manuel işaretleme demek. Yılda tek geçiş, öznel değerlendirme, gecikmeli veri.',
    pains: [
      {
        title: 'Pahalı ve yavaş',
        body: 'Özel donanımlı taşeron geçişi maliyetli; sonuç haftalar sonra gelir. Bütçe tek bir yıllık geçişe sıkışır.',
      },
      {
        title: 'Öznel ve tutarsız',
        body: 'Manuel saha değerlendirmesi kişiden kişiye değişir; envanterin tekrar edilebilirliği düşüktür.',
      },
      {
        title: 'Gecikmeli görünürlük',
        body: 'Yılda tek geçişte, iki geçiş arasında oluşan yeni eksikler görülmez — bakım her zaman reaktif kalır.',
      },
    ],
  },

  timeline: {
    title: 'Yol envanteri nereye gidiyor?',
    intro: 'Statik haritalar ve yıllık taşeron geçişlerinden, her sürüşte kendini güncelleyen sürekli envantere.',
    phases: [
      {
        tag: 'Dün',
        title: 'Manuel saha & LiDAR',
        body: 'Pahalı taşeron geçişi, özel donanım ve haftalarca süren elle işaretleme. Yılda tek kez, öznel.',
      },
      {
        tag: 'Bugün',
        title: 'Telefonla yapay zeka',
        body: 'Araç camına monte standart telefon çeker, yapay zeka tespit eder, harita mühendisi onaylar. Haftalar değil, günler.',
      },
      {
        tag: 'Yarın',
        title: 'Sürekli otonom envanter',
        body: 'Her sürüş envanteri günceller; sahadaki değişim otomatik yakalanır. Reaktif değil, proaktif bakım.',
      },
    ],
  },

  howItWorks: {
    title: 'Nasıl çalışır?',
    intro: 'Dört adım. Özel donanım, kalibrasyon veya ağ-özel eğitim gerekmez.',
    steps: [
      {
        n: 1,
        title: 'Sahada çek',
        body: 'RotaAI mobil uygulaması araç camına monte standart bir telefonda çalışır. Sürüş sırasında mesafe bazlı otomatik foto + GPS + metadata toplar — offline da olsa veri kaybolmaz.',
      },
      {
        n: 2,
        title: 'Yapay zeka tespit eder',
        body: 'Yüklenen kareler AI pipeline’dan geçer; yol varlıkları (levha, pano, bariyer, direk, işaretleme) otomatik tespit edilip sınıflandırılır ve güven skoruyla işaretlenir.',
      },
      {
        n: 3,
        title: 'Koordinatlanır',
        body: 'Her tespit GPS ile eşlenip PostGIS’e yazılır ve kurumun koordinat sistemine (TUSAGA-Aktif/ITRF) dönüştürülür. Mekansal, sorgulanabilir envanter.',
      },
      {
        n: 4,
        title: 'İnsan onaylar',
        body: 'Harita mühendisi onay konsolunda her öğeyi tasdikler: onayla / düzelt / reddet. Yalnızca onaylananlar final katmana geçer.',
      },
    ],
    humanNote:
      'Sonuçlar insan onaylıdır (human-in-the-loop). Yapay zeka öneriyi üretir, karar sizde kalır — AI hatasına körü körüne güvenmezsiniz.',
  },

  detectionCatalog: {
    title: 'Neyi tespit eder?',
    intro:
      'MVP çekirdeği yol varlıklarıdır. Yüzey hasarı (çukur/çatlak) opsiyonel eklenti modül olarak yol haritasındadır.',
    items: [
      { key: 'levha', label: 'Trafik Levhası', body: 'Dur, yol ver, hız sınırı ve diğer düzenleyici/uyarıcı levhalar.', status: 'mvp' },
      { key: 'pano', label: 'Yönlendirme Panosu', body: 'Bilgilendirme ve yön panoları, tabelalar.', status: 'mvp' },
      { key: 'bariyer', label: 'Bariyer / Otokorkuluk', body: 'Yol kenarı güvenlik bariyerleri ve otokorkuluklar.', status: 'mvp' },
      { key: 'direk', label: 'Direk', body: 'Aydınlatma direkleri, levha direkleri ve benzeri dikey altyapı.', status: 'mvp' },
      { key: 'isaretleme', label: 'Yol İşaretlemesi', body: 'Şerit çizgileri, yaya geçidi ve zemin işaretlemeleri.', status: 'mvp' },
      { key: 'hasar', label: 'Yüzey Hasarı (çukur / çatlak)', body: 'Yol yüzeyi hasar tespiti — opsiyonel eklenti modül.', status: 'yakinda' },
    ],
  },

  useCases: {
    title: 'Kimler için?',
    intro: 'Yol ağı yöneten her kurum — kamu ya da özel.',
    cases: [
      { key: 'kgm', audience: 'Karayolları / KGM Bölge', body: 'Geniş yol ağının varlık envanterini düşük maliyetle, tekrarlanabilir biçimde çıkarın ve güncel tutun.' },
      { key: 'belediye', audience: 'Belediye / Fen İşleri', body: 'Şehir içi levha, işaretleme ve altyapı envanterini kendi araçlarınızla, teknik ekip gerekmeden toplayın.' },
      { key: 'ozel', audience: 'Özel Altyapı / Müteahhit', body: 'İhale ve bakım sözleşmeleri için hızlı, belgelenebilir envanter ve değişim takibi.' },
    ],
  },

  comparison: {
    title: 'LiDAR taşeronuna karşı RotaAI',
    intro:
      'Aynı işi standart telefon + araçla, kendi ekibinizle yaparsınız. Aşağıdaki maliyet karşılaştırması gerçek pilot verimizle doldurulacaktır.',
    rows: [
      { axis: 'Donanım', rotaai: 'Standart akıllı telefon + mevcut araç', lidar: 'Özel LiDAR/kamera donanımlı araç', isPlaceholder: false },
      { axis: 'Sonuç süresi', rotaai: 'Yükleme sonrası kısa sürede', lidar: 'Genelde haftalar (manuel işaretleme)', isPlaceholder: false },
      { axis: 'Tekrarlanabilirlik', rotaai: 'Otomatik + insan onaylı, tutarlı', lidar: 'İşaretlemeci ekibe göre değişebilir', isPlaceholder: false },
      { axis: 'Maliyet (₺ / km)', rotaai: '— pilot sonrası —', lidar: '— pilot sonrası —', isPlaceholder: true },
      { axis: 'Kapsama (km)', rotaai: '— pilot sonrası —', lidar: '— pilot sonrası —', isPlaceholder: true },
    ],
    note: 'Nicel maliyet ve kapsama rakamları ilk saha pilotunun ölçülmüş verisiyle eklenecektir. Yer tutucu değerler gerçek sonuç değildir.',
  },

  apiTeaser: {
    title: 'Envanteriniz, kurumunuzun sistemine hazır çıkar.',
    intro: 'Onaylı yol varlıkları standart coğrafi formatlarda dışa aktarılır — QGIS, ArcGIS veya mevcut GIS altyapınıza doğrudan. Ham veri WGS84 saklanır, çıktı kurumunuzun koordinat sistemine (TUSAGA-Aktif) dönüştürülür.',
    formats: ['GeoJSON', 'Shapefile', 'WFS', 'WGS84', 'TUSAGA-Aktif'],
  },

  trust: {
    title: 'Veri güvenliği ve KVKK',
    intro: 'Kamu verisi hassastır. RotaAI bunu vitrin değil, mimari olarak ele alır.',
    points: [
      { title: 'Plaka ve yüz bulanıklaştırma', body: 'Görüntüler işlenirken plaka ve yüzler otomatik anonimleştirilir — KVKK uyumu MVP’ye dahildir.' },
      { title: 'Kurum verisi ayrımı', body: 'Her kurumun verisi kiracı anahtarı (org_id) + satır düzeyi güvenlik (RLS) ile mantıksal olarak izole edilir; bir kurumun sorgusu diğerinin verisine erişemez.' },
      { title: 'Veri yeri', body: 'Görüntü ve veritabanı barındırma bölgesi kurum hassasiyetine göre seçilir; veri Türkiye’de/AB’de tutulabilir.' },
      { title: 'Erişim kontrolü', body: 'JWT tabanlı kimlik doğrulama ve rol bazlı erişim; erişim logları tutulur.' },
    ],
  },

  faq: {
    title: 'Sık sorulan sorular',
    items: [
      { q: 'Özel bir donanım almam gerekiyor mu?', a: 'Hayır. Standart bir akıllı telefon ve mevcut aracınız yeterli. LiDAR veya özel kamera gerekmez.' },
      { q: 'İnternet olmayan bölgelerde çalışır mı?', a: 'Evet. Mobil uygulama offline-first çalışır; kareler cihazda saklanır, sinyal gelince otomatik yüklenir. Veri kaybolmaz.' },
      { q: 'Yapay zekanın hatasına nasıl güveneceğim?', a: 'Güvenmek zorunda değilsiniz. Her tespit onay konsolunda bir harita mühendisi tarafından tasdiklenir; yalnızca onaylananlar final envantere geçer.' },
      { q: 'Verimiz başka kurumla karışır mı?', a: 'Hayır. Her kayıt kurum anahtarı (org_id) taşır ve satır düzeyi güvenlik ile izole edilir. Bir kurum yalnızca kendi verisini görür.' },
      { q: 'Çukur ve çatlak tespiti var mı?', a: 'Yüzey hasarı opsiyonel bir eklenti modüldür (yol haritasında). MVP çekirdeği yol varlıklarıdır: levha, pano, bariyer, direk, işaretleme.' },
    ],
  },

  finalCta: {
    title: 'Yol envanterinizi konuşalım',
    body: 'RotaAI şu an saha pilotu aşamasındadır. Kurumunuz için bir demo ve pilot değerlendirmesi planlayalım.',
    formIntro: 'Kısa formu doldurun; ekibimiz sizinle iletişime geçsin.',
  },

  footer: {
    tagline: 'Yapay zeka destekli yol envanteri ve bakım karar destek platformu.',
    links: [
      { label: 'Nasıl çalışır', href: '#nasil-calisir' },
      { label: 'Neyi tespit eder', href: '#tespit' },
      { label: 'KVKK & Gizlilik', href: '/kvkk' },
      { label: 'Demo Talep Et', href: '#demo' },
    ],
    legal: '© 2026 RotaAI. Tüm hakları saklıdır.',
  },
} satisfies SiteContent;

// Fail-fast: içerik şemayı ihlal ederse build burada patlar (PRD §5).
export const content: SiteContent = siteContentSchema.parse(tr);
