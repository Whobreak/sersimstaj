import * as React from 'react';
import { View, FlatList, TextInput, Text, StyleSheet, useWindowDimensions, useColorScheme } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CardItemProps {
  id: string;
  role: string;
  name: string;
  phone: string;
  city: string;
}

export default function Acikta() {
  const { width: windowWidth } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = React.useState('');

  const cardsData: CardItemProps[] = [
    { id: '1', role: 'STAJYER', name: 'Görkem Karlı', phone: '+905533004923', city: 'DÜZCE' },
    { id: '2', role: 'STAJYER', name: 'Ali Veli', phone: '+905533001234', city: 'İSTANBUL' },
    { id: '3', role: 'STAJYER', name: 'Ayşe Demir', phone: '+905533009876', city: 'ANKARA' },
  ];

  const filteredCards = cardsData.filter(
    card =>
      card.name.toLowerCase().includes(searchText.toLowerCase()) ||
      card.city.toLowerCase().includes(searchText.toLowerCase()) ||
      card.role.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: isDarkMode ? '#000' : '#f0f0f0' }]}>
      <TextInput
        placeholder="Ara... (isim, rol, şehir)"
        placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
        value={searchText}
        onChangeText={setSearchText}
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }]}
      />

      <FlatList
        data={filteredCards}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Card style={[styles.card, { width: windowWidth - 32, backgroundColor: isDarkMode ? '#222' : '#fff' }]}>
            <Card.Content>
              <Title style={{ color: isDarkMode ? '#fff' : '#000' }}>{item.role}</Title>
              <Paragraph style={{ color: isDarkMode ? '#fff' : '#000' }}>İsim: {item.name}</Paragraph>
              <Paragraph style={{ color: isDarkMode ? '#fff' : '#000' }}>Telefon: {item.phone}</Paragraph>
              <Paragraph style={{ color: isDarkMode ? '#fff' : '#000' }}>Şehir: {item.city}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
});
