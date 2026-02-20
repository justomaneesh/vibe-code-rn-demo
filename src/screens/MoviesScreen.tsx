import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { HomeStackParamList } from '../types';
import CategoryRow from '../components/CategoryRow';
import { mockMovies } from '../data/mockMovies';

type Props = NativeStackScreenProps<HomeStackParamList, 'Movies'>;

interface Styles {
  container: object;
  header: object;
  headerRow: object;
  title: object;
  iconButton: object;
  scrollView: object;
}

const MoviesScreen: React.FC<Props> = ({ navigation, route }) => {
  const handleItemPress = (item: any) => {
    navigation.navigate('ContentDetail', {
      contentId: item.id,
      type: item.contentType,
    });
  };

  const handleFilterPress = () => {
    navigation.navigate('Filter', {
      opener: 'Movies',
    });
  };

  const handleSortPress = () => {
    navigation.navigate('Sort', {
      opener: 'Movies',
    });
  };

  // Group movies by sub-category
  const featureFilms = mockMovies.filter((m) => m.subCategory === 'Feature Films');
  const shortFilms = mockMovies.filter((m) => m.subCategory === 'Short Films');
  const documentaries = mockMovies.filter((m) => m.subCategory === 'Documentaries');
  const biographical = mockMovies.filter((m) => m.subCategory === 'Biographical Films');
  const dramas = mockMovies.filter((m) => m.subCategory === 'Faith-Based Dramas');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Movies</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={handleFilterPress} style={styles.iconButton}>
              <Text style={{ color: COLORS.textPrimary }}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSortPress} style={styles.iconButton}>
              <Text style={{ color: COLORS.textPrimary }}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {featureFilms.length > 0 && (
          <CategoryRow
            title="Feature Films"
            items={featureFilms}
            onItemPress={handleItemPress}
          />
        )}
        {shortFilms.length > 0 && (
          <CategoryRow
            title="Short Films"
            items={shortFilms}
            onItemPress={handleItemPress}
          />
        )}
        {documentaries.length > 0 && (
          <CategoryRow
            title="Documentaries"
            items={documentaries}
            onItemPress={handleItemPress}
          />
        )}
        {biographical.length > 0 && (
          <CategoryRow
            title="Biographical Films"
            items={biographical}
            onItemPress={handleItemPress}
          />
        )}
        {dramas.length > 0 && (
          <CategoryRow
            title="Faith-Based Dramas"
            items={dramas}
            onItemPress={handleItemPress}
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
  header: {
    paddingHorizontal: SPACING.screenPadding,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xxxl,
    fontWeight: FONTS.weight.bold,
  },
  iconButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  scrollView: {
    flex: 1,
  },
});

export default MoviesScreen;
