import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { NotificationItem as NotificationItemType } from '../types';

interface NotificationItemProps {
  notification: NotificationItemType;
  onPress: () => void;
}

interface Styles {
  container: object;
  content: object;
  title: object;
  description: object;
  timestamp: object;
  divider: object;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
}) => {
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {notification.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {notification.shortDescription}
        </Text>
        <Text style={styles.timestamp}>{formatTimestamp(notification.timestamp)}</Text>
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    paddingHorizontal: SPACING.screenPadding,
    paddingVertical: SPACING.md,
  },
  content: {
    flex: 1,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.semibold,
    marginBottom: SPACING.xs,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.sm,
    marginBottom: SPACING.xs,
    lineHeight: FONTS.size.sm * FONTS.lineHeight.normal,
  },
  timestamp: {
    color: COLORS.textTertiary,
    fontSize: FONTS.size.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginTop: SPACING.md,
  },
});

export default NotificationItem;
