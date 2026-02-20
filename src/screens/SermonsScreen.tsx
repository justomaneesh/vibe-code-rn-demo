import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { HomeStackParamList } from '../types';
import CategoryRow from '../components/CategoryRow';
import { mockSermons } from '../data/mockSermons';

type Props = NativeStackScreenProps<HomeStackParamList, 'Sermons'>;

interface Styles {
  container: object;
  header: object;
  headerRow: object;
  title: object;
  iconButton: object;
  scrollView: object;
}

const SermonsScreen: React.FC<Props> = ({ navigation }) => {
  const handleItemPress = (item: any) => {
    navigation.navigate('ContentDetail', {
      contentId: item.id,
      type: item.contentType,
    });
  };

  const handleFilterPress = () => {
    navigation.navigate('Filter', {
      opener: 'Sermons',
    });
  };

  const handleSortPress = () => {
    navigation.navigate('Sort', {
      opener: 'Sermons',
    });
  };

  // Group sermons by sub-category
  const sundayServices = mockSermons.filter((s) => s.subCategory === 'Sunday Services');
  const revivalMessages = mockSermons.filter((s) => s.subCategory === 'Revival Messages');
  const thematicSermons = mockSermons.filter((s) => s.subCategory === 'Thematic Sermons');
  const conferenceSessions = mockSermons.filter((s) => s.subCategory === 'Conference Sessions');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Sermons</Text>
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
        {sundayServices.length > 0 && (
          <CategoryRow
            title="Sunday Services"
            items={sundayServices}
            onItemPress={handleItemPress}
          />
        )}
        {revivalMessages.length > 0 && (
          <CategoryRow
            title="Revival Messages"
            items={revivalMessages}
            onItemPress={handleItemPress}
          />
        )}
        {thematicSermons.length > 0 && (
          <CategoryRow
            title="Thematic Sermons"
            items={thematicSermons}
            onItemPress={handleItemPress}
          />
        )}
        {conferenceSessions.length > 0 && (
          <CategoryRow
            title="Conference Sessions"
            items={conferenceSessions}
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

export default SermonsScreen;
