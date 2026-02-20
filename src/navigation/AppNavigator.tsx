import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

// Auth screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// Main screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Category screens
import MoviesScreen from '../screens/MoviesScreen';
import SermonsScreen from '../screens/SermonsScreen';
import SongsScreen from '../screens/SongsScreen';

// Detail screens
import ContentDetailScreen from '../screens/ContentDetailScreen';
import NotificationScreen from '../screens/NotificationScreen';

// Modal screens
import FilterScreen from '../screens/FilterScreen';
import SortScreen from '../screens/SortScreen';
import QualityPickerScreen from '../screens/QualityPickerScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

import {
  RootStackParamList,
  AuthStackParamList,
  MainTabParamList,
  HomeStackParamList,
  SearchStackParamList,
  FavouritesStackParamList,
  ProfileStackParamList,
} from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();
const FavouritesStack = createNativeStackNavigator<FavouritesStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();



// Auth Stack Navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

// Home Stack Navigator
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Movies" component={MoviesScreen} />
      <HomeStack.Screen name="Sermons" component={SermonsScreen} />
      <HomeStack.Screen name="Songs" component={SongsScreen} />
      <HomeStack.Screen name="ContentDetail" component={ContentDetailScreen} />
    </HomeStack.Navigator>
  );
};

// Search Stack Navigator
const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="ContentDetail" component={ContentDetailScreen} />
    </SearchStack.Navigator>
  );
};

// Favourites Stack Navigator
const FavouritesStackNavigator = () => {
  return (
    <FavouritesStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <FavouritesStack.Screen name="Favourites" component={FavouritesScreen} />
      <FavouritesStack.Screen name="ContentDetail" component={ContentDetailScreen} />
    </FavouritesStack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Notifications" component={NotificationScreen} />
      <ProfileStack.Screen name="ContentDetail" component={ContentDetailScreen} />
    </ProfileStack.Navigator>
  );
};

// Main Bottom Tabs Navigator
const MainNavigator = () => {
  return (
    <MainTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textTertiary,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
        },
      }}
    >
      <MainTabs.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <MainTabs.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: 'Search',
        }}
      />
      <MainTabs.Screen
        name="FavouritesTab"
        component={FavouritesStackNavigator}
        options={{
          tabBarLabel: 'Favourites',
        }}
      />
      <MainTabs.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </MainTabs.Navigator>
  );
};


// Root Navigator
const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            {/* Modal Stack Group */}
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="Filter" component={FilterScreen} />
              <Stack.Screen name="Sort" component={SortScreen} />
              <Stack.Screen name="QualityPicker" component={QualityPickerScreen} />
              <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
