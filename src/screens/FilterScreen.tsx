import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { RootStackParamList, FilterParams, ContentType } from '../types';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

interface Styles {
  container: object;
  header: object;
  headerRow: object;
  title: object;
  closeButton: object;
  closeButtonText: object;
  scrollView: object;
  section: object;
  sectionTitle: object;
  options: object;
  option: object;
  optionActive: object;
  optionText: object;
  optionTextActive: object;
  actions: object;
  buttonSpacing: object;
}

const FilterScreen: React.FC<Props> = ({ route, navigation }) => {
  const { opener, currentFilters } = route.params || {};
  const [filters, setFilters] = useState<FilterParams>(currentFilters || {});

  const handleApply = () => {
    // Navigate back to opener with filters
    navigation.navigate(opener as any, { filterParams: filters });
  };

  const handleClear = () => {
    setFilters({});
  };

  const toggleContentType = (type: ContentType) => {
    setFilters((prev) => ({
      ...prev,
      contentType: prev.contentType === type ? undefined : type,
    }));
  };

  const toggleFilterOption = (option: 'popular' | 'recently-added') => {
    setFilters((prev) => ({
      ...prev,
      filterOption: prev.filterOption === option ? undefined : option,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Type</Text>
          <View style={styles.options}>
            {(['movie', 'sermon', 'song'] as ContentType[]).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.option,
                  filters.contentType === type && styles.optionActive,
                ]}
                onPress={() => toggleContentType(type)}
              >
                <Text
                  style={[
                    styles.optionText,
                    filters.contentType === type && styles.optionTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter By</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[
                styles.option,
                filters.filterOption === 'popular' && styles.optionActive,
              ]}
              onPress={() => toggleFilterOption('popular')}
            >
              <Text
                style={[
                  styles.optionText,
                  filters.filterOption === 'popular' && styles.optionTextActive,
                ]}
              >
                Popular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                filters.filterOption === 'recently-added' && styles.optionActive,
              ]}
              onPress={() => toggleFilterOption('recently-added')}
            >
              <Text
                style={[
                  styles.optionText,
                  filters.filterOption === 'recently-added' && styles.optionTextActive,
                ]}
              >
                Recently Added
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.actions}>
        <PrimaryButton title="Clear" onPress={handleClear} />
        <View style={styles.buttonSpacing} />
        <PrimaryButton title="Apply" onPress={handleApply} />
      </View>
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
  closeButton: {
    padding: SPACING.sm,
  },
  closeButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xxxl,
    fontWeight: FONTS.weight.bold,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.screenPadding,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.semibold,
    marginBottom: SPACING.md,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.radius.md,
    backgroundColor: COLORS.backgroundSecondary,
    marginRight: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  optionText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.medium,
  },
  optionTextActive: {
    color: COLORS.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    padding: SPACING.screenPadding,
    paddingTop: SPACING.md,
  },
  buttonSpacing: {
    width: SPACING.md,
  },
});

export default FilterScreen;
