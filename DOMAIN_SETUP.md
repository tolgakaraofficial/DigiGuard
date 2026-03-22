# DigiGuard Domain Yapılandırma Rehberi

## Özel Domain: digiguard.com

Bu rehber, DigiGuard projesini özel domain (digiguard.com) ile yayınlamak için gereken adımları içerir.

---

## 1. Domain Satın Alma

### Önerilen Domain Sağlayıcıları:
- **Namecheap** (https://www.namecheap.com)
- **GoDaddy** (https://www.godaddy.com)
- **Google Domains** (https://domains.google)
- **Cloudflare Registrar** (https://www.cloudflare.com/products/registrar/)

### Domain Maliyeti:
- **.com domain**: ~$10-15/yıl
- Özel fiyatlar ve promosyonlar için sağlayıcıları kontrol edin

---

## 2. Netlify Domain Yapılandırması

### Adım 1: Netlify'da Custom Domain Ekleme

1. **Netlify Dashboard'a giriş yapın**
   - https://app.netlify.com

2. **DigiGuard projesini seçin**

3. **Site Settings** > **Domain Management** bölümüne gidin

4. **Add custom domain** butonuna tıklayın

5. Domain adınızı girin:
   ```
   digiguard.com
   ```

6. **Verify** butonuna tıklayın

### Adım 2: DNS Kayıtlarını Yapılandırma

Domain sağlayıcınızın (Namecheap, GoDaddy, vb.) kontrol paneline giriş yapın ve aşağıdaki DNS kayıtlarını ekleyin:

#### A Record (Apex domain için):
```
Type: A
Host: @
Value: 75.2.60.5
TTL: Automatic (veya 3600)
```

#### CNAME Record (www için):
```
Type: CNAME
Host: www
Value: digiguard.netlify.app
TTL: Automatic (veya 3600)
```

### Adım 3: SSL/HTTPS Aktivasyonu

1. Netlify Dashboard'da **Domain Settings** > **HTTPS** bölümüne gidin

2. **Verify DNS Configuration** butonuna tıklayın

3. DNS kayıtları doğrulandıktan sonra (5-30 dakika sürebilir):
   - **Provision certificate** butonuna tıklayın

4. Let's Encrypt ücretsiz SSL sertifikası otomatik olarak oluşturulacak

5. **Force HTTPS** seçeneğini aktifleştirin

---

## 3. DNS Propagation (Yayılma)

DNS değişikliklerinin dünya çapında yayılması **24-48 saat** sürebilir, ancak genellikle:
- **5-30 dakika**: Çoğu bölgede aktif olur
- **2-4 saat**: Global yayılma tamamlanır

### DNS Propagation Kontrol Araçları:
- https://www.whatsmydns.net
- https://dnschecker.org

---

## 4. Domain Sağlayıcı Bazlı Özel Talimatlar

### Namecheap

1. **Advanced DNS** sekmesine gidin
2. **Add New Record** butonuna tıklayın
3. Yukarıdaki DNS kayıtlarını ekleyin
4. Nameserver'ların Namecheap BasicDNS olduğundan emin olun

### GoDaddy

1. **DNS Management** bölümüne gidin
2. **Add** butonuna tıklayın
3. Record type seçin (A veya CNAME)
4. Gerekli bilgileri girin
5. **Save** butonuna tıklayın

### Cloudflare

1. **DNS** sekmesine gidin
2. **Add record** butonuna tıklayın
3. DNS kayıtlarını ekleyin
4. **Proxy status**: "DNS only" (turuncu bulut) olmalı
   - Not: Netlify ile kullanım için Cloudflare proxy'si kapalı olmalı

### Google Domains

1. **DNS** bölümüne gidin
2. **Manage custom records** tıklayın
3. Kayıtları ekleyin
4. Değişiklikleri kaydedin

---

## 5. Doğrulama ve Test

### Domain Kontrolü:
```bash
# A Record kontrolü
dig digiguard.com

# CNAME kontrolü
dig www.digiguard.com

# Nameserver kontrolü
dig NS digiguard.com
```

### Browser Testleri:
1. http://digiguard.com → https://digiguard.com yönlendirmesi
2. http://www.digiguard.com → https://digiguard.com yönlendirmesi
3. https://www.digiguard.com → https://digiguard.com yönlendirmesi
4. https://digiguard.com → Ana sayfa yüklenmesi (SSL ile)

### SSL Sertifika Kontrolü:
```bash
# SSL sertifikası detayları
openssl s_client -connect digiguard.com:443 -servername digiguard.com
```

---

## 6. Özel Netlify Ayarları

### _redirects Dosyası
Proje içinde `public/_redirects` dosyası otomatik olarak oluşturuldu:
```
# Force HTTPS
http://digiguard.com/* https://digiguard.com/:splat 301!
http://www.digiguard.com/* https://digiguard.com/:splat 301!

# Redirect www to non-www
https://www.digiguard.com/* https://digiguard.com/:splat 301!

# SPA fallback
/*    /index.html   200
```

### netlify.toml
`netlify.toml` dosyası domain yapılandırması ile güncellendi.

---

## 7. E-posta Yapılandırması (Opsiyonel)

Domain üzerinde e-posta kullanmak için:

### Seçenek 1: Google Workspace (Eski adıyla G Suite)
- Maliyet: $6-18/kullanıcı/ay
- Özellikler: Gmail, Drive, Meet, Calendar
- Setup: https://workspace.google.com

### Seçenek 2: Microsoft 365
- Maliyet: $5-20/kullanıcı/ay
- Özellikler: Outlook, OneDrive, Teams
- Setup: https://www.microsoft.com/microsoft-365

### Seçenek 3: Zoho Mail (Ücretsiz Plan)
- Maliyet: Ücretsiz (5 kullanıcıya kadar)
- Özellikler: Temel e-posta servisi
- Setup: https://www.zoho.com/mail

### E-posta için DNS Kayıtları:
Domain sağlayıcınızda MX kayıtları eklemeniz gerekecek (her servis için farklı).

---

## 8. Güvenlik ve İzleme

### Security Headers
`netlify.toml` dosyasında güvenlik başlıkları yapılandırıldı:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### SSL/TLS Yapılandırması
- **TLS 1.3** otomatik olarak etkin
- **Let's Encrypt** sertifikası 90 günde bir otomatik yenilenir
- **HSTS** (HTTP Strict Transport Security) aktif

### İzleme Araçları
1. **Google Analytics** - Web trafiği izleme
2. **Google Search Console** - SEO ve arama performansı
3. **Netlify Analytics** - Gerçek zamanlı trafik ve performans

---

## 9. SEO Optimizasyonu

### robots.txt
`public/robots.txt` dosyası oluşturun:
```
User-agent: *
Allow: /
Sitemap: https://digiguard.com/sitemap.xml
```

### sitemap.xml
SEO için sitemap oluşturulmalı (gelecek güncellemede eklenecek).

### Meta Tags
HTML head bölümünde:
```html
<meta name="description" content="DigiGuard - Dijital Kimlik Koruma Sistemi">
<meta property="og:url" content="https://digiguard.com">
<meta property="og:type" content="website">
<meta property="og:title" content="DigiGuard">
<meta property="og:description" content="AI tabanlı dijital kimlik koruma platformu">
<link rel="canonical" href="https://digiguard.com">
```

---

## 10. Troubleshooting (Sorun Giderme)

### Problem: DNS değişiklikleri çalışmıyor
**Çözüm:**
- DNS cache'i temizleyin:
  ```bash
  # Windows
  ipconfig /flushdns

  # macOS
  sudo dscacheutil -flushcache

  # Linux
  sudo systemd-resolve --flush-caches
  ```
- Browser cache'i temizleyin (Ctrl+Shift+Delete)
- Farklı DNS kullanın (8.8.8.8 - Google DNS)

### Problem: SSL sertifikası oluşturulmuyor
**Çözüm:**
- DNS kayıtlarının doğru olduğundan emin olun
- 30 dakika bekleyin ve tekrar deneyin
- Netlify support'a ticket açın

### Problem: www yönlendirmesi çalışmıyor
**Çözüm:**
- CNAME kaydının doğru olduğunu kontrol edin
- `_redirects` dosyasının `public/` klasöründe olduğundan emin olun
- Build işlemi sonrası `dist/_redirects` dosyasının oluşturulduğunu kontrol edin

### Problem: Mixed content (HTTP/HTTPS karışımı)
**Çözüm:**
- Tüm kaynak URL'lerinin HTTPS kullandığından emin olun
- Browser console'da hataları kontrol edin
- External API'ler ve CDN'lerin HTTPS desteklediğinden emin olun

---

## 11. Maliyet Özeti

### Minimum Maliyet (Yıllık):
```
Domain (digiguard.com):        ~$10-15/yıl
Netlify Hosting:               $0 (Starter plan)
SSL Sertifikası:               $0 (Let's Encrypt)
─────────────────────────────────────────
TOPLAM:                        ~$10-15/yıl
```

### Opsiyonel Ek Maliyetler:
```
Netlify Pro Plan:              $19/ay ($228/yıl)
E-posta (Google Workspace):    $6-18/kullanıcı/ay
CDN/DDoS Protection:           Değişken
Domain Privacy:                $5-10/yıl
```

---

## 12. Sonraki Adımlar

1. ✅ Domain satın alın (digiguard.com)
2. ✅ DNS kayıtlarını yapılandırın
3. ✅ Netlify'da custom domain ekleyin
4. ✅ SSL sertifikasını aktifleştirin
5. ✅ Domain propagation'ı bekleyin (24-48 saat)
6. ✅ Tüm yönlendirmeleri test edin
7. ⬜ Google Search Console ekleyin
8. ⬜ Google Analytics entegrasyonu
9. ⬜ Sosyal medya hesaplarını güncelleyin
10. ⬜ E-posta adresleri yapılandırın (info@, support@)

---

## 13. Destek ve Kaynaklar

### Netlify Dokümantasyonu:
- Custom Domains: https://docs.netlify.com/domains-https/custom-domains/
- HTTPS/SSL: https://docs.netlify.com/domains-https/https-ssl/
- Redirects: https://docs.netlify.com/routing/redirects/

### Domain Yönetimi:
- Namecheap KB: https://www.namecheap.com/support/knowledgebase/
- GoDaddy Help: https://www.godaddy.com/help
- Cloudflare Docs: https://developers.cloudflare.com/dns/

### İletişim:
- **DigiGuard Destek**: support@digiguard.com
- **Netlify Support**: https://www.netlify.com/support/

---

**Son Güncelleme:** 2026-03-22
**Durum:** Domain yapılandırması hazır, DNS kurulumu bekleniyor
