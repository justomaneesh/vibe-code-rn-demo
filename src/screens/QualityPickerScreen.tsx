import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { RootStackParamList, VideoQuality } from '../types';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'QualityPicker'>;

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
}

const QualityPickerScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>('auto');

  const handleApply = () => {
    // Navigate back to video player with selected quality
    navigation.goBack();
    // In production, pass quality back to player
  };

  const qualityOptions: { label: string; value: VideoQuality }[] = [
    { label: 'Auto', value: 'auto' },
    { label: '480p', value: '480p' },
    { label: '720p', value: '720p' },
    { label: '1080p', value: '1080p' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Video Quality</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Quality</Text>
          <View style={styles.options}>
            {qualityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  selectedQuality === option.value && styles.optionActive,
                ]}
                onPress={() => setSelectedQuality(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedQuality === option.value && styles.optionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.actions}>
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
    padding: SPACING.screenPadding,
    paddingTop: SPACING.md,
  },
});

export default QualityPickerScreen;
