import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PersonalInfo } from '../types';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const handleSubmit = () => {
    if (!data.firstName || !data.lastName || !data.birthDate || !data.nationality || !data.address || !data.city || !data.postalCode) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    onNext();
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="person" size={24} color="#60a5fa" />
          <Text style={styles.title}>Kişisel Bilgiler</Text>
        </View>

        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Ad</Text>
              <TextInput
                style={styles.input}
                value={data.firstName}
                onChangeText={(value) => handleChange('firstName', value)}
                placeholder="Adınız"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Soyad</Text>
              <TextInput
                style={styles.input}
                value={data.lastName}
                onChangeText={(value) => handleChange('lastName', value)}
                placeholder="Soyadınız"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Doğum Tarihi</Text>
              <TextInput
                style={styles.input}
                value={data.birthDate}
                onChangeText={(value) => handleChange('birthDate', value)}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Uyruk</Text>
              <TextInput
                style={styles.input}
                value={data.nationality}
                onChangeText={(value) => handleChange('nationality', value)}
                placeholder="Türkiye Cumhuriyeti"
                placeholderTextColor="#64748b"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Adres</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={data.address}
              onChangeText={(value) => handleChange('address', value)}
              placeholder="Tam adresinizi girin"
              placeholderTextColor="#64748b"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Şehir</Text>
              <TextInput
                style={styles.input}
                value={data.city}
                onChangeText={(value) => handleChange('city', value)}
                placeholder="Şehir"
                placeholderTextColor="#64748b"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Posta Kodu</Text>
              <TextInput
                style={styles.input}
                value={data.postalCode}
                onChangeText={(value) => handleChange('postalCode', value)}
                placeholder="Posta kodu"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Devam Et</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
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
  textArea: {
    height: 96,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  button: {
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
    fontSize: 16,
    fontWeight: '500',
  },
});