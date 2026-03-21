import { Tabs } from 'expo-router';
import { StyleSheet, Platform } from 'react-native';
import { colors, typography } from '../../constants/theme';
import {
  SketchHome,
  SketchBook,
  SketchFeed,
  SketchHeadphones,
  SketchUser,
} from '../../components/HandDrawnIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <SketchHome size={24} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <SketchBook size={24} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <SketchFeed size={24} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="podcasts"
        options={{
          title: 'Podcasts',
          tabBarIcon: ({ color, focused }) => (
            <SketchHeadphones size={24} color={color} filled={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <SketchUser size={24} color={color} filled={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 6,
    height: Platform.OS === 'web' ? 64 : 88,
    shadowOpacity: 0,
    elevation: 0,
  },
  tabBarLabel: {
    fontFamily: typography.rounded,
    fontSize: 10,
    fontWeight: '400',
    marginTop: 1,
    letterSpacing: 0.3,
  },
});
