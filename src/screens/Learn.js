import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { X, Heart, ChevronRight } from 'lucide-react-native';

// Data for the list as seen in your designs
const BIM_DATA = [
  { id: '1', title: 'abang' },
  { id: '2', title: 'ada' },
  { id: '3', title: 'ambil' },
  { id: '4', title: 'anak lelaki' },
  { id: '5', title: 'anak perempuan' },
  { id: '6', title: 'ada' },
  { id: '7', title: 'apa khabar' },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function LearnListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Close button and Star logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color="#999" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Text style={styles.headerStar}>✱</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Favorite icon and Section Header */}
        <Heart color="#555" size={24} style={styles.favIcon} fill="#555" />
        <Text style={styles.sectionLetter}>A</Text>

        <View style={styles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {BIM_DATA.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.listItem}
                onPress={() => navigation.navigate('LearnDetail')}
              >
                <Text style={styles.itemText}>{item.title}</Text>
                <ChevronRight color="#CCC" size={24} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Right side alphabet index */}
          <View style={styles.alphabetIndex}>
            {ALPHABET.map((letter) => (
              <Text key={letter} style={styles.indexLetter}>{letter}</Text>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDF0' }, // Light yellow background
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    backgroundColor: '#FFFBD9' 
  },
  headerStar: { fontSize: 32, color: '#424242' },
  content: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingTop: 20 
  },
  favIcon: { marginLeft: 30, marginBottom: 10 },
  sectionLetter: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginLeft: 40, 
    marginBottom: 10,
    color: '#333' 
  },
  listContainer: { flex: 1, flexDirection: 'row' },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemText: { fontSize: 20, color: '#444' },
  alphabetIndex: { 
    width: 30, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingRight: 10
  },
  indexLetter: { 
    fontSize: 11, 
    color: '#999', 
    marginVertical: 1,
    fontWeight: '500'
  }
});