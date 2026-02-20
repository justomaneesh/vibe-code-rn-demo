import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { ContentItem } from '../types';
import ContentTypeChip from './ContentTypeChip';
import PrimaryButton from './PrimaryButton';

interface ContentDetailHeroProps {
  item: ContentItem;
  onWatchNowPress: () => void;
  onAddToFavouritesPress: () => void;
  isFavourite?: boolean;
}

interface Styles {
  container: object;
  image: object;
  overlay: object;
  content: object;
  title: object;
  description: object;
  badgeContainer: object;
  actions: object;
  buttonSpacing: object;
}

const ContentDetailHero: React.FC<ContentDetailHeroProps> = ({
  item,
  onWatchNowPress,
  onAddToFavouritesPress,
  isFavourite = false,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.banner }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.badgeContainer}>
            <ContentTypeChip type={item.contentType} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.shortDescription}</Text>
          <View style={styles.actions}>
            <PrimaryButton title="Watch Now" onPress={onWatchNowPress} />
            <View style={styles.buttonSpacing} />
            <PrimaryButton
              title={isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
              onPress={onAddToFavouritesPress}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: 400,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
    padding: SPACING.screenPadding,
  },
  content: {
    maxWidth: '90%',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xxxl,
    fontWeight: FONTS.weight.bold,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
    marginBottom: SPACING.lg,
    lineHeight: FONTS.size.md * FONTS.lineHeight.normal,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpacing: {
    width: SPACING.md,
  },
});

export default ContentDetailHero;
