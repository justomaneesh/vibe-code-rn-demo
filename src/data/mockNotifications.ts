// Mock data for Notifications
import { NotificationItem } from '../types';

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Message Available',
    shortDescription: 'A new message of hope is available for you.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    contentId: 'sermon-1',
    contentType: 'sermon',
  },
  {
    id: 'notif-2',
    title: 'Today\'s Worship Song',
    shortDescription: 'Today\'s worship song is ready for you.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    contentId: 'song-1',
    contentType: 'song',
  },
  {
    id: 'notif-3',
    title: 'New Feature Film',
    shortDescription: 'A new faith-based film has been added to the library.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    contentId: 'movie-1',
    contentType: 'movie',
  },
  {
    id: 'notif-4',
    title: 'Special Program',
    shortDescription: 'Don\'t miss this special program on faith and healing.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    contentId: 'sermon-2',
    contentType: 'sermon',
  },
  {
    id: 'notif-5',
    title: 'New Content Added',
    shortDescription: 'New inspirational content has been added to your favorites category.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    contentId: 'movie-2',
    contentType: 'movie',
  },
];
