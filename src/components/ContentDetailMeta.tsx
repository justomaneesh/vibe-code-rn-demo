import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { ContentItem, SEOTag } from '../types';

interface ContentDetailMetaProps {
  item: ContentItem;
}

interface Styles {
  container: object;
  section: object;
  label: object;
  value: object;
  tagsContainer: object;
  tag: object;
  tagText: object;
}

const ContentDetailMeta: React.FC<ContentDetailMetaProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{item.duration}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Language</Text>
        <Text style={styles.value}>{item.language}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{item.subCategory}</Text>
      </View>
      {item.speakerName && (
        <View style={styles.section}>
          <Text style={styles.label}>Speaker</Text>
          <Text style={styles.value}>{item.speakerName}</Text>
        </View>
      )}
      {item.rating && (
        <View style={styles.section}>
          <Text style={styles.label}>Rating</Text>
          <Text style={styles.value}>{item.rating.toFixed(1)}</Text>
        </View>
      )}
      {item.seoTags.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Tags</Text>
          <View style={styles.tagsContainer}>
            {item.seoTags.map((tag: SEOTag, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    padding: SPACING.screenPadding,
  },
  section: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.textTertiary,
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.medium,
    marginBottom: SPACING.xs,
  },
  value: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.xs,
  },
  tag: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.radius.sm,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  tagText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.xs,
  },
});

export default ContentDetailMeta;
