import React, { useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Alert,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ user, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || 'wiame',
    email: user?.email || 'wiamerm2023@gmail.com',
    number: user?.number || '0717859643',
  });
  const [originalEmail] = useState(user?.email || '');
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ 
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.number.trim()) {
      newErrors.number = 'Le numéro de téléphone est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      console.log('Saving user data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      Alert.alert('Succès', 'Profil mis à jour avec succès');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la mise à jour du profil');
    } finally {
      setIsSaving(false);
    }
  };

 

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      number: user?.number || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6c584c" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Profil</Text>
        
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </Text>
              </View>
              <Text style={styles.username}>{formData.username}</Text>
            </View>
            
            {!isEditing ? (
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Icon name="edit" size={18} color="white" />
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={handleCancel}
                  disabled={isSaving}
                >
                  <Icon name="close" size={18} color="white" />
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.saveButton, isSaving && styles.disabledButton]}
                  onPress={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <ActivityIndicator size={18} color="red" />
                  ) : (
                    <Icon name="check" size={18} color="white" />
                  )}
                  <Text style={styles.buttonText}>
                    {isSaving ? 'Saving...' : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {/* Content */}
          <View style={styles.cardContent}>
            {!isEditing ? (
              // Display Mode
              <View style={styles.fieldsContainer}>
                <View style={styles.fieldRow}>
                  <Icon name="person" size={24} color="#6c584c" />
                  <View style={styles.fieldInfo}>
                    <Text style={styles.fieldLabel}>User name</Text>
                    <Text style={styles.fieldValue}>{formData.username}</Text>
                  </View>
                </View>
                
                <View style={styles.fieldRow}>
                  <Icon name="email" size={24} color="#6c584c" />
                  <View style={styles.fieldInfo}>
                    <Text style={styles.fieldLabel}> Email</Text>
                    <Text style={styles.fieldValue}>{formData.email}</Text>
                    {user?.isVerified === false && (
                      <Text style={styles.unverifiedText}>Not verified</Text>
                    )}
                  </View>
                </View>
                
                <View style={[styles.fieldRow, styles.lastFieldRow]}>
                  <Icon name="phone" size={24} color="#6c584c" />
                  <View style={styles.fieldInfo}>
                    <Text style={styles.fieldLabel}>phone number</Text>
                    <Text style={styles.fieldValue}>{formData.number}</Text>
                  </View>
                </View>
              </View>
            ) : (
              // Edit Mode
              <View style={styles.fieldsContainer}>
                <View style={styles.fieldRow}>
                  <Icon name="person" size={24} color="#6c584c" style={styles.fieldIcon} />
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>User name</Text>
                    <TextInput
                      style={[styles.input, errors.username && styles.inputError]}
                      value={formData.username}
                      onChangeText={(value) => handleChange('username', value)}
                      placeholder="User name"
                    />
                    {errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                  </View>
                </View>
                
                <View style={styles.fieldRow}>
                  <Icon name="email" size={24} color="#6c584c" style={styles.fieldIcon} />
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}> Email</Text>
                    <TextInput
                      style={[styles.input, errors.email && styles.inputError]}
                      value={formData.email}
                      onChangeText={(value) => handleChange('email', value)}
                      placeholder="email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                    {formData.email !== originalEmail && (
                      <Text style={styles.warningText}>
                       email update necessita new verification
                      </Text>
                    )}
                  </View>
                </View>
                
                <View style={[styles.fieldRow, styles.lastFieldRow]}>
                  <Icon name="phone" size={24} color="#6c584c" style={styles.fieldIcon} />
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>Phone number</Text>
                    <TextInput
                      style={[styles.input, errors.number && styles.inputError]}
                      value={formData.number}
                      onChangeText={(value) => handleChange('number', value)}
                      placeholder="phone number"
                      keyboardType="phone-pad"
                    />
                    {errors.number && (
                      <Text style={styles.errorText}>{errors.number}</Text>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89AFD2',

  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    maxWidth: 768,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c584c',
  },
  card: {
    backgroundColor: '#F8F6F3',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#2D3748',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#4299E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  editButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  cardContent: {
    padding: 32,
  },
  fieldsContainer: {
    gap: 24,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 16,
  },
  lastFieldRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  fieldIcon: {
    marginTop: 32,
  },
  fieldInfo: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
  },
  unverifiedText: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: 4,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
    color: '#111827',
    marginTop: 4,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
  warningText: {
    color: '#f59e0b',
    fontSize: 14,
    marginTop: 4,
  },
});

export default ProfileScreen;