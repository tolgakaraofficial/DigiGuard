import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VerificationFormProps {
  email: string;
  phone: string;
  onVerify: () => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  phone,
  onVerify,
}) => {
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!emailCode || !phoneCode) {
      Alert.alert('Hata', 'Lütfen tüm doğrulama kodlarını girin.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onVerify();
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark" size={48} color="#ffffff" />
        </View>
        
        <Text style={styles.title}>Doğrulama</Text>
        <Text style={styles.subtitle}>
          E-posta ve telefon numaranıza gönderilen kodları girin
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-posta Doğrulama Kodu</Text>
            <Text style={styles.info}>{email} adresine gönderildi</Text>
            <TextInput
              style={styles.codeInput}
              value={emailCode}
              onChangeText={setEmailCode}
              placeholder="000000"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              maxLength={6}
              textAlign="center"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>SMS Doğrulama Kodu</Text>
            <Text style={styles.info}>{phone} numarasına gönderildi</Text>
            <TextInput
              style={styles.codeInput}
              value={phoneCode}
              onChangeText={setPhoneCode}
              placeholder="000000"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              maxLength={6}
              textAlign="center"
            />
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              Kodların süresi: {formatTime(timeLeft)}
            </Text>
            {timeLeft === 0 && (
              <TouchableOpacity onPress={() => setTimeLeft(300)}>
                <Text style={styles.resendText}>Yeni kod gönder</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, (isLoading || !emailCode || !phoneCode) && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading || !emailCode || !phoneCode}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Doğrula</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconContainer: {
    backgroundColor: '#059669',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  codeInput: {
    backgroundColor: '#334155',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
    height: 48,
    color: '#ffffff',
    fontSize: 18,
    letterSpacing: 4,
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#60a5fa',
  },
  button: {
    backgroundColor: '#059669',
    borderRadius: 8,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#475569',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});