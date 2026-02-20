import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { ContentType } from '../types';

interface ContentTypeChipProps {
  type: ContentType;
}

interface Styles {
  chip: object;
  text: object;
}

const ContentTypeChip: React.FC<ContentTypeChipProps> = ({ type }) => {
  const getTypeLabel = (contentType: ContentType): string => {
    switch (contentType) {
      case 'movie':
        return 'Movie';
      case 'sermon':
        return 'Sermon';
      case 'song':
        return 'Song';
      default:
        return '';
    }
  };

  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{getTypeLabel(type)}</Text>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  chip: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.radius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xs,
    fontWeight: FONTS.weight.medium,
  },
});

export default ContentTypeChip;
