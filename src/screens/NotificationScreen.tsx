import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { ProfileStackParamList } from '../types';
import NotificationItem from '../components/NotificationItem';
import { mockNotifications } from '../data/mockNotifications';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Notifications'>;

interface Styles {
  container: object;
  header: object;
  title: object;
  scrollView: object;
}

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const handleNotificationPress = (notificationId: string, contentId?: string, contentType?: string) => {
    if (contentId && contentType) {
      navigation.navigate('ContentDetail', {
        contentId,
        type: contentType,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onPress={() =>
              handleNotificationPress(
                notification.id,
                notification.contentId,
                notification.contentType
              )
            }
          />
        ))}
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
  scrollView: {
    flex: 1,
  },
});

export default NotificationScreen;
