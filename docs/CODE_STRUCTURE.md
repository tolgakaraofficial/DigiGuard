# DigiGuard - Kod Yapısı ve Organizasyon

## 📁 Proje Dizin Yapısı

```
DigiGuard/
├── 📱 Web Application (React)
│   ├── src/
│   │   ├── components/          # UI Bileşenleri
│   │   │   ├── Layout.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── VerificationForm.tsx
│   │   │   ├── RegistrationForm.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── PersonalInfoStep.tsx
│   │   │   ├── IdentityInfoStep.tsx
│   │   │   ├── MediaUploadStep.tsx
│   │   │   └── RegistrationComplete.tsx
│   │   │
│   │   ├── types/               # TypeScript Tipleri
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/               # Yardımcı Fonksiyonlar
│   │   │   ├── validation.ts
│   │   │   ├── encryption.ts
│   │   │   ├── api.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── hooks/               # Custom React Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useForm.ts
│   │   │   └── useMedia.ts
│   │   │
│   │   ├── services/            # İş Mantığı Servisleri
│   │   │   ├── AuthService.ts
│   │   │   ├── MediaService.ts
│   │   │   ├── CryptoService.ts
│   │   │   └── ApiService.ts
│   │   │
│   │   ├── App.tsx              # Ana Uygulama
│   │   ├── main.tsx             # Giriş Noktası
│   │   └── index.css            # Global Stiller
│   │
│   ├── public/                  # Statik Dosyalar
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── 📱 Mobile Application (React Native)
│   ├── components/              # Mobil UI Bileşenleri
│   │   ├── Layout.tsx
│   │   ├── LoginForm.tsx
│   │   ├── VerificationForm.tsx
│   │   ├── RegistrationForm.tsx
│   │   ├── Dashboard.tsx
│   │   ├── PersonalInfoStep.tsx
│   │   ├── IdentityInfoStep.tsx
│   │   ├── MediaUploadStep.tsx
│   │   └── RegistrationComplete.tsx
│   │
│   ├── types/                   # Mobil Tipler
│   │   └── index.ts
│   │
│   ├── App.tsx                  # Mobil Ana Uygulama
│   ├── app.json                 # Expo Konfigürasyonu
│   ├── package.json
│   └── tsconfig.json
│
├── 📚 Documentation
│   ├── ARCHITECTURE.md          # Mimari Dokümantasyonu
│   ├── ALGORITHM_FLOW.md        # Algoritma Akışları
│   ├── CODE_STRUCTURE.md        # Kod Yapısı
│   ├── API_REFERENCE.md         # API Referansı
│   └── SECURITY.md              # Güvenlik Dokümantasyonu
│
└── README.md                    # Proje Ana Dokümantasyonu
```

## 🏗️ Bileşen Mimarisi

### 1. Component Hierarchy (React)

```
App
├── Layout
│   ├── Header
│   └── Main Content
│       ├── LoginForm
│       │   ├── EmailInput
│       │   ├── PhoneInput
│       │   └── SubmitButton
│       │
│       ├── VerificationForm
│       │   ├── OTPInput (Email)
│       │   ├── OTPInput (SMS)
│       │   ├── Timer
│       │   └── VerifyButton
│       │
│       ├── RegistrationForm
│       │   ├── StepIndicator
│       │   ├── PersonalInfoStep
│       │   │   ├── NameFields
│       │   │   ├── DatePicker
│       │   │   ├── AddressFields
│       │   │   └── NavigationButtons
│       │   │
│       │   ├── IdentityInfoStep
│       │   │   ├── IDTypeSelector
│       │   │   ├── IDNumberInput
│       │   │   ├── DateFields
│       │   │   └── NavigationButtons
│       │   │
│       │   ├── MediaUploadStep
│       │   │   ├── PhotoUpload
│       │   │   ├── VideoUpload
│       │   │   ├── AudioUpload
│       │   │   └── NavigationButtons
│       │   │
│       │   └── RegistrationComplete
│       │       ├── SummaryCard
│       │       ├── SecurityInfo
│       │       └── ActionButtons
│       │
│       └── Dashboard
│           ├── StatsCards
│           ├── SecurityAlert
│           ├── FeatureCards
│           └── LogoutButton
```

### 2. State Management Pattern

```typescript
// Global State Structure
interface AppState {
  // Kullanıcı Durumu
  user: {
    currentUser: User | null;
    isAuthenticated: boolean;
    authToken: string | null;
    refreshToken: string | null;
  };
  
  // Kayıt Süreci Durumu
  registration: {
    currentStep: number;
    personalInfo: PersonalInfo;
    identityInfo: IdentityInfo;
    mediaFiles: MediaFiles;
    isProcessing: boolean;
    errors: Record<string, string>;
  };
  
  // UI Durumu
  ui: {
    isLoading: boolean;
    notifications: Notification[];
    modals: {
      isOpen: boolean;
      type: string;
      data: any;
    };
  };
  
  // Güvenlik Durumu
  security: {
    securityLevel: 'low' | 'medium' | 'high';
    lastSecurityCheck: Date;
    threats: SecurityThreat[];
    certificates: Certificate[];
  };
}
```

## 🔧 Utility Functions

### 1. Validation Utilities

```typescript
// src/utils/validation.ts
export class ValidationUtils {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
  
  static validateTCKimlik(tcNo: string): boolean {
    if (tcNo.length !== 11) return false;
    
    const digits = tcNo.split('').map(Number);
    const checksum = (
      (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7 -
      (digits[1] + digits[3] + digits[5] + digits[7])
    ) % 10;
    
    return checksum === digits[9] && 
           (digits.slice(0, 10).reduce((a, b) => a + b) % 10) === digits[10];
  }
  
  static validateFileSize(file: File, maxSizeMB: number): boolean {
    return file.size <= maxSizeMB * 1024 * 1024;
  }
  
  static validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }
}
```

### 2. Encryption Utilities

```typescript
// src/utils/encryption.ts
export class EncryptionUtils {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  
  static async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }
  
  static async encryptData(data: string, key: CryptoKey): Promise<{
    encrypted: ArrayBuffer;
    iv: Uint8Array;
  }> {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv: iv,
      },
      key,
      encoder.encode(data)
    );
    
    return { encrypted, iv };
  }
  
  static async decryptData(
    encrypted: ArrayBuffer,
    key: CryptoKey,
    iv: Uint8Array
  ): Promise<string> {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: this.ALGORITHM,
        iv: iv,
      },
      key,
      encrypted
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }
  
  static hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve) => {
      // PBKDF2 implementation
      const iterations = 100000;
      const keyLength = 64;
      
      crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveBits']
      ).then(key => {
        return crypto.subtle.deriveBits(
          {
            name: 'PBKDF2',
            salt: new TextEncoder().encode(salt),
            iterations: iterations,
            hash: 'SHA-256'
          },
          key,
          keyLength * 8
        );
      }).then(bits => {
        const hash = Array.from(new Uint8Array(bits))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        resolve(hash);
      });
    });
  }
}
```

## 🎣 Custom Hooks

### 1. Authentication Hook

```typescript
// src/hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = async (email: string, phone: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login(email, phone);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('authToken', response.token);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Giriş işlemi başarısız oldu');
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };
  
  const verifyOTP = async (emailCode: string, phoneCode: string) => {
    setIsLoading(true);
    
    try {
      const response = await AuthService.verifyOTP(emailCode, phoneCode);
      if (response.success) {
        setUser(prev => prev ? { ...prev, isVerified: true } : null);
        return true;
      } else {
        setError(response.error);
        return false;
      }
    } catch (err) {
      setError('Doğrulama başarısız oldu');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    user,
    isLoading,
    error,
    login,
    logout,
    verifyOTP,
    isAuthenticated: !!user,
  };
};
```

### 2. Form Management Hook

```typescript
// src/hooks/useForm.ts
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: (values: T) => Record<string, string>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const setValue = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const setFieldTouched = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  const validate = (): boolean => {
    if (!validationSchema) return true;
    
    const newErrors = validationSchema(values);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
};
```

## 🔌 Service Layer

### 1. API Service

```typescript
// src/services/ApiService.ts
export class ApiService {
  private static readonly BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
  
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
  
  static get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }
  
  static post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  static put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  
  static delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
  
  static upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const token = localStorage.getItem('authToken');
    
    return fetch(`${this.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    }).then(response => response.json());
  }
}
```

### 2. Media Processing Service

```typescript
// src/services/MediaService.ts
export class MediaService {
  static async processMediaFiles(files: MediaFiles): Promise<{
    success: boolean;
    results: ProcessingResult[];
    errors: string[];
  }> {
    const results: ProcessingResult[] = [];
    const errors: string[] = [];
    
    // Process photos
    for (const photo of files.photos) {
      try {
        const result = await this.processImage(photo);
        results.push(result);
      } catch (error) {
        errors.push(`Photo processing failed: ${error.message}`);
      }
    }
    
    // Process videos
    for (const video of files.videos) {
      try {
        const result = await this.processVideo(video);
        results.push(result);
      } catch (error) {
        errors.push(`Video processing failed: ${error.message}`);
      }
    }
    
    // Process audio
    for (const audio of files.audioRecordings) {
      try {
        const result = await this.processAudio(audio);
        results.push(result);
      } catch (error) {
        errors.push(`Audio processing failed: ${error.message}`);
      }
    }
    
    return {
      success: errors.length === 0,
      results,
      errors,
    };
  }
  
  private static async processImage(file: File): Promise<ProcessingResult> {
    const formData = new FormData();
    formData.append('image', file);
    
    return ApiService.upload<ProcessingResult>('/media/process-image', formData);
  }
  
  private static async processVideo(file: File): Promise<ProcessingResult> {
    const formData = new FormData();
    formData.append('video', file);
    
    return ApiService.upload<ProcessingResult>('/media/process-video', formData);
  }
  
  private static async processAudio(file: File): Promise<ProcessingResult> {
    const formData = new FormData();
    formData.append('audio', file);
    
    return ApiService.upload<ProcessingResult>('/media/process-audio', formData);
  }
  
  static async generateThumbnail(file: File): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 150;
        canvas.height = 150;
        ctx?.drawImage(img, 0, 0, 150, 150);
        resolve(canvas.toDataURL());
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
}
```

Bu kod yapısı, DigiGuard uygulamasının modüler, sürdürülebilir ve ölçeklenebilir bir şekilde geliştirilmesini sağlar.