/**
 * Web5 Integration Service
 * Decentralized Identity ve Self-Sovereign Identity
 */

import { Web5 } from '@web5/api';
import { DidKeyMethod } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials';

export interface DecentralizedIdentity {
  did: string;
  keys: any;
  document: any;
}

export interface VerifiableCredentialData {
  issuer: string;
  subject: string;
  credentialType: string[];
  claims: Record<string, any>;
}

export class Web5Service {
  private web5: Web5 | null = null;
  private userDid: string | null = null;

  /**
   * Web5 bağlantısını başlat
   */
  async initialize(): Promise<void> {
    try {
      const { web5, did } = await Web5.connect({
        sync: '5s'
      });

      this.web5 = web5;
      this.userDid = did;

      console.log('Web5 bağlantısı kuruldu:', did);
    } catch (error) {
      throw new Error(`Web5 başlatma hatası: ${error.message}`);
    }
  }

  /**
   * Decentralized Identity oluştur
   */
  async createDecentralizedIdentity(): Promise<DecentralizedIdentity> {
    if (!this.web5) {
      throw new Error('Web5 başlatılmamış');
    }

    try {
      // DID oluştur
      const didKey = await DidKeyMethod.create();
      
      return {
        did: didKey.uri,
        keys: didKey.keySet,
        document: didKey.document
      };
    } catch (error) {
      throw new Error(`DID oluşturma hatası: ${error.message}`);
    }
  }

  /**
   * Verifiable Credential oluştur
   */
  async createVerifiableCredential(data: VerifiableCredentialData): Promise<any> {
    if (!this.web5 || !this.userDid) {
      throw new Error('Web5 veya DID mevcut değil');
    }

    try {
      const credential = await VerifiableCredential.create({
        type: data.credentialType,
        issuer: data.issuer,
        subject: data.subject,
        data: data.claims,
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 yıl
      });

      return credential;
    } catch (error) {
      throw new Error(`VC oluşturma hatası: ${error.message}`);
    }
  }

  /**
   * Decentralized Web Node'a veri kaydet
   */
  async storeInDWN(data: any, schema: string): Promise<string> {
    if (!this.web5) {
      throw new Error('Web5 başlatılmamış');
    }

    try {
      const { record } = await this.web5.dwn.records.create({
        data: data,
        message: {
          schema: schema,
          dataFormat: 'application/json'
        }
      });

      return record.id;
    } catch (error) {
      throw new Error(`DWN kayıt hatası: ${error.message}`);
    }
  }

  /**
   * DWN'den veri oku
   */
  async readFromDWN(recordId: string): Promise<any> {
    if (!this.web5) {
      throw new Error('Web5 başlatılmamış');
    }

    try {
      const { record } = await this.web5.dwn.records.read({
        message: {
          filter: {
            recordId: recordId
          }
        }
      });

      return await record.data.json();
    } catch (error) {
      throw new Error(`DWN okuma hatası: ${error.message}`);
    }
  }

  /**
   * Identity verification protokolü
   */
  async verifyIdentityCredential(credential: any): Promise<{
    isValid: boolean;
    issuer: string;
    subject: string;
    claims: any;
  }> {
    try {
      // Credential doğrulama
      const verification = await VerifiableCredential.verify({
        vcJwt: credential
      });

      return {
        isValid: verification.verified,
        issuer: verification.issuer,
        subject: verification.subject,
        claims: verification.credentialSubject
      };
    } catch (error) {
      throw new Error(`Credential doğrulama hatası: ${error.message}`);
    }
  }

  /**
   * Peer-to-peer identity sharing
   */
  async shareIdentityWithPeer(peerDid: string, credentialId: string): Promise<void> {
    if (!this.web5) {
      throw new Error('Web5 başlatılmamış');
    }

    try {
      await this.web5.dwn.records.create({
        data: {
          credentialId: credentialId,
          sharedAt: new Date().toISOString(),
          permissions: ['read']
        },
        message: {
          recipient: peerDid,
          schema: 'https://digiguard.com/schemas/identity-share',
          dataFormat: 'application/json'
        }
      });
    } catch (error) {
      throw new Error(`Peer paylaşım hatası: ${error.message}`);
    }
  }

  /**
   * Self-sovereign identity management
   */
  async manageSovereignIdentity(action: 'create' | 'update' | 'revoke', data: any): Promise<any> {
    if (!this.web5 || !this.userDid) {
      throw new Error('Web5 veya DID mevcut değil');
    }

    switch (action) {
      case 'create':
        return await this.createVerifiableCredential(data);
      
      case 'update':
        // Mevcut credential'ı güncelle
        const updatedCredential = await this.createVerifiableCredential({
          ...data,
          credentialType: [...data.credentialType, 'UpdatedCredential']
        });
        return updatedCredential;
      
      case 'revoke':
        // Credential'ı iptal et
        return await this.storeInDWN({
          action: 'revoke',
          credentialId: data.credentialId,
          revokedAt: new Date().toISOString(),
          reason: data.reason || 'User requested'
        }, 'https://digiguard.com/schemas/credential-revocation');
      
      default:
        throw new Error('Geçersiz işlem');
    }
  }

  /**
   * Bağlantıyı kapat
   */
  disconnect(): void {
    this.web5 = null;
    this.userDid = null;
  }
}

export const web5Service = new Web5Service();