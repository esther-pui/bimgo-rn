import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { X, RotateCcw, ChevronRight } from 'lucide-react-native';

const REPEAT_DATA = [
  { section: "Today", items: [
    { id: '1', title: 'abang', count: '2 gestures' },
    { id: '2', title: 'ada', count: '1 gesture' }
  ]},
  { section: "Dec 21, 2025", items: [
    { id: '3', title: 'anak lelaki', count: '1 gesture' },
    { id: '4', title: 'anak perempuan', count: '1 gesture' }
  ]}
];

export default function RepeatScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><X color="#999" size={30} /></TouchableOpacity>
        <Text style={styles.headerStar}>✱</Text>
      </View>

      <View style={styles.content}>
        <RotateCcw color="#2D4379" size={28} style={styles.historyIcon} />
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {REPEAT_DATA.map((section, sIndex) => (
            <View key={sIndex}>
              <Text style={styles.sectionHeader}>{section.section}</Text>
              {section.items.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.listItem}
                  onPress={() => navigation.navigate('LearnDetail')}
                >
                  <View>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Text style={styles.subText}>{item.count}</Text>
                  </View>
                  <ChevronRight color="#CCC" size={24} />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDF0' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    backgroundColor: '#FFFBD9' 
  },
  headerStar: { fontSize: 32, color: '#424242' },
  content: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 20 },
  historyIcon: { marginLeft: 30, marginBottom: 10 },
  sectionHeader: { fontSize: 22, fontWeight: 'bold', marginLeft: 40, marginVertical: 15, color: '#444' },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 40, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  itemText: { fontSize: 20, color: '#444' },
  subText: { fontSize: 12, color: '#999', marginTop: 4 }
});