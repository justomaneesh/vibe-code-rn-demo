import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { ContentItem } from '../types';
import PrimaryButton from './PrimaryButton';

interface FeaturedBannerProps {
  items: ContentItem[];
  onItemPress: (item: ContentItem) => void;
  onWatchNowPress: (item: ContentItem) => void;
}

interface Styles {
  container: object;
  scrollView: object;
  slide: object;
  image: object;
  overlay: object;
  content: object;
  title: object;
  description: object;
  buttonContainer: object;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 400;
const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({
  items,
  onItemPress,
  onWatchNowPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [items.length]);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.slide}
            onPress={() => onItemPress(item)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: item.banner }} style={styles.image} />
            <View style={styles.overlay}>
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.shortDescription}
                </Text>
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    title="Watch Now"
                    onPress={() => onWatchNowPress(item)}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    height: BANNER_HEIGHT,
    marginBottom: SPACING.sectionGap,
  },
  scrollView: {
    flexGrow: 0,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
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
    maxWidth: '80%',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xxxl,
    fontWeight: FONTS.weight.bold,
    marginBottom: SPACING.sm,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
    marginBottom: SPACING.lg,
    lineHeight: FONTS.size.md * FONTS.lineHeight.normal,
  },
  buttonContainer: {
    width: 200,
  },
});

export default FeaturedBanner;
