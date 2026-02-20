import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
import { HomeStackParamList, ContentItem } from '../types';
import ContentDetailHero from '../components/ContentDetailHero';
import ContentDetailMeta from '../components/ContentDetailMeta';
import CategoryRow from '../components/CategoryRow';
import { mockMovies } from '../data/mockMovies';
import { mockSermons } from '../data/mockSermons';
import { mockSongs } from '../data/mockSongs';

type Props = NativeStackScreenProps<HomeStackParamList, 'ContentDetail'>;

interface Styles {
  container: object;
  scrollView: object;
}

const ContentDetailScreen: React.FC<any> = ({ route, navigation }) => {
  const { contentId, type } = route.params;
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  // Find the content item
  const allContent: ContentItem[] = useMemo(() => {
    return [...mockMovies, ...mockSermons, ...mockSongs];
  }, []);

  const item = useMemo(() => {
    return allContent.find((c) => c.id === contentId);
  }, [allContent, contentId]);

  // Find related content (same type and similar tags)
  const relatedContent = useMemo(() => {
    if (!item) return [];
    return allContent
      .filter(
        (c) =>
          c.id !== item.id &&
          c.contentType === item.contentType &&
          c.seoTags.some((tag) => item.seoTags.includes(tag))
      )
      .slice(0, 5);
  }, [allContent, item]);

  if (!item) {
    return null;
  }

  const handleWatchNow = () => {
    navigation.navigate('VideoPlayer', {
      contentId: item.id,
      type: item.contentType,
    });
  };

  const handleAddToFavourites = () => {
    setIsFavourite(!isFavourite);
    // In production, update favourites context/store
  };

  const handleRelatedItemPress = (relatedItem: ContentItem) => {
    navigation.navigate('ContentDetail', {
      contentId: relatedItem.id,
      type: relatedItem.contentType,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ContentDetailHero
          item={item}
          onWatchNowPress={handleWatchNow}
          onAddToFavouritesPress={handleAddToFavourites}
          isFavourite={isFavourite}
        />
        <ContentDetailMeta item={item} />
        {relatedContent.length > 0 && (
          <CategoryRow
            title="More Like This"
            items={relatedContent}
            onItemPress={handleRelatedItemPress}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
});

export default ContentDetailScreen;
