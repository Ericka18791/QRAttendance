import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@/constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.iconCircle}>
        <FontAwesome
          name="graduation-cap"
          size={45}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>
        QR Attendance
      </Text>

      <Text style={styles.subtitle}>
        School Event Attendance
      </Text>

      <Text style={styles.description}>
        Scan QR Codes to record attendance during school activities.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/scan')}
      >
        <Text style={styles.buttonText}>
          Scan QR Code
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.history}
        onPress={() => router.push('/history')}
      >
        <Text style={styles.historyText}>
          Attendance History
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 60,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
  },

  description: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 35,
  },

  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: COLORS.card,
    fontSize: 18,
    fontWeight: 'bold',
  },

  history: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },

  historyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});