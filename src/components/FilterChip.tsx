import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

interface FilterChipProps {
  label: string;
  onPress: () => void;
  onRemove?: () => void;
  active?: boolean;
}

interface Styles {
  chip: object;
  chipActive: object;
  label: object;
  labelActive: object;
  removeButton: object;
  removeText: object;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onPress,
  onRemove,
  active = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
      {onRemove && (
        <TouchableOpacity
          onPress={onRemove}
          style={styles.removeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.removeText}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<Styles>({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.radius.full,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.medium,
  },
  labelActive: {
    color: COLORS.textPrimary,
  },
  removeButton: {
    marginLeft: SPACING.xs,
    paddingLeft: SPACING.xs,
  },
  removeText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
  },
});

export default FilterChip;
