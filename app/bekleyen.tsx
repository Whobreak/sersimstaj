import * as React from 'react';
import { View, FlatList, Text, StyleSheet, useWindowDimensions, TouchableOpacity, useColorScheme } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Switch } from 'react-native-switch';
import { Trash } from 'lucide-react-native';

interface PendingItemProps {
  id: string;
  task: string;
  onAnswerChange: (value: boolean) => void;
  onDelete: () => void;
  status: boolean;
}

export default function Bekleyen() {
  const { width: windowWidth } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [tasks, setTasks] = React.useState([
    { id: '1', task: 'İşlem devam ediyor mu?', status: true },
    { id: '2', task: 'Rapor gönderildi mi?', status: false },
  ]);

  const handleToggle = (id: string, value: boolean) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status: value } : t)));
  };

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#f0f0f0' }]}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Card style={[styles.card, { width: windowWidth - 32, backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
            <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Title style={{ color: isDarkMode ? '#fff' : '#000' }}>{item.task}</Title>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Switch
                  value={item.status}
                  onValueChange={(v: boolean) => handleToggle(item.id, v)}
                  circleSize={30}
                  barHeight={1}
                  circleBorderWidth={3}
                  backgroundActive={'green'}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#30a566'}
                  circleInActiveColor={'#000000'}
                  switchWidthMultiplier={2}
                  switchBorderRadius={30}
                />
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Trash size={24} color="red" />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { borderRadius: 14, padding: 16, marginBottom: 16, elevation: 3 },
});
