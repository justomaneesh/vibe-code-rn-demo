import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { SearchStackParamList, ContentItem, ContentType } from '../types';
import SearchBar from '../components/SearchBar';
import FilterChip from '../components/FilterChip';
import CategoryRow from '../components/CategoryRow';
import { mockMovies } from '../data/mockMovies';
import { mockSermons } from '../data/mockSermons';
import { mockSongs } from '../data/mockSongs';

type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

interface Styles {
  container: object;
  scrollView: object;
  filterContainer: object;
  resultsContainer: object;
  emptyContainer: object;
  emptyText: object;
}

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);

  const allContent: ContentItem[] = useMemo(() => {
    return [...mockMovies, ...mockSermons, ...mockSongs];
  }, []);

  const filteredContent = useMemo(() => {
    let filtered = allContent;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.shortDescription.toLowerCase().includes(query) ||
          item.seoTags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedType) {
      filtered = filtered.filter((item) => item.contentType === selectedType);
    }

    return filtered;
  }, [allContent, searchQuery, selectedType]);

  const movies = filteredContent.filter((item) => item.contentType === 'movie');
  const sermons = filteredContent.filter((item) => item.contentType === 'sermon');
  const songs = filteredContent.filter((item) => item.contentType === 'song');

  const handleItemPress = (item: ContentItem) => {
    navigation.navigate('ContentDetail', {
      contentId: item.id,
      type: item.contentType,
    });
  };

  const handleFilterPress = () => {
    navigation.navigate('Filter', {
      opener: 'Search',
      currentFilters: selectedType ? { contentType: selectedType } : undefined,
    });
  };

  const handleSortPress = () => {
    navigation.navigate('Sort', {
      opener: 'Search',
    });
  };

  const handleTypeFilter = (type: ContentType) => {
    setSelectedType(selectedType === type ? null : type);
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <View style={styles.filterContainer}>
        <FilterChip
          label="Movies"
          active={selectedType === 'movie'}
          onPress={() => handleTypeFilter('movie')}
        />
        <FilterChip
          label="Sermons"
          active={selectedType === 'sermon'}
          onPress={() => handleTypeFilter('sermon')}
        />
        <FilterChip
          label="Songs"
          active={selectedType === 'song'}
          onPress={() => handleTypeFilter('song')}
        />
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredContent.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        ) : (
          <View style={styles.resultsContainer}>
            {movies.length > 0 && (
              <CategoryRow
                title="Movies"
                items={movies}
                onItemPress={handleItemPress}
              />
            )}
            {sermons.length > 0 && (
              <CategoryRow
                title="Sermons"
                items={sermons}
                onItemPress={handleItemPress}
              />
            )}
            {songs.length > 0 && (
              <CategoryRow
                title="Songs"
                items={songs}
                onItemPress={handleItemPress}
              />
            )}
          </View>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
  },
  resultsContainer: {
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.xxl,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
  },
});

export default SearchScreen;
