import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { ContentItem } from '../types';
import ContentTypeChip from './ContentTypeChip';

interface ContentTileProps {
  item: ContentItem;
  onPress: () => void;
}

interface Styles {
  tile: object;
  image: object;
  overlay: object;
  badgeContainer: object;
  durationContainer: object;
  durationText: object;
}

const ContentTile: React.FC<ContentTileProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.badgeContainer}>
          <ContentTypeChip type={item.contentType} />
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<Styles>({
  tile: {
    width: 150,
    height: 225,
    marginRight: SPACING.md,
    borderRadius: SPACING.radius.md,
    overflow: 'hidden',
    backgroundColor: COLORS.backgroundSecondary,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: SPACING.sm,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
  },
  durationContainer: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.overlay,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.radius.sm,
  },
  durationText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xs,
    fontWeight: FONTS.weight.medium,
  },
});

export default ContentTile;
