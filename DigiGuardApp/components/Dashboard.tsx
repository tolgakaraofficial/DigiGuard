import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const stats = [
    { label: 'Doğrulanmış Profil', value: 'Aktif', color: '#10b981', icon: 'checkmark-circle' },
    { label: 'Güvenlik Seviyesi', value: 'Yüksek', color: '#3b82f6', icon: 'shield-checkmark' },
    { label: 'Son Güncelleme', value: '2 gün önce', color: '#64748b', icon: 'document-text' },
  ];

  const features = [
    {
      title: 'Kimlik Doğrulama',
      description: 'Yüz ve ses tanıma ile kimliğinizi doğrulayın',
      icon: 'person',
      color: '#2563eb',
    },
    {
      title: 'Güvenlik Sertifikası',
      description: 'Dijital kimlik sertifikanızı görüntüleyin ve indirin',
      icon: 'document-text',
      color: '#059669',
    },
    {
      title: 'Profil Yönetimi',
      description: 'Kişisel bilgilerinizi ve güvenlik ayarlarınızı yönetin',
      icon: 'settings',
      color: '#8b5cf6',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Kontrol Paneli</Text>
          <Text style={styles.subtitle}>Dijital kimlik korumanız aktif ve güvenli</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Ionicons name="log-out" size={16} color="#ffffff" />
          <Text style={styles.logoutText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            </View>
            <Ionicons name={stat.icon as any} size={32} color={stat.color} />
          </View>
        ))}
      </View>

      {/* Security Alert */}
      <View style={styles.alertCard}>
        <Ionicons name="warning" size={24} color="#f59e0b" />
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>Güvenlik Uyarısı</Text>
          <Text style={styles.alertDescription}>
            Yakın zamanda internette sahte içerik tespit edildi. Dijital kimlik korumanızın aktif olduğundan emin olun.
          </Text>
        </View>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity key={index} style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
              <Ionicons name={feature.icon as any} size={24} color="#ffffff" />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
            <View style={styles.featureAction}>
              <Text style={styles.featureActionText}>Devam et →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  alertCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  alertContent: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  featureAction: {
    alignSelf: 'flex-start',
  },
  featureActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#60a5fa',
  },
});