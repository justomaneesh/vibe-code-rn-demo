// Mock data for Songs content type
import { SongItem } from '../types';
import { getBanner, getThumbnail } from '../utils/placeholders';

export const mockSongs: SongItem[] = [
  {
    id: 'song-1',
    title: 'Amazing Grace',
    shortDescription: "A timeless hymn of God’s grace and mercy.",
    contentType: 'song',
    subCategory: 'Worship',
    seoTags: ['Faith', 'Prayer'],
    duration: '4:30',
    language: 'English',
    thumbnail: getThumbnail(1),
    banner: getBanner(1),
    rating: 9.5,
  },
  {
    id: 'song-2',
    title: 'How Great Thou Art',
    shortDescription: "A powerful declaration of God’s greatness.",
    contentType: 'song',
    subCategory: 'Gospel',
    seoTags: ['Faith', 'Revival'],
    duration: '5:15',
    language: 'English',
    thumbnail: getThumbnail(2),
    banner: getBanner(2),
    rating: 9.3,
  },
  {
    id: 'song-3',
    title: 'Morning Devotion',
    shortDescription: 'A peaceful song for morning quiet time.',
    contentType: 'song',
    subCategory: 'Devotional',
    seoTags: ['Prayer', 'Faith'],
    duration: '3:45',
    language: 'English',
    thumbnail: getThumbnail(3),
    banner: getBanner(3),
    rating: 8.7,
  },
];
export const featuredSongs: SongItem[] = mockSongs.slice(0, 3);
export const recentlyAddedSongs: SongItem[] = [...mockSongs].reverse();