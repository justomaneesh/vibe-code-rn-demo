import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { ProfileStackParamList } from '../types';
import ProfileSection from '../components/ProfileSection';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

interface Styles {
  container: object;
  scrollView: object;
  header: object;
  username: object;
  sections: object;
  logoutButton: object;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // MOCK: In MVP 1, use mock data. Replace with proper user context later
  const username = 'User Name';
  const email = 'user@example.com';
  const fullName = 'User Name';
  const dateOfBirth = '01/01/1990';
  const mobileNumber = '+1234567890';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // In production, clear auth state and navigate to Welcome
          // navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
          Alert.alert('Logged Out', 'You have been logged out successfully.');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.sections}>
        <ProfileSection title="Profile Details">
          <Text style={{ color: COLORS.textSecondary, marginBottom: SPACING.xs }}>
            Full Name: {fullName}
          </Text>
          <Text style={{ color: COLORS.textSecondary, marginBottom: SPACING.xs }}>
            Email: {email}
          </Text>
          <Text style={{ color: COLORS.textSecondary, marginBottom: SPACING.xs }}>
            Date of Birth: {dateOfBirth}
          </Text>
          <Text style={{ color: COLORS.textSecondary }}>
            Mobile Number: {mobileNumber}
          </Text>
        </ProfileSection>
        <ProfileSection
          title="Viewing Activity"
          onPress={() => {
            // Navigate to watch history if implemented
          }}
        />
        <ProfileSection
          title="Favourites"
          onPress={() => {
            // Navigate to favourites tab
          }}
        />
        <ProfileSection
          title="Notifications"
          onPress={() => navigation.navigate('Notifications')}
        />
      </View>
      <View style={styles.logoutButton}>
        <PrimaryButton title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    padding: SPACING.screenPadding,
    paddingTop: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  username: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xxxl,
    fontWeight: FONTS.weight.bold,
  },
  sections: {
    marginBottom: SPACING.xl,
  },
  logoutButton: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
});

export default ProfileScreen;
