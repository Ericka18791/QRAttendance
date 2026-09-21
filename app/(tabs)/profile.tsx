import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import AppButton from '@/components/AppButton';
import Header from '@/components/Header';
import { COLORS } from '@/constants/colors';
import { signOut, useAuth } from '@/lib/auth';
import { getProfile, updateProfile, type Profile } from '@/lib/profiles';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [draftName, setDraftName] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!user) return;

    const p = await getProfile(user.id);

    setProfile(p);
    setDraftName(p?.full_name ?? '');
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  async function handleSaveName() {
    if (!user) return;

    setSaving(true);

    const { error } = await updateProfile(user.id, {
      full_name: draftName.trim(),
    });

    setSaving(false);

    if (error) {
      Alert.alert('Error', error);
      return;
    }

    setProfile((prev) =>
      prev
        ? {
            ...prev,
            full_name: draftName.trim(),
          }
        : prev
    );

    setEditing(false);
  }

  async function handleSignOut() {
    await signOut();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" />

      <View style={styles.content}>
        <View
          style={[
            styles.roleBadge,
            profile?.role === 'teacher'
              ? styles.roleBadgeTeacher
              : styles.roleBadgeStudent,
          ]}
        >
          <Text style={styles.roleBadgeText}>
            {profile?.role === 'teacher' ? 'Teacher' : 'Student'}
          </Text>
        </View>

        <Text style={styles.label}>Name</Text>

        {editing ? (
          <View style={styles.nameEditRow}>
            <TextInput
              style={styles.nameInput}
              value={draftName}
              onChangeText={setDraftName}
              placeholder="Enter your name"
              placeholderTextColor="#777"
              autoCapitalize="words"
            />

            <Pressable
              style={styles.saveButton}
              onPress={handleSaveName}
              disabled={saving}
            >
              <Text style={styles.saveButtonText}>
                {saving ? 'Saving...' : 'Save'}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => setEditing(true)}
            style={styles.nameRow}
          >
            <Text style={styles.value}>
              {profile?.full_name || 'Tap to add your name'}
            </Text>

            <Text style={styles.editHint}>Edit</Text>
          </Pressable>
        )}

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {user?.email ?? 'Not available'}
        </Text>

        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>
          {user?.id ?? 'Not available'}
        </Text>

        <View style={styles.buttonContainer}>
          <AppButton title="Sign Out" onPress={handleSignOut} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 8,
  },
  roleBadgeTeacher: {
    backgroundColor: '#E3F2FD',
  },
  roleBadgeStudent: {
    backgroundColor: '#E8F5E9',
  },
  roleBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  editHint: {
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 12,
  },
  nameEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 32,
  },
});