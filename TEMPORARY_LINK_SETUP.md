# DigiGuard - Geçici Reklamsız Link Kurulumu

## Netlify Ücretsiz Hosting

Netlify, reklamsız ve profesyonel geçici linkler sağlar. Domain satın almadan hemen kullanabilirsiniz.

---

## Hızlı Kurulum (5 Dakika)

### 1. Netlify Hesabı Oluşturun (Ücretsiz)

**Adım 1:** https://app.netlify.com/signup sayfasına gidin

**Seçenekler:**
- GitHub ile giriş yapın (Önerilen)
- GitLab ile giriş yapın
- Bitbucket ile giriş yapın
- E-posta ile kayıt olun

**Maliyet:** $0 (Tamamen ücretsiz)

---

### 2. GitHub Repository ile Deploy

#### Yöntem A: GitHub ile Otomatik Deploy (Önerilen)

1. **GitHub'da Repository Oluşturun:**
   ```bash
   # Henüz oluşturmadıysanız
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADI/digiguard.git
   git push -u origin main
   ```

2. **Netlify Dashboard'da:**
   - "Add new site" > "Import an existing project" tıklayın
   - GitHub'ı seçin
   - digiguard repository'sini seçin
   - Build settings:
     ```
     Build command: npm run build
     Publish directory: dist
     ```
   - "Deploy site" tıklayın

3. **Otomatik Link Oluşturuldu!**
   ```
   https://random-name-123456.netlify.app
   ```

#### Yöntem B: Netlify CLI ile Deploy (Hızlı)

```bash
# Netlify CLI'yi yükleyin
npm install -g netlify-cli

# Netlify'a giriş yapın
netlify login

# Projeyi deploy edin
netlify deploy --prod

# Build klasörünü seçin: dist
```

**Otomatik Link Oluşturulacak:**
```
https://digiguard-abc123.netlify.app
```

---

### 3. Site Adını Özelleştirin (Opsiyonel)

Otomatik oluşturulan ismi değiştirebilirsiniz:

1. **Netlify Dashboard'da:**
   - Site Settings > General > Site details
   - "Change site name" tıklayın
   - Yeni isim girin:
     ```
     digiguard
     digiguard-app
     digiguard-platform
     digiguard-demo
     ```

2. **Yeni Link:**
   ```
   https://digiguard.netlify.app
   https://digiguard-app.netlify.app
   https://digiguard-platform.netlify.app
   ```

**Not:** İsim müsaitse hemen kullanılabilir!

---

## Alternatif Ücretsiz Hosting Seçenekleri

### 1. Vercel (Önerilen)

**Link Format:** `https://digiguard.vercel.app`

**Kurulum:**
```bash
# Vercel CLI yükleyin
npm i -g vercel

# Deploy edin
vercel --prod
```

**Özellikler:**
- ✅ Reklamsız
- ✅ Otomatik HTTPS
- ✅ Hızlı CDN
- ✅ Ücretsiz

**Website:** https://vercel.com

---

### 2. GitHub Pages

**Link Format:** `https://KULLANICI_ADI.github.io/digiguard`

**Kurulum:**
```bash
# gh-pages paketi yükleyin
npm install --save-dev gh-pages

# package.json'a ekleyin:
"homepage": "https://KULLANICI_ADI.github.io/digiguard",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy edin
npm run deploy
```

**Özellikler:**
- ✅ Reklamsız
- ✅ Ücretsiz
- ✅ GitHub entegrasyonu
- ⚠️ Sadece statik siteler

---

### 3. Cloudflare Pages

**Link Format:** `https://digiguard.pages.dev`

**Kurulum:**
1. https://pages.cloudflare.com adresine gidin
2. GitHub repository'nizi bağlayın
3. Build ayarları:
   ```
   Build command: npm run build
   Build output: dist
   ```

**Özellikler:**
- ✅ Reklamsız
- ✅ Hızlı CDN
- ✅ Ücretsiz bandwidth
- ✅ DDoS koruması

---

### 4. Render

**Link Format:** `https://digiguard.onrender.com`

**Kurulum:**
1. https://render.com'a gidin
2. "New Static Site" seçin
3. GitHub repository bağlayın

**Özellikler:**
- ✅ Reklamsız
- ✅ Otomatik deploy
- ✅ Ücretsiz
- ⚠️ Soğuk başlatma olabilir

---

### 5. Railway

**Link Format:** `https://digiguard.up.railway.app`

**Kurulum:**
```bash
# Railway CLI yükleyin
npm i -g @railway/cli

# Giriş yapın
railway login

# Deploy edin
railway up
```

**Özellikler:**
- ✅ Reklamsız
- ✅ Modern UI
- ✅ Database desteği
- ⚠️ Limitli ücretsiz kullanım

---

## Karşılaştırma Tablosu

| Platform | Link Format | Ücretsiz | Reklamsız | HTTPS | CDN | Önerilen |
|----------|-------------|----------|-----------|-------|-----|----------|
| **Netlify** | `*.netlify.app` | ✅ | ✅ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Vercel** | `*.vercel.app` | ✅ | ✅ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Cloudflare Pages** | `*.pages.dev` | ✅ | ✅ | ✅ | ✅ | ⭐⭐⭐⭐ |
| **GitHub Pages** | `*.github.io` | ✅ | ✅ | ✅ | ❌ | ⭐⭐⭐⭐ |
| **Render** | `*.onrender.com` | ✅ | ✅ | ✅ | ✅ | ⭐⭐⭐ |
| **Railway** | `*.railway.app` | ⚠️ | ✅ | ✅ | ✅ | ⭐⭐⭐ |

---

## Hemen Kullanılabilir Link (Netlify Drop)

**En hızlı yöntem** - Kod yüklemeden test için:

1. **Build oluşturun:**
   ```bash
   npm run build
   ```

2. **Netlify Drop kullanın:**
   - https://app.netlify.com/drop adresine gidin
   - `dist` klasörünü sürükleyip bırakın
   - Anında link alın!

**Otomatik Link:**
```
https://random-word-12345.netlify.app
```

**Özellikler:**
- ⚡ 30 saniyede deploy
- 🚫 Reklamsız
- 🔒 HTTPS otomatik
- 💰 Ücretsiz
- ⏰ 24 saat aktif (veya ücretsiz hesapla kalıcı)

---

## Önerilen: Netlify ile Hızlı Kurulum

### Tek Komutla Deploy:

```bash
# 1. Netlify CLI yükleyin
npm install -g netlify-cli

# 2. Build oluşturun
npm run build

# 3. Deploy edin
netlify deploy --prod

# 4. dist klasörünü seçin
# ✓ Deploy edildi!
```

**Sonuç:**
```
Website Draft URL: https://digiguard-abc123.netlify.app
Website URL:       https://digiguard-abc123.netlify.app

Unique Deploy URL: https://6543210abcdef--digiguard-abc123.netlify.app
```

---

## Link Özellikleri

### Netlify Ücretsiz Plan İçeriği:

✅ **Reklamsız** - Tamamen temiz, profesyonel görünüm
✅ **HTTPS** - Otomatik SSL sertifikası
✅ **CDN** - Global hızlı erişim
✅ **Custom Domain** - İstediğiniz zaman ekleyebilirsiniz
✅ **Otomatik Deploy** - Git push ile otomatik güncelleme
✅ **Form Handling** - 100 form submission/ay
✅ **Analytics** - Temel kullanım istatistikleri
✅ **Bandwidth** - 100GB/ay
✅ **Build Minutes** - 300 dakika/ay

### Limitler:
- Bandwidth: 100GB/ay (genelde yeterli)
- Build minutes: 300/ay
- Concurrent builds: 1
- Team members: 1

---

## Link Güvenliği

### Otomatik Güvenlik Özellikleri:

1. **HTTPS/SSL:**
   - Let's Encrypt otomatik sertifika
   - TLS 1.3 desteği
   - HSTS başlıkları

2. **Security Headers:**
   - X-Frame-Options
   - X-Content-Type-Options
   - X-XSS-Protection
   - Referrer-Policy

3. **DDoS Koruması:**
   - Netlify CDN koruması
   - Rate limiting

---

## Link Paylaşımı

### Kullanıcılarla Paylaşın:

```
🔗 DigiGuard Demo:
https://digiguard.netlify.app

✅ Reklamsız
✅ Güvenli (HTTPS)
✅ Hızlı (CDN)
```

### QR Kod Oluşturun:

Online QR kod oluşturucular:
- https://www.qr-code-generator.com
- https://www.qrcode-monkey.com

---

## Monitoring ve Analytics

### Netlify Analytics (Opsiyonel - $9/ay)

Gerçek zamanlı:
- Sayfa görüntülemeleri
- Bandwidth kullanımı
- Top pages
- Traffic sources

### Ücretsiz Alternatifler:

1. **Google Analytics**
   - Detaylı kullanıcı takibi
   - Ücretsiz

2. **Cloudflare Analytics**
   - Gerçek zamanlı trafik
   - Ücretsiz

3. **Plausible / Fathom**
   - Privacy-friendly analytics
   - Ücretli

---

## Sonraki Adımlar

1. ✅ **Netlify hesabı oluşturun** (2 dakika)
2. ✅ **GitHub'a kod yükleyin** (5 dakika)
3. ✅ **Netlify'da deploy edin** (3 dakika)
4. ✅ **Linki paylaşın!**

**Toplam Süre:** ~10 dakika
**Maliyet:** $0
**Reklam:** Yok

---

## Destek

**Netlify Dokümantasyon:**
- https://docs.netlify.com

**Vercel Dokümantasyon:**
- https://vercel.com/docs

**DigiGuard Destek:**
- support@digiguard.com
- https://github.com/digiguard/digiguard/issues

---

## Özet

**En Hızlı Yöntem (Netlify Drop):**
1. `npm run build`
2. https://app.netlify.com/drop
3. `dist` klasörünü sürükle-bırak
4. Link hazır!

**En İyi Yöntem (GitHub + Netlify):**
1. GitHub'a yükle
2. Netlify'da import et
3. Otomatik deploy
4. Profesyonel link!

---

**Hazır!** Artık reklamsız, profesyonel bir linkiniz var.

**Örnek Linkler:**
- https://digiguard.netlify.app
- https://digiguard-demo.netlify.app
- https://digiguard-platform.netlify.app

**Durum:** Deployment hazır, 10 dakikada canlı olabilir!
