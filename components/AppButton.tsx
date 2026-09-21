import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS } from '../constants/colors';

type AppButtonProps = {
  title: string;
  theme?: 'primary' | 'secondary';
  icon?: string;
  onPress: () => void;
};

export default function AppButton({
  title,
  theme = 'primary',
  icon,
  onPress,
}: AppButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        theme === 'primary'
          ? styles.primaryButton
          : styles.secondaryButton,
      ]}
      onPress={onPress}
    >
      {icon && (
        <Text style={styles.icon}>
          {icon === 'camera' ? '📷' : '↻'}
        </Text>
      )}

      <Text
        style={[
          styles.text,
          theme === 'primary'
            ? styles.primaryText
            : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 180,
  },

  primaryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  secondaryButton: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
  },

  text: {
    fontSize: 16,
  },

  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  secondaryText: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  icon: {
    fontSize: 18,
    marginRight: 8,
  },
});