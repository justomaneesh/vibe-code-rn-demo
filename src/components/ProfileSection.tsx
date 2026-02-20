import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

interface ProfileSectionProps {
  title: string;
  children?: React.ReactNode;
  onPress?: () => void;
}

interface Styles {
  container: object;
  header: object;
  title: object;
  content: object;
  arrow: object;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  children,
  onPress,
}) => {
  const content = (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onPress && <Text style={styles.arrow}>›</Text>}
      </View>
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create<Styles>({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
  },
  content: {
    paddingLeft: SPACING.md,
  },
  arrow: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.xl,
  },
});

export default ProfileSection;
