import * as React from 'react';
import { View, useWindowDimensions, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Activity, Clock, Settings as SettingsIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Acikta from './Acikta';
import Bekleyen from './bekleyen';
import Settings from './settings';

export default function Index() {
  const { width: windowWidth } = useWindowDimensions();
  const [currentTab, setCurrentTab] = React.useState<'acikta' | 'bekleyen' | 'settings'>('acikta');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f0f0f0', paddingTop: insets.top }]}>
      {/* Sayfa İçeriği */}
      <View style={{ flex: 1 }}>
        {currentTab === 'acikta' && <Acikta />}
        {currentTab === 'bekleyen' && <Bekleyen />}
        {currentTab === 'settings' && <Settings />}
      </View>

      {/* Tab Bar */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          backgroundColor: isDarkMode ? '#222' : '#fff',
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? '#444' : '#ccc',
          paddingBottom: insets.bottom + 5,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => setCurrentTab('acikta')} style={styles.tabButton}>
          <Activity size={26} color={currentTab === 'acikta' ? (isDarkMode ? '#fff' : '#007AFF') : '#888'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentTab('bekleyen')} style={styles.tabButton}>
          <Clock size={26} color={currentTab === 'bekleyen' ? (isDarkMode ? '#fff' : '#007AFF') : '#888'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentTab('settings')} style={styles.tabButton}>
          <SettingsIcon size={26} color={currentTab === 'settings' ? (isDarkMode ? '#fff' : '#007AFF') : '#888'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabButton: { alignItems: 'center', justifyContent: 'center' },
});
