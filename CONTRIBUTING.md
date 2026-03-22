# Katkıda Bulunma Rehberi

DigiGuard projesine katkıda bulunmak istediğiniz için teşekkür ederiz! Bu rehber, projeye nasıl katkıda bulunabileceğiniz konusunda size yol gösterecektir.

## 📋 İçindekiler

- [Davranış Kuralları](#davranış-kuralları)
- [Nasıl Katkıda Bulunabilirim?](#nasıl-katkıda-bulunabilirim)
- [Geliştirme Ortamı Kurulumu](#geliştirme-ortamı-kurulumu)
- [Kod Standartları](#kod-standartları)
- [Commit Mesajları](#commit-mesajları)
- [Pull Request Süreci](#pull-request-süreci)
- [İssue Raporlama](#issue-raporlama)

## 🤝 Davranış Kuralları

DigiGuard topluluğu, herkes için açık ve misafirperver bir ortam yaratmayı taahhüt eder. Katkıda bulunanlar olarak:

- Saygılı ve kapsayıcı bir dil kullanın
- Farklı bakış açılarına ve deneyimlere açık olun
- Yapıcı eleştirileri nazikçe kabul edin
- Topluluk için en iyisine odaklanın
- Diğer topluluk üyelerine empati gösterin

## 🚀 Nasıl Katkıda Bulunabilirim?

### Hata Bildirimi

Bir hata bulduysanız:

1. [Issues](https://github.com/karprime/digiguard/issues) sayfasını kontrol edin
2. Benzer bir issue yoksa, yeni bir issue açın
3. Issue şablonunu doldurun ve detaylı bilgi verin
4. Hatayı yeniden oluşturma adımlarını ekleyin
5. Ekran görüntüleri veya log dosyaları ekleyin

### Özellik Önerisi

Yeni bir özellik önermek için:

1. [Discussions](https://github.com/karprime/digiguard/discussions) sayfasında öneriyi tartışın
2. Özelliğin neden gerekli olduğunu açıklayın
3. Kullanım senaryolarını paylaşın
4. Topluluk geri bildirimini bekleyin

### Kod Katkısı

1. Projeyi fork edin
2. Feature branch oluşturun
3. Kod değişikliklerinizi yapın
4. Testleri çalıştırın
5. Pull Request oluşturun

## 🛠️ Geliştirme Ortamı Kurulumu

### Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- Git
- Modern web tarayıcısı
- VSCode (önerilen)

### Kurulum Adımları

```bash
# Projeyi fork edin ve klonlayın
git clone https://github.com/YOUR_USERNAME/digiguard.git
cd digiguard

# Bağımlılıkları yükleyin
npm install

# Ortam değişkenlerini ayarlayın
cp .env.example .env
# .env dosyasını düzenleyin

# Geliştirme sunucusunu başlatın
npm run dev
```

### Önerilen VSCode Eklentileri

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- GitLens

## 📝 Kod Standartları

### TypeScript

- Her zaman TypeScript kullanın
- `any` tipinden kaçının
- Interface ve type tanımlarını kullanın
- Null safety'ye dikkat edin

```typescript
// İyi
interface User {
  id: string;
  email: string;
  phone: string;
}

const getUser = (id: string): User | null => {
  // implementation
};

// Kötü
const getUser = (id: any): any => {
  // implementation
};
```

### React Bileşenleri

- Functional component kullanın
- Hooks kullanın
- Props için interface tanımlayın
- Dosya başına bir bileşen

```typescript
// İyi
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
};

// Kötü
export const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### Stil ve Formatlama

- Tailwind CSS kullanın
- 2 boşluk indentation
- Satır sonu olarak LF kullanın
- Dosya sonunda yeni satır bırakın

```bash
# Kodu formatlamak için
npm run lint
npx prettier --write .
```

### Dosya Organizasyonu

```
src/
├── components/       # React bileşenleri
│   ├── LoginForm.tsx
│   └── Dashboard.tsx
├── services/        # İş mantığı servisleri
│   ├── HashService.ts
│   └── Web3Service.ts
├── types/           # TypeScript tip tanımları
│   └── index.ts
└── utils/           # Yardımcı fonksiyonlar
    └── sha256.ts
```

## 💬 Commit Mesajları

Anlamlı ve açıklayıcı commit mesajları yazın:

### Format

```
<tip>: <kısa açıklama>

<detaylı açıklama (opsiyonel)>

<footer (opsiyonel)>
```

### Tipler

- `feat`: Yeni özellik
- `fix`: Hata düzeltme
- `docs`: Dokümantasyon değişiklikleri
- `style`: Kod formatı değişiklikleri
- `refactor`: Kod yeniden yapılandırma
- `test`: Test ekleme/düzeltme
- `chore`: Bakım işleri

### Örnekler

```bash
# İyi
git commit -m "feat: Add biometric login component"
git commit -m "fix: Resolve hash verification bug in CertificatePage"
git commit -m "docs: Update README with deployment instructions"

# Kötü
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

## 🔄 Pull Request Süreci

### PR Oluşturmadan Önce

1. ✅ Kodunuz çalışıyor mu?
2. ✅ Testler geçiyor mu?
3. ✅ Linting hataları var mı?
4. ✅ Dokümantasyonu güncellediniz mi?
5. ✅ Commit mesajları anlamlı mı?

### PR Şablonu

```markdown
## Değişiklik Türü
- [ ] Bug fix
- [ ] Yeni özellik
- [ ] Dokümantasyon güncellemesi
- [ ] Refactoring

## Açıklama
Bu PR'nin amacı nedir? Hangi sorunu çözüyor?

## İlgili Issue
Closes #123

## Nasıl Test Edildi?
Test adımlarını açıklayın.

## Ekran Görüntüleri (varsa)
Ekran görüntülerini buraya ekleyin.

## Checklist
- [ ] Kod standartlarına uygun
- [ ] Testler eklendi/güncellendi
- [ ] Dokümantasyon güncellendi
- [ ] Commit mesajları anlamlı
```

### Review Süreci

1. PR oluşturun
2. Otomatik testlerin geçmesini bekleyin
3. En az bir review alın
4. Yorumlara yanıt verin ve gerekli değişiklikleri yapın
5. Approve edildikten sonra merge edilir

## 🐛 Issue Raporlama

### Bug Report Şablonu

```markdown
**Hata Açıklaması**
Hatanın kısa ve net açıklaması.

**Yeniden Oluşturma Adımları**
1. '...' sayfasına gidin
2. '...' butonuna tıklayın
3. Aşağı kaydırın
4. Hatayı görün

**Beklenen Davranış**
Ne olmasını bekliyordunuz?

**Ekran Görüntüleri**
Varsa ekran görüntüsü ekleyin.

**Ortam**
- OS: [örn. Windows 10, macOS 13.0]
- Tarayıcı: [örn. Chrome 120, Safari 17]
- Versiyon: [örn. v1.0.0]

**Ek Bilgiler**
Diğer notlar veya detaylar.
```

### Feature Request Şablonu

```markdown
**Özellik İsteği**
Özelliğin açıklaması.

**Çözüm Önerisi**
İstediğiniz çözüm veya özellik.

**Alternatifler**
Düşündüğünüz alternatif çözümler.

**Kullanım Senaryosu**
Bu özellik hangi durumda kullanılır?

**Ek Bilgiler**
Ekstra notlar veya context.
```

## 🧪 Test Yazma

### Unit Test Örneği

```typescript
import { SHA256Utils } from '../utils/sha256';

describe('SHA256Utils', () => {
  it('should hash text correctly', async () => {
    const text = 'DigiGuard Test';
    const hash = await SHA256Utils.hashText(text);

    expect(hash).toBeDefined();
    expect(hash.length).toBe(64);
  });

  it('should verify hash correctly', () => {
    const hash1 = 'abc123';
    const hash2 = 'abc123';

    const result = SHA256Utils.secureCompare(hash1, hash2);
    expect(result).toBe(true);
  });
});
```

## 📚 Dokümantasyon

Kod değişikliği yapıyorsanız:

- README.md'yi güncelleyin
- İlgili dokümantasyon dosyalarını güncelleyin
- Kod içi yorumlar ekleyin (gerekirse)
- JSDoc yorumları ekleyin (public API'ler için)

```typescript
/**
 * Kullanıcı bilgilerini SHA-256 ile hashler
 *
 * @param userData - Hash edilecek kullanıcı verisi
 * @returns Hash edilmiş veri string'i
 * @throws {Error} Geçersiz veri durumunda
 *
 * @example
 * ```typescript
 * const hash = await hashUserData({ email: 'user@example.com' });
 * ```
 */
async function hashUserData(userData: UserData): Promise<string> {
  // implementation
}
```

## 🎯 Öncelikli Alanlar

Şu alanlarda katkılarınızı özellikle bekliyoruz:

### Yüksek Öncelik
- Backend API entegrasyonu
- Blockchain kimlik sistemi
- AI model entegrasyonu
- Biyometrik veri işleme
- Güvenlik testleri

### Orta Öncelik
- UI/UX iyileştirmeleri
- Performans optimizasyonları
- Çoklu dil desteği
- Erişilebilirlik iyileştirmeleri
- Dokümantasyon geliştirme

### Düşük Öncelik
- Kod refactoring
- Test coverage artırma
- Build optimizasyonu
- CI/CD iyileştirmeleri

## 🏆 Katkı Seviyeleri

### 🥉 Bronze Contributors
- 1-5 PR merged
- Issue raporlama
- Dokümantasyon güncellemeleri

### 🥈 Silver Contributors
- 6-15 PR merged
- Yeni özellik katkıları
- Code review katılımı

### 🥇 Gold Contributors
- 16+ PR merged
- Önemli özellik geliştirme
- Mentorluk ve topluluk yardımı

## 💡 İpuçları

- Küçük, odaklanmış PR'ler gönderin
- Her zaman `main` branch'inden güncel kalın
- Issue'lar üzerinde çalışmadan önce yorum yapın
- Sorularınızı sormaktan çekinmeyin
- Topluluk ile etkileşime geçin

## 📧 İletişim

Sorularınız veya önerileriniz için:

- GitHub Discussions: https://github.com/karprime/digiguard/discussions
- Email: dev@digiguard.com
- Discord: (coming soon)

---

Katkılarınız için tekrar teşekkür ederiz! DigiGuard'ı birlikte daha iyi hale getirelim! 🚀
