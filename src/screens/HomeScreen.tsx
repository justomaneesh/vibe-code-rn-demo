import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
import { HomeStackParamList, ContentItem } from '../types';
import FeaturedBanner from '../components/FeaturedBanner';
import CategoryRow from '../components/CategoryRow';
import { mockMovies,featuredMovies,recentlyAddedMovies, } from '../data/mockMovies';
import { mockSermons as allSermons } from '../data/mockSermons';
import { mockSongs as allSongs } from '../data/mockSongs';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

interface Styles {
  container: object;
  scrollView: object;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleItemPress = (item: ContentItem) => {
    navigation.navigate('ContentDetail', {
      contentId: item.id,
      type: item.contentType,
    });
  };

  const handleWatchNow = (item: ContentItem) => {
    navigation.navigate('ContentDetail', {
      contentId: item.id,
      type: item.contentType,
    });
  };

  const handleViewAllMovies = () => {
    navigation.navigate('Movies');
  };

  const handleViewAllSermons = () => {
    navigation.navigate('Sermons');
  };

  const handleViewAllSongs = () => {
    navigation.navigate('Songs');
  };

  // Combine all content for recently added
  const allRecentlyAdded: ContentItem[] = [
    ...recentlyAddedMovies.slice(0, 5),
    ...allSermons.slice(0, 3),
    ...allSongs.slice(0, 2),
  ].sort(() => Math.random() - 0.5); // Shuffle for variety
const featuredItems: ContentItem[] = [
  ...(featuredMovies ?? []),
  ...((allSermons ?? []).slice(0, 1)),
  ...((allSongs ?? []).slice(0, 1)),
];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <FeaturedBanner
          items={featuredItems}
          onItemPress={handleItemPress}
          onWatchNowPress={handleWatchNow}
        />

        <CategoryRow
          title="Recently Added"
          items={allRecentlyAdded}
          onItemPress={handleItemPress}
        />
        <CategoryRow
          title="Movies"
          items={mockMovies.slice(0, 5)}
          onItemPress={handleItemPress}
          onViewAllPress={handleViewAllMovies}
        />
        <CategoryRow
          title="Sermons"
          items={allSermons.slice(0, 5)}
          onItemPress={handleItemPress}
          onViewAllPress={handleViewAllSermons}
        />
        <CategoryRow
          title="Songs"
          items={allSongs.slice(0, 5)}
          onItemPress={handleItemPress}
          onViewAllPress={handleViewAllSongs}
        />
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

export default HomeScreen;
