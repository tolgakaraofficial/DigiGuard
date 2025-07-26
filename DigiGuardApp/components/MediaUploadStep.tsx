import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { MediaFiles } from '../types';

interface MediaUploadStepProps {
  data: MediaFiles;
  onChange: (data: MediaFiles) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MediaUploadStep: React.FC<MediaUploadStepProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Hata', 'Fotoğraf seçmek için galeri erişim izni gereklidir.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.map(asset => asset.uri);
      onChange({
        ...data,
        photos: [...data.photos, ...newPhotos],
      });
    }
  };

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      const newVideos = result.assets.map(asset => asset.uri);
      onChange({
        ...data,
        videos: [...data.videos, ...newVideos],
      });
    }
  };

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      const newAudio = result.assets.map(asset => asset.uri);
      onChange({
        ...data,
        audioRecordings: [...data.audioRecordings, ...newAudio],
      });
    }
  };

  const removeFile = (type: keyof MediaFiles, index: number) => {
    const updatedFiles = data[type].filter((_, i) => i !== index);
    onChange({
      ...data,
      [type]: updatedFiles,
    });
  };

  const canProceed = data.photos.length > 0 && data.videos.length > 0 && data.audioRecordings.length > 0;

  const handleNext = () => {
    if (!canProceed) {
      Alert.alert('Hata', 'Devam etmek için en az bir fotoğraf, bir video ve bir ses kaydı yüklemelisiniz.');
      return;
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="cloud-upload" size={24} color="#60a5fa" />
          <Text style={styles.title}>Medya Dosyaları</Text>
        </View>

        <Text style={styles.description}>
          Kimlik doğrulama için fotoğraf, video ve ses kayıtlarınızı yükleyin. Bu dosyalar güvenli şekilde şifrelenerek saklanacaktır.
        </Text>

        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          {/* Photos */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons name="camera" size={20} color="#10b981" />
                <Text style={styles.sectionTitle}>Fotoğraflar</Text>
                <Text style={styles.fileCount}>({data.photos.length}/5)</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                <Ionicons name="add" size={16} color="#ffffff" />
                <Text style={styles.addButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.fileList}>
              {data.photos.map((photo, index) => (
                <View key={index} style={styles.fileItem}>
                  <Ionicons name="image" size={24} color="#10b981" />
                  <Text style={styles.fileName}>Fotoğraf {index + 1}</Text>
                  <TouchableOpacity onPress={() => removeFile('photos', index)}>
                    <Ionicons name="close-circle" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Videos */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons name="videocam" size={20} color="#3b82f6" />
                <Text style={styles.sectionTitle}>Videolar</Text>
                <Text style={styles.fileCount}>({data.videos.length}/3)</Text>
              </View>
              <TouchableOpacity style={[styles.addButton, styles.videoButton]} onPress={pickVideo}>
                <Ionicons name="add" size={16} color="#ffffff" />
                <Text style={styles.addButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.fileList}>
              {data.videos.map((video, index) => (
                <View key={index} style={styles.fileItem}>
                  <Ionicons name="videocam" size={24} color="#3b82f6" />
                  <Text style={styles.fileName}>Video {index + 1}</Text>
                  <TouchableOpacity onPress={() => removeFile('videos', index)}>
                    <Ionicons name="close-circle" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Audio */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons name="mic" size={20} color="#8b5cf6" />
                <Text style={styles.sectionTitle}>Ses Kayıtları</Text>
                <Text style={styles.fileCount}>({data.audioRecordings.length}/3)</Text>
              </View>
              <TouchableOpacity style={[styles.addButton, styles.audioButton]} onPress={pickAudio}>
                <Ionicons name="add" size={16} color="#ffffff" />
                <Text style={styles.addButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.fileList}>
              {data.audioRecordings.map((audio, index) => (
                <View key={index} style={styles.fileItem}>
                  <Ionicons name="mic" size={24} color="#8b5cf6" />
                  <Text style={styles.fileName}>Ses Kaydı {index + 1}</Text>
                  <TouchableOpacity onPress={() => removeFile('audioRecordings', index)}>
                    <Ionicons name="close-circle" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.nextButton, !canProceed && styles.buttonDisabled]} 
            onPress={handleNext}
            disabled={!canProceed}
          >
            <Text style={styles.buttonText}>Devam Et</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {!canProceed && (
          <Text style={styles.warningText}>
            Devam etmek için en az bir fotoğraf, bir video ve bir ses kaydı yüklemelisiniz.
          </Text>
        )}
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 12,
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
    lineHeight: 20,
  },
  form: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  fileCount: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#10b981',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  videoButton: {
    backgroundColor: '#3b82f6',
  },
  audioButton: {
    backgroundColor: '#8b5cf6',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  fileList: {
    gap: 8,
  },
  fileItem: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileName: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
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
  buttonDisabled: {
    backgroundColor: '#475569',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  warningText: {
    color: '#f59e0b',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
});