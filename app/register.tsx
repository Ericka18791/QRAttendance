import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/components/AppButton';
import Header from '@/components/Header';
import { COLORS } from '@/constants/colors';
import { signUp } from '@/lib/auth';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError('');

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await signUp(
      email.trim(),
      password,
      {
        full_name: fullName.trim(),
        role,
      }
    );

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (data.session) {
      router.replace('/(tabs)');
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
          },
        ]}
      >
        <Header title="Register" />

        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Check your email!</Text>

          <Text style={styles.successText}>
            We sent a confirmation link to your email address. Please check
            your inbox before logging in.
          </Text>

          <Link href="/login" style={styles.loginLink}>
            Go to Login
          </Link>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Header title="Register" />

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor="#777"
            autoCapitalize="words"
            autoComplete="name"
          />

          <Text style={styles.label}>I am a...</Text>

          <View style={styles.roleRow}>
            <Pressable
              style={[
                styles.roleChip,
                role === 'student' && styles.roleChipActive,
              ]}
              onPress={() => setRole('student')}
            >
              <Text
                style={[
                  styles.roleChipText,
                  role === 'student' && styles.roleChipTextActive,
                ]}
              >
                Student
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.roleChip,
                role === 'teacher' && styles.roleChipActive,
              ]}
              onPress={() => setRole('teacher')}
            >
              <Text
                style={[
                  styles.roleChipText,
                  role === 'teacher' && styles.roleChipTextActive,
                ]}
              >
                Teacher
              </Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#777"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#777"
            secureTextEntry
            autoCapitalize="none"
          />

          <Text style={styles.label}>Confirm Password</Text>

          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor="#777"
            secureTextEntry
            autoCapitalize="none"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppButton
            title={loading ? 'Creating account...' : 'Register'}
            onPress={handleRegister}
          />

          {loading ? (
            <ActivityIndicator
              size="small"
              color={COLORS.primary}
              style={styles.loading}
            />
          ) : null}

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>

            <Link href="/login" style={styles.loginLink}>
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  form: {
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  roleChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.card,
  },
  roleChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '14',
  },
  roleChipText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  roleChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  error: {
    color: COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'left',
  },
  loading: {
    marginTop: 12,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 24,
  },
  loginText: {
    color: COLORS.textPrimary,
  },
  loginLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 24,
  },
});