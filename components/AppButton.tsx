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
        theme === 'secondary' && styles.secondaryButton,
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
          theme === 'secondary' && styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 180,
  },

  secondaryButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryText: {
    color: COLORS.primary,
  },

  icon: {
    fontSize: 18,
    marginRight: 8,
  },
});