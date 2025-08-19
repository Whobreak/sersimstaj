import * as React from 'react';
import { View, FlatList, TextInput, useWindowDimensions, Text, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/components/ui/tooltip';
import { Info, Home, User, Settings } from 'lucide-react-native';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';


import { Input } from '~/components/ui/input';


function Example() {
  const [value, setValue] = React.useState('');

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
      <Input
        placeholder='Write some stuff...'
        value={value}
        onChangeText={onChangeText}
        aria-labelledby='inputLabel'
        aria-errormessage='inputError'
      />
  );
}


  const [value, setValue] = React.useState('');

  const onChangeText = (text: string) => {
    setValue(text);
  };

  //return (
      <Input
        placeholder='Write some stuff...'
        value={value}
        onChangeText={onChangeText}
        aria-labelledby='inputLabel'
        aria-errormessage='inputError'
      />
//  );







// ---------------------------
// Card Props
// ---------------------------
interface CardItemProps {
  id: string;
  role: string;
  name: string;
  phone: string;
  city: string;
}

interface CardItemComponentProps extends CardItemProps {
  width: number;
  isDarkMode: boolean;
}

// ---------------------------
// Card Item Component
// ---------------------------
function CardItem({ role, name, phone, city, width, isDarkMode }: CardItemComponentProps) {
  const textColor = isDarkMode ? '#fff' : '#000';
  const bgColor = isDarkMode ? '#222' : '#fff';
  const iconColor = isDarkMode ? '#fff' : '#000';

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <Card style={[styles.card, { width, backgroundColor: bgColor }]}>
        <CardHeader style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardTitle style={[styles.cardTitle, { color: textColor }]}>{role}</CardTitle>
          <Tooltip>
            <TooltipTrigger>
              <Info width={20} height={20} color={iconColor} />
            </TooltipTrigger>
            <TooltipContent>
              <Text style={[styles.tooltipContent, { color: textColor }]}>
                Bu rol hakkında ekstra bilgi
              </Text>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent>
          <Text style={[styles.cardText, { color: textColor }]}>İsim: {name}</Text>
          <Text style={[styles.cardText, { color: textColor }]}>Telefon: {phone}</Text>
          <Text style={[styles.cardText, { color: textColor }]}>Şehir: {city}</Text>
        </CardContent>
      </Card>
    </Animated.View>
  );
}

// ---------------------------
// Main Screen
// ---------------------------
export default function Index() {
  const { width: windowWidth } = useWindowDimensions();
  const [searchText, setSearchText] = React.useState('');
  const [currentTab, setCurrentTab] = React.useState('home');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const cardsData: CardItemProps[] = [
    { id: '1', role: 'STAJYER', name: 'Görkem Karlı', phone: '+905533004923', city: 'DÜZCE' },
    { id: '2', role: 'STAJYER', name: 'Ali Veli', phone: '+905533001234', city: 'İSTANBUL' },
    { id: '3', role: 'STAJYER', name: 'Ayşe Demir', phone: '+905533009876', city: 'ANKARA' },
    { id: '4', role: 'STAJYER', name: 'Mehmet Can', phone: '+905533009999', city: 'İZMİR' },
    { id: '5', role: 'STAJYER', name: 'Elif Yılmaz', phone: '+905533001122', city: 'BURSA' },
  ];

  const filteredCards = cardsData.filter(
    (card) =>
      card.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      card.city.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      card.role.toLowerCase().includes(searchText.toLowerCase().trim())
  );

  const inputBg = isDarkMode ? '#333' : '#fff';
  const inputTextColor = isDarkMode ? '#fff' : '#000';
  const containerBg = isDarkMode ? '#000' : 'rgba(124, 148, 139, 0.57)';

  return (
    <View style={[styles.container, { backgroundColor: containerBg, paddingTop: insets.top }]}>
      <TextInput
        placeholder="Ara... (isim, rol, şehir)"
        placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
        value={searchText}
        onChangeText={setSearchText}
        style={[styles.input, { backgroundColor: inputBg, color: inputTextColor }]}
      />

      <Tabs value={currentTab} onValueChange={setCurrentTab} style={{ flex: 1 }}>
        {/* Home Tab */}
        <TabsContent value="home" style={{ flex: 1 }}>
          <FlatList
            data={filteredCards}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}
            renderItem={({ item }) => <CardItem {...item} width={windowWidth - 32} isDarkMode={isDarkMode} />}
          />
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Profile sayfası</Text>
          </View>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Settings sayfası</Text>
          </View>
        </TabsContent>

        {/* Tab Bar */}
        <TabsList
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: insets.bottom,
            left: 0,
            right: 0,
            height: 60,
            backgroundColor: isDarkMode ? '#222' : '#fff',
            zIndex: 999,
          }}
        >
          <TabsTrigger value="home" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Home size={24} color={currentTab === 'home' ? (isDarkMode ? '#fff' : '#007AFF') : '#888'} />
            {currentTab === 'home' && (
              <View style={{
                position: 'absolute',
                bottom: 0,
                height: 2,
                width: 24,
                backgroundColor: isDarkMode ? '#fff' : '#007AFF',
                borderRadius: 1,
              }}/>
            )}
          </TabsTrigger>

          <TabsTrigger value="profile" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <User size={24} color={currentTab === 'profile' ? (isDarkMode ? '#fff' : '#007AFF') : '#888'} />
            {currentTab === 'profile' && (
              <View style={{
                position: 'absolute',
                bottom: 0,
                height: 2,
                width: 24,
                backgroundColor: isDarkMode ? '#fff' : '#007AFF',
                borderRadius: 1,
              }}/>
            )}
          </TabsTrigger>

          <TabsTrigger value="settings" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={24} color={currentTab === 'settings' ? (isDarkMode ? '#fff' : '#007AFF') : '#888'} />
            {currentTab === 'settings' && (
              <View style={{
                position: 'absolute',
                bottom: 0,
                height: 2,
                width: 24,
                backgroundColor: isDarkMode ? '#fff' : '#007AFF',
                borderRadius: 1,
              }}/>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </View>
  );
}

// ---------------------------
// Styles
// ---------------------------
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontWeight: '700', fontSize: 16 },
  cardText: { fontSize: 14, marginBottom: 4 },
  tooltipContent: { fontSize: 13 },
});

