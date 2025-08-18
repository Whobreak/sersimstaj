import * as React from 'react';
import { View, FlatList, TextInput, useWindowDimensions, Text, StyleSheet } from 'react-native';

// ---------------------------
// Props Tipleri
// ---------------------------
interface CardItemProps {
  id: string;
  role: string;
  name: string;
  phone: string;
  city: string;
}


// import { // card
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '~/components/ui/card';
// import { Progress } from '~/components/ui/progress';

// import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
interface CardItemComponentProps extends CardItemProps {
  width: number;
}

// ---------------------------
// Component: CardItem
// ---------------------------
function CardItem({ role, name, phone, city, width }: CardItemComponentProps) {
  return (
    <View style={[styles.card, { width }]}>
      <Text style={styles.cardTitle}>{role}</Text>
      <Text style={styles.cardSubtitle}>{name}</Text>
      <Text>{phone}</Text>
      <Text>{city}</Text>
    </View>
  );
}

// ---------------------------
// Main Screen
// ---------------------------
export default function Screen() {
  const { width: windowWidth } = useWindowDimensions();
  const [searchText, setSearchText] = React.useState('');

  // Kart verisi
  const cardsData: CardItemProps[] = [
    { id: '1', role: 'STAJYER', name: 'Görkem Karlı', phone: '+905533004923', city: 'DÜZCE' },
    { id: '2', role: 'STAJYER', name: 'Ali Veli', phone: '+905533001234', city: 'İSTANBUL' },
    { id: '3', role: 'STAJYER', name: 'Ayşe Demir', phone: '+905533009876', city: 'ANKARA' },
    { id: '4', role: 'STAJYER', name: 'Mehmet Can', phone: '+905533009999', city: 'İZMİR' },
    { id: '5', role: 'STAJYER', name: 'Elif Yılmaz', phone: '+905533001122', city: 'BURSA' },
  ];

  // Arama filtreleme
  const filteredCards = cardsData.filter(
    (card) =>
      card.name.toLowerCase().includes(searchText.toLowerCase()) ||
      card.city.toLowerCase().includes(searchText.toLowerCase()) ||
      card.role.toLowerCase().includes(searchText.toLowerCase())
  );

  // Kart genişliği (2 sütun)
  const columnGap = 16;
  const cardWidth = (windowWidth - 32 - columnGap) / 2;

  return (
    <View style={styles.container}>
      {/* Arama / Filtreleme */}
      <TextInput
        placeholder="Ara... (isim, rol, şehir)"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      {/* Kartlar */}
      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
        renderItem={({ item }) => <CardItem {...item} width={cardWidth} />}
      />
    </View>
  );
}

// ---------------------------
// StyleSheet
// ---------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'rgba(220,220,220,0.3)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardSubtitle: {
    fontWeight: '600',
    marginBottom: 6,
  },
});
