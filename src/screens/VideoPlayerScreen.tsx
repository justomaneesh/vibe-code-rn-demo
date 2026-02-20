import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { RootStackParamList } from '../types';
import { mockMovies } from '../data/mockMovies';
import { mockSermons } from '../data/mockSermons';
import { mockSongs } from '../data/mockSongs';
import { ContentItem } from '../types';
import Video from 'react-native-video';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;
const SAMPLE_VIDEO_URL =
  'https://customer-i6oni2kwo89vbrxk.cloudflarestream.com/26f947d8d95b765d809e850d51b3daec/manifest/video.m3u8';

interface Styles {
  container: object;
  videoContainer: object;
  placeholder: object;
  placeholderText: object;
  controls: object;
  controlsOverlay: object;
  topControls: object;
  backButton: object;
  backButtonText: object;
  title: object;
  centerControls: object;
  playButton: object;
  playButtonText: object;
  bottomControls: object;
  progressBar: object;
  progressBarFill: object;
  timeContainer: object;
  timeText: object;
  settingsButton: object;
  settingsButtonText: object;
}

const VideoPlayerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { contentId, type, resumePosition } = route.params;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(resumePosition || 0);
  const [duration, setDuration] = useState<number>(3600);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Find content item
  const allContent: ContentItem[] = [...mockMovies, ...mockSermons, ...mockSongs];
  const item = allContent.find((c) => c.id === contentId);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In production, control actual video playback
  };

  const handleSettings = () => {
    navigation.navigate('QualityPicker', {
      contentId,
      type,
    });
  };

  const toggleControls = () => {
  if (controlsTimeoutRef.current) {
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = null;
  }

  setShowControls(prev => {
    const next = !prev;

    if (next) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); // auto-hide after 3s
    }

    return next;
  });
};


  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {/* Video placeholder - replace with actual video player */}
        <Video
          source={{ uri: SAMPLE_VIDEO_URL }}
          style={styles.video}
          resizeMode="contain"
          paused={!isPlaying}
          onProgress={({ currentTime }) => setCurrentTime(currentTime)}
          onLoad={({ duration }) => setDuration(duration)}
          repeat={false}
        />

        <TouchableOpacity
          style={styles.touchOverlay}
          activeOpacity={1}
          onPress={toggleControls}
        />
        {showControls && (
          <View style={styles.controlsOverlay}>
            {/* Top Controls */}
            <View style={styles.topControls}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              {item && (
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
              )}
            </View>

            {/* Center Controls */}
            <View style={styles.centerControls}>
              <TouchableOpacity
                onPress={handlePlayPause}
                style={styles.playButton}
              >
                <Text style={styles.playButtonText}>{isPlaying ? '⏸' : '▶'}</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <View style={styles.progressBar}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}> / {formatTime(duration)}</Text>
                <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
                  <Text style={styles.settingsButtonText}>⚙ Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.lg,
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: SPACING.sm,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.medium,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.md,
    fontWeight: FONTS.weight.semibold,
    flex: 1,
    marginLeft: SPACING.md,
  },
  centerControls: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xxxl,
  },
  bottomControls: {
    paddingBottom: SPACING.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 2,
    marginBottom: SPACING.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.sm,
  },
  settingsButton: {
    padding: SPACING.sm,
  },
  settingsButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.medium,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  touchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
// controlsOverlay: {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   justifyContent: 'center',
//   alignItems: 'center',
// },
});

export default VideoPlayerScreen;
