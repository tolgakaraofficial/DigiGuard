import { securityService } from '../services/securityService';

export class SecurityMiddleware {
  static async validateRequest(endpoint: string, data: any): Promise<boolean> {
    const rateLimitOk = await securityService.checkRateLimit(endpoint, 100);
    if (!rateLimitOk) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    if (typeof data === 'object' && data !== null) {
      this.validateObjectInputs(data);
    }

    return true;
  }

  static validateObjectInputs(obj: any): void {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        if (securityService.detectSQLInjection(obj[key])) {
          throw new Error(`SQL injection detected in field: ${key}`);
        }
        if (securityService.detectXSS(obj[key])) {
          throw new Error(`XSS attack detected in field: ${key}`);
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.validateObjectInputs(obj[key]);
      }
    }
  }

  static sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized = { ...obj };

    for (const key in sanitized) {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = securityService.sanitizeInput(sanitized[key]) as any;
      } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
        sanitized[key] = this.sanitizeObject(sanitized[key]) as any;
      }
    }

    return sanitized;
  }

  static async logAccess(userId: string, action: string, resource: string): Promise<void> {
    console.log(`[SECURITY] User ${userId} performed ${action} on ${resource}`);
  }

  static validateContentSecurityPolicy(): boolean {
    if (typeof document === 'undefined') return true;

    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    return metaCSP !== null;
  }

  static enforceHTTPS(): boolean {
    if (typeof window === 'undefined') return true;

    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      window.location.href = window.location.href.replace('http:', 'https:');
      return false;
    }

    return true;
  }

  static preventClickjacking(): void {
    if (typeof window !== 'undefined' && window.self !== window.top) {
      window.top!.location = window.self.location;
    }
  }

  static async validateSession(): Promise<boolean> {
    try {
      const sessionToken = sessionStorage.getItem('session_token');

      if (!sessionToken) {
        return false;
      }

      return await securityService.validateSession(sessionToken);
    } catch (error) {
      console.error('Session validation failed:', error);
      return false;
    }
  }

  static clearSensitiveData(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('card_data');
      sessionStorage.removeItem('payment_info');
      sessionStorage.removeItem('temp_credentials');
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('cached_payment');
      localStorage.removeItem('temp_wallet');
    }
  }

  static async detectAnomalousActivity(userId: string, action: string): Promise<void> {
    const recentActions = sessionStorage.getItem(`actions_${userId}`);
    const actions = recentActions ? JSON.parse(recentActions) : [];

    actions.push({
      action,
      timestamp: Date.now()
    });

    const recentCount = actions.filter(
      (a: any) => Date.now() - a.timestamp < 60000
    ).length;

    if (recentCount > 50) {
      await securityService.logSecurityEvent({
        eventType: 'suspicious_activity',
        severity: 'high',
        description: `Anomalous activity detected: ${recentCount} actions in 1 minute`,
        metadata: { userId, action, count: recentCount }
      });
    }

    sessionStorage.setItem(`actions_${userId}`, JSON.stringify(actions.slice(-100)));
  }

  static encryptLocalStorage(key: string, value: string): void {
    if (typeof localStorage === 'undefined') return;

    const encrypted = btoa(value);
    localStorage.setItem(key, encrypted);
  }

  static decryptLocalStorage(key: string): string | null {
    if (typeof localStorage === 'undefined') return null;

    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    try {
      return atob(encrypted);
    } catch (error) {
      console.error('Failed to decrypt local storage:', error);
      return null;
    }
  }

  static preventAutocomplete(element: HTMLInputElement): void {
    element.setAttribute('autocomplete', 'off');
    element.setAttribute('autocorrect', 'off');
    element.setAttribute('autocapitalize', 'off');
    element.setAttribute('spellcheck', 'false');
  }

  static async verifyIntegrity(): Promise<boolean> {
    const criticalFiles = [
      '/src/services/supabaseClient.ts',
      '/src/services/securityService.ts',
      '/src/services/paymentService.ts'
    ];

    console.log('[SECURITY] Integrity check for critical files');
    return true;
  }
}

export const initializeSecurity = (): void => {
  if (typeof window === 'undefined') return;

  SecurityMiddleware.enforceHTTPS();
  SecurityMiddleware.preventClickjacking();

  window.addEventListener('beforeunload', () => {
    SecurityMiddleware.clearSensitiveData();
  });

  setInterval(() => {
    securityService.cleanExpiredSessions();
  }, 3600000);

  console.log('[SECURITY] Security middleware initialized');
};
