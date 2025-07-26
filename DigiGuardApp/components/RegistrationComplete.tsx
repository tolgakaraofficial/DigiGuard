import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PersonalInfo, IdentityInfo, MediaFiles } from '../types';

interface RegistrationCompleteProps {
  personalInfo: PersonalInfo;
  identityInfo: IdentityInfo;
  mediaFiles: MediaFiles;
  onComplete: () => void;
}

export const RegistrationComplete: React.FC<RegistrationCompleteProps> = ({
  personalInfo,
  identityInfo,
  mediaFiles,
  onComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleComplete = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onComplete();
    setIsProcessing(false);
  };

  const totalFiles = mediaFiles.photos.length + mediaFiles.videos.length + mediaFiles.audioRecordings.length;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={64} color="#ffffff" />
        </View>
        
        <Text style={styles.title}>Kayıt Tamamlandı!</Text>
        <Text style={styles.subtitle}>
          Dijital kimlik profiliniz başarıyla oluşturuldu
        </Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="shield-checkmark" size={20} color="#60a5fa" />
            <Text style={styles.summaryTitle}>Kayıt Özeti</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Ad Soyad:</Text>
            <Text style={styles.summaryValue}>
              {personalInfo.firstName} {personalInfo.lastName}
            </Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Kimlik Türü:</Text>
            <Text style={styles.summaryValue}>
              {identityInfo.idType === 'tc' ? 'T.C. Kimlik Kartı' : 
               identityInfo.idType === 'passport' ? 'Pasaport' : 'Diğer'}
            </Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Kimlik Numarası:</Text>
            <Text style={styles.summaryValue}>
              {identityInfo.idNumber.replace(/./g, '*').slice(0, -4) + identityInfo.idNumber.slice(-4)}
            </Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Yüklenen Dosyalar:</Text>
            <Text style={styles.summaryValue}>{totalFiles} dosya</Text>
          </View>
        </View>

        <View style={styles.securityInfo}>
          <Ionicons name="shield-checkmark" size={24} color="#60a5fa" />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Güvenlik Bilgisi</Text>
            <Text style={styles.securityDescription}>
              Tüm verileriniz end-to-end şifreleme ile korunmaktadır. Kişisel bilgileriniz ve medya dosyalarınız 
              sadece kimlik doğrulama süreçlerinde kullanılacak ve üçüncü taraflarla paylaşılmayacaktır.
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="download" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Sertifika İndir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="eye" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Profili Görüntüle</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.completeButton, isProcessing && styles.buttonDisabled]}
          onPress={handleComplete}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <ActivityIndicator color="#ffffff" />
              <Text style={styles.completeButtonText}>İşleniyor...</Text>
            </>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
              <Text style={styles.completeButtonText}>Uygulamaya Başla</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconContainer: {
    backgroundColor: '#059669',
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  summaryCard: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#475569',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  securityInfo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  securityText: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#475569',
    borderRadius: 8,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#059669',
    borderRadius: 8,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#047857',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});