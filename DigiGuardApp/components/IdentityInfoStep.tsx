import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IdentityInfo } from '../types';

interface IdentityInfoStepProps {
  data: IdentityInfo;
  onChange: (data: IdentityInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export const IdentityInfoStep: React.FC<IdentityInfoStepProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const handleSubmit = () => {
    if (!data.idNumber || !data.issueDate || !data.expiryDate || !data.issuingAuthority) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    onNext();
  };

  const handleChange = (field: keyof IdentityInfo, value: string | IdentityInfo['idType']) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="card" size={24} color="#60a5fa" />
          <Text style={styles.title}>Kimlik Bilgileri</Text>
        </View>

        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kimlik Türü</Text>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerText}>
                {data.idType === 'tc' ? 'T.C. Kimlik Kartı' : 
                 data.idType === 'passport' ? 'Pasaport' : 'Diğer'}
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {data.idType === 'tc' ? 'T.C. Kimlik Numarası' : 'Kimlik/Pasaport Numarası'}
            </Text>
            <TextInput
              style={styles.input}
              value={data.idNumber}
              onChangeText={(value) => handleChange('idNumber', value)}
              placeholder={data.idType === 'tc' ? '12345678901' : 'Kimlik numarası'}
              placeholderTextColor="#64748b"
              keyboardType={data.idType === 'tc' ? 'numeric' : 'default'}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Veriliş Tarihi</Text>
              <TextInput
                style={styles.input}
                value={data.issueDate}
                onChangeText={(value) => handleChange('issueDate', value)}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Son Geçerlilik Tarihi</Text>
              <TextInput
                style={styles.input}
                value={data.expiryDate}
                onChangeText={(value) => handleChange('expiryDate', value)}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Veren Makam</Text>
            <TextInput
              style={styles.input}
              value={data.issuingAuthority}
              onChangeText={(value) => handleChange('issuingAuthority', value)}
              placeholder="Örn: İstanbul Valiliği"
              placeholderTextColor="#64748b"
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Devam Et</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 12,
  },
  form: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#334155',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
    height: 48,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
    height: 48,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  pickerText: {
    color: '#ffffff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#475569',
    borderRadius: 8,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flex: 0.45,
  },
  nextButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flex: 0.45,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});