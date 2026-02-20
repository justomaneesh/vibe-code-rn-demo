import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { ContentItem } from '../types';
import ContentTile from './ContentTile';

interface CategoryRowProps {
  title: string;
  items: ContentItem[];
  onItemPress: (item: ContentItem) => void;
  onViewAllPress?: () => void;
}

interface Styles {
  container: object;
  header: object;
  title: object;
  viewAll: object;
  scrollView: object;
  content: object;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  title,
  items,
  onItemPress,
  onViewAllPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onViewAllPress && (
          <TouchableOpacity onPress={onViewAllPress}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {items.map((item) => (
          <ContentTile
            key={item.id}
            item={item}
            onPress={() => onItemPress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    marginBottom: SPACING.sectionGap,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
  },
  viewAll: {
    color: COLORS.accent,
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.medium,
  },
  scrollView: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: SPACING.screenPadding,
  },
});

export default CategoryRow;
