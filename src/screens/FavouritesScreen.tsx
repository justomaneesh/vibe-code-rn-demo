import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { FavouritesStackParamList, ContentItem, ContentType } from '../types';
import ContentTile from '../components/ContentTile';
import FilterChip from '../components/FilterChip';

type Props = NativeStackScreenProps<FavouritesStackParamList, 'Favourites'>;

interface Styles {
  container: object;
  header: object;
  title: object;
  filterContainer: object;
  scrollView: object;
  content: object;
  emptyContainer: object;
  emptyText: object;
}

const FavouritesScreen: React.FC<Props> = ({ navigation }) => {
  // MOCK: In MVP 1, use local state. Replace with proper favourites context/hook later
  const [favourites] = useState<ContentItem[]>([]);
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);

  const filteredFavourites = selectedType
    ? favourites.filter((item) => item.contentType === selectedType)
    : favourites;

  const handleItemPress = (item: ContentItem) => {
    navigation.navigate('ContentDetail', {
      contentId: item.id,
      type: item.contentType,
    });
  };

  const handleTypeFilter = (type: ContentType) => {
    setSelectedType(selectedType === type ? null : type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourites</Text>
      </View>
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
        {filteredFavourites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {favourites.length === 0
                ? 'No favourites yet'
                : 'No favourites in this category'}
            </Text>
          </View>
        ) : (
          <View style={styles.content}>
            {filteredFavourites.map((item) => (
              <ContentTile
                key={item.id}
                item={item}
                onPress={() => handleItemPress(item)}
              />
            ))}
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
  header: {
    paddingHorizontal: SPACING.screenPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xxxl,
    fontWeight: FONTS.weight.bold,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.screenPadding,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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

export default FavouritesScreen;
