// All shared TypeScript types and interfaces for Evangel OTT app

export type ContentType = 'movie' | 'sermon' | 'song';

export type MovieSubCategory =
  | 'Feature Films'
  | 'Short Films'
  | 'Documentaries'
  | 'Biographical Films'
  | 'Faith-Based Dramas';

export type SermonSubCategory =
  | 'Sunday Services'
  | 'Revival Messages'
  | 'Thematic Sermons'
  | 'Conference Sessions';

export type SongSubCategory =
  | 'Worship'
  | 'Gospel'
  | 'Devotional'
  | 'Choir & Live Worship';

export type SEOTag = 'Faith' | 'Healing' | 'Youth' | 'Prayer' | 'Revival';

export type SortOption = 'newest' | 'oldest' | 'a-z';

export type FilterOption = 'popular' | 'recently-added';

export type VideoQuality = 'auto' | '480p' | '720p' | '1080p';

export interface ContentItem {
  id: string;
  title: string;
  shortDescription: string;
  contentType: ContentType;
  subCategory: MovieSubCategory | SermonSubCategory | SongSubCategory;
  seoTags: SEOTag[];
  duration: string; // e.g., "2H 45M", "45M"
  language: string;
  thumbnail: string; // URL or placeholder
  banner: string; // URL or placeholder for featured section
  speakerName?: string; // For sermons
  rating?: number; // Optional rating
}

export interface MovieItem extends ContentItem {
  contentType: 'movie';
  subCategory: MovieSubCategory;
}

export interface SermonItem extends ContentItem {
  contentType: 'sermon';
  subCategory: SermonSubCategory;
  speakerName: string;
}

export interface SongItem extends ContentItem {
  contentType: 'song';
  subCategory: SongSubCategory;
}

export interface NotificationItem {
  id: string;
  title: string;
  shortDescription: string;
  timestamp: string; // ISO date string
  contentId?: string; // Optional link to content
  contentType?: ContentType;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth?: string;
  mobileNumber?: string;
}

export interface FilterParams {
  contentType?: ContentType;
  subCategory?: string;
  language?: string;
  filterOption?: FilterOption;
}

export interface AuthFlowParams {
  email: string;
  flow: 'login' | 'signup';
  fullName?: string; // For signup flow
}

// Navigation route params
export interface ContentDetailParams {
  contentId: string;
  type: ContentType;
}

export interface FilterScreenParams {
  opener: string; // Screen name that opened filter
  currentFilters?: FilterParams;
}

export interface SortScreenParams {
  opener: string; // Screen name that opened sort
  currentSort?: SortOption;
}

export interface QualityPickerParams {
  contentId?: string;
  type?: ContentType;
}

export interface VideoPlayerParams {
  contentId: string;
  type: ContentType;
  resumePosition?: number; // Position in seconds
}

export interface CategoryScreenParams {
  sortBy?: SortOption;
  filterParams?: FilterParams;
}

// Navigation Param Lists for React Navigation
import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Movies: CategoryScreenParams | undefined;
  Sermons: CategoryScreenParams | undefined;
  Songs: CategoryScreenParams | undefined;
  ContentDetail: ContentDetailParams;
};

export type SearchStackParamList = {
  Search: undefined;
  ContentDetail: ContentDetailParams;
};

export type FavouritesStackParamList = {
  Favourites: undefined;
  ContentDetail: ContentDetailParams;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Notifications: undefined;
  ContentDetail: ContentDetailParams;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SearchTab: NavigatorScreenParams<SearchStackParamList>;
  FavouritesTab: NavigatorScreenParams<FavouritesStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Filter: FilterScreenParams;
  Sort: SortScreenParams;
  QualityPicker: QualityPickerParams;
  VideoPlayer: VideoPlayerParams;
};
