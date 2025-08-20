import * as React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function Settings() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 18 }}>Settings sayfası</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
