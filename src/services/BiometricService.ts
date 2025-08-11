/**
 * Biometric Authentication Service
 * Yüz tanıma, ses tanıma ve canlılık tespiti
 */

import * as faceapi from 'face-api.js';

export interface BiometricData {
  faceDescriptor?: Float32Array;
  voiceprint?: Float32Array;
  livenessScore?: number;
  confidence: number;
}

export interface BiometricVerification {
  isAuthentic: boolean;
  confidence: number;
  biometricType: 'face' | 'voice' | 'combined';
  livenessDetected: boolean;
}

export class BiometricService {
  private isInitialized = false;
  private faceDetector: any = null;
  private audioContext: AudioContext | null = null;

  /**
   * Biyometrik servisleri başlat
   */
  async initialize(): Promise<void> {
    try {
      // Face-api.js modellerini yükle
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');

      // Audio context başlat
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      this.isInitialized = true;
      console.log('Biyometrik servisler başlatıldı');
    } catch (error) {
      throw new Error(`Biyometrik servis başlatma hatası: ${error.message}`);
    }
  }

  /**
   * Kamera erişimi iste
   */
  async requestCameraAccess(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });

      return stream;
    } catch (error) {
      throw new Error('Kamera erişimi reddedildi');
    }
  }

  /**
   * Mikrofon erişimi iste
   */
  async requestMicrophoneAccess(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      return stream;
    } catch (error) {
      throw new Error('Mikrofon erişimi reddedildi');
    }
  }

  /**
   * Yüz tanıma ve kayıt
   */
  async captureFaceBiometric(videoElement: HTMLVideoElement): Promise<BiometricData> {
    if (!this.isInitialized) {
      throw new Error('Biyometrik servis başlatılmamış');
    }

    try {
      // Yüz tespiti
      const detection = await faceapi
        .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()
        .withFaceExpressions();

      if (!detection) {
        throw new Error('Yüz tespit edilemedi');
      }

      // Canlılık tespiti
      const livenessScore = await this.detectLiveness(videoElement, detection);

      return {
        faceDescriptor: detection.descriptor,
        confidence: detection.detection.score,
        livenessScore: livenessScore
      };
    } catch (error) {
      throw new Error(`Yüz tanıma hatası: ${error.message}`);
    }
  }

  /**
   * Ses tanıma ve kayıt
   */
  async captureVoiceBiometric(audioStream: MediaStream, duration: number = 5000): Promise<BiometricData> {
    if (!this.audioContext) {
      throw new Error('Audio context mevcut değil');
    }

    return new Promise((resolve, reject) => {
      try {
        const source = this.audioContext!.createMediaStreamSource(audioStream);
        const analyser = this.audioContext!.createAnalyser();
        const processor = this.audioContext!.createScriptProcessor(4096, 1, 1);

        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);
        analyser.connect(processor);
        processor.connect(this.audioContext!.destination);

        const voiceFeatures: number[] = [];

        processor.onaudioprocess = (event) => {
          analyser.getByteFrequencyData(dataArray);
          
          // MFCC benzeri özellik çıkarımı
          const features = this.extractVoiceFeatures(dataArray);
          voiceFeatures.push(...features);
        };

        setTimeout(() => {
          processor.disconnect();
          source.disconnect();
          analyser.disconnect();

          const voiceprint = new Float32Array(voiceFeatures);
          const confidence = this.calculateVoiceConfidence(voiceprint);

          resolve({
            voiceprint: voiceprint,
            confidence: confidence
          });
        }, duration);

      } catch (error) {
        reject(new Error(`Ses tanıma hatası: ${error.message}`));
      }
    });
  }

  /**
   * Canlılık tespiti
   */
  private async detectLiveness(videoElement: HTMLVideoElement, detection: any): Promise<number> {
    try {
      // Göz kırpma tespiti
      const landmarks = detection.landmarks;
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();

      // Göz açıklık oranı hesapla
      const leftEAR = this.calculateEyeAspectRatio(leftEye);
      const rightEAR = this.calculateEyeAspectRatio(rightEye);
      const avgEAR = (leftEAR + rightEAR) / 2;

      // Yüz ifadesi analizi
      const expressions = detection.expressions;
      const neutralScore = expressions.neutral || 0;

      // Hareket tespiti (basit)
      const movementScore = Math.random() * 0.3 + 0.7; // Simülasyon

      // Canlılık skoru hesapla
      const livenessScore = (avgEAR * 0.4) + (neutralScore * 0.3) + (movementScore * 0.3);

      return Math.min(livenessScore, 1.0);
    } catch (error) {
      console.warn('Canlılık tespiti hatası:', error);
      return 0.5; // Varsayılan skor
    }
  }

  /**
   * Göz açıklık oranı hesapla
   */
  private calculateEyeAspectRatio(eyePoints: any[]): number {
    if (eyePoints.length < 6) return 0;

    // Dikey mesafeler
    const vertical1 = Math.sqrt(
      Math.pow(eyePoints[1].x - eyePoints[5].x, 2) + 
      Math.pow(eyePoints[1].y - eyePoints[5].y, 2)
    );
    const vertical2 = Math.sqrt(
      Math.pow(eyePoints[2].x - eyePoints[4].x, 2) + 
      Math.pow(eyePoints[2].y - eyePoints[4].y, 2)
    );

    // Yatay mesafe
    const horizontal = Math.sqrt(
      Math.pow(eyePoints[0].x - eyePoints[3].x, 2) + 
      Math.pow(eyePoints[0].y - eyePoints[3].y, 2)
    );

    return (vertical1 + vertical2) / (2 * horizontal);
  }

  /**
   * Ses özelliklerini çıkar
   */
  private extractVoiceFeatures(frequencyData: Uint8Array): number[] {
    const features: number[] = [];

    // Spektral centroid
    let weightedSum = 0;
    let magnitudeSum = 0;
    for (let i = 0; i < frequencyData.length; i++) {
      weightedSum += i * frequencyData[i];
      magnitudeSum += frequencyData[i];
    }
    const spectralCentroid = magnitudeSum > 0 ? weightedSum / magnitudeSum : 0;
    features.push(spectralCentroid / frequencyData.length);

    // Spektral rolloff
    const rolloffThreshold = magnitudeSum * 0.85;
    let cumulativeSum = 0;
    let rolloffBin = 0;
    for (let i = 0; i < frequencyData.length; i++) {
      cumulativeSum += frequencyData[i];
      if (cumulativeSum >= rolloffThreshold) {
        rolloffBin = i;
        break;
      }
    }
    features.push(rolloffBin / frequencyData.length);

    // Zero crossing rate (basitleştirilmiş)
    features.push(Math.random() * 0.1); // Simülasyon

    return features;
  }

  /**
   * Ses güven skoru hesapla
   */
  private calculateVoiceConfidence(voiceprint: Float32Array): number {
    if (voiceprint.length === 0) return 0;

    // Basit güven skoru hesaplama
    let sum = 0;
    for (let i = 0; i < voiceprint.length; i++) {
      sum += Math.abs(voiceprint[i]);
    }
    const avgMagnitude = sum / voiceprint.length;

    return Math.min(avgMagnitude * 10, 1.0);
  }

  /**
   * Biyometrik doğrulama
   */
  async verifyBiometric(
    storedBiometric: BiometricData,
    currentBiometric: BiometricData,
    threshold: number = 0.8
  ): Promise<BiometricVerification> {
    try {
      let similarity = 0;
      let biometricType: 'face' | 'voice' | 'combined' = 'combined';

      // Yüz karşılaştırması
      if (storedBiometric.faceDescriptor && currentBiometric.faceDescriptor) {
        const faceDistance = faceapi.euclideanDistance(
          storedBiometric.faceDescriptor,
          currentBiometric.faceDescriptor
        );
        const faceSimilarity = 1 - faceDistance;
        similarity += faceSimilarity * 0.6;
        biometricType = 'face';
      }

      // Ses karşılaştırması
      if (storedBiometric.voiceprint && currentBiometric.voiceprint) {
        const voiceSimilarity = this.compareVoiceprints(
          storedBiometric.voiceprint,
          currentBiometric.voiceprint
        );
        similarity += voiceSimilarity * 0.4;
        
        if (biometricType === 'face') {
          biometricType = 'combined';
        } else {
          biometricType = 'voice';
        }
      }

      // Canlılık kontrolü
      const livenessDetected = (currentBiometric.livenessScore || 0) > 0.6;

      return {
        isAuthentic: similarity > threshold && livenessDetected,
        confidence: similarity,
        biometricType: biometricType,
        livenessDetected: livenessDetected
      };
    } catch (error) {
      throw new Error(`Biyometrik doğrulama hatası: ${error.message}`);
    }
  }

  /**
   * Ses karşılaştırması
   */
  private compareVoiceprints(stored: Float32Array, current: Float32Array): number {
    if (stored.length !== current.length) {
      return 0;
    }

    let dotProduct = 0;
    let normStored = 0;
    let normCurrent = 0;

    for (let i = 0; i < stored.length; i++) {
      dotProduct += stored[i] * current[i];
      normStored += stored[i] * stored[i];
      normCurrent += current[i] * current[i];
    }

    const magnitude = Math.sqrt(normStored) * Math.sqrt(normCurrent);
    return magnitude > 0 ? dotProduct / magnitude : 0;
  }

  /**
   * Servisi temizle
   */
  cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.isInitialized = false;
  }
}

export const biometricService = new BiometricService();