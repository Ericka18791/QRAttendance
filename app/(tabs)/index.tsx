import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@/constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>QR Attendance</Text>

      <Text style={styles.subtitle}>School Event Attendance</Text>

      <Text style={styles.description}>
        Scan QR Codes to record attendance during school activities.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/scan')}
      >
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.history}
        onPress={() => router.push('/history')}
      >
        <Text style={styles.historyText}>Attendance History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },

  logo: {
    width: 90,
    height: 90,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 35,
  },

  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: COLORS.card,
    fontSize: 18,
    fontWeight: '700',
  },

  history: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },

  historyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});