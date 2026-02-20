import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { HomeStackParamList } from '../types';
import CategoryRow from '../components/CategoryRow';
import { mockSongs } from '../data/mockSongs';

type Props = NativeStackScreenProps<HomeStackParamList, 'Songs'>;

interface Styles {
  container: object;
  header: object;
  headerRow: object;
  title: object;
  iconButton: object;
  scrollView: object;
}

const SongsScreen: React.FC<Props> = ({ navigation }) => {
  const handleItemPress = (item: any) => {
    navigation.navigate('ContentDetail', {
      contentId: item.id,
      type: item.contentType,
    });
  };

  const handleFilterPress = () => {
    navigation.navigate('Filter', {
      opener: 'Songs',
    });
  };

  const handleSortPress = () => {
    navigation.navigate('Sort', {
      opener: 'Songs',
    });
  };

  // Group songs by sub-category
  const worship = mockSongs.filter((s) => s.subCategory === 'Worship');
  const gospel = mockSongs.filter((s) => s.subCategory === 'Gospel');
  const devotional = mockSongs.filter((s) => s.subCategory === 'Devotional');
  const choir = mockSongs.filter((s) => s.subCategory === 'Choir & Live Worship');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Songs</Text>
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
        {worship.length > 0 && (
          <CategoryRow
            title="Worship"
            items={worship}
            onItemPress={handleItemPress}
          />
        )}
        {gospel.length > 0 && (
          <CategoryRow
            title="Gospel"
            items={gospel}
            onItemPress={handleItemPress}
          />
        )}
        {devotional.length > 0 && (
          <CategoryRow
            title="Devotional"
            items={devotional}
            onItemPress={handleItemPress}
          />
        )}
        {choir.length > 0 && (
          <CategoryRow
            title="Choir & Live Worship"
            items={choir}
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

export default SongsScreen;
