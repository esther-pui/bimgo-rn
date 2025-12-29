import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { X, ChevronRight } from 'lucide-react-native';

const SETTING_OPTIONS = [
  "CHANGE THEME",
  "CLEAR CACHE",
  "FEEDBACK & DONATE",
  "ABOUT US",
  "TERM & CONDITIONS"
];

export default function SettingScreen({ navigation }) {
  
  // Logic to handle different setting clicks
  const handlePress = (item) => {
    switch (item) {
      case "ABOUT US":
        navigation.navigate('About'); // Navigates to About.js
        break;
      case "CLEAR CACHE":
        Alert.alert("Cache Cleared", "The application cache has been successfully reset.");
        break;
      default:
        console.log(`${item} pressed`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color="#999" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerStar}>✱</Text>
      </View>

      <Text style={styles.pageTitle}>SETTING</Text>

      {/* Settings Card */}
      <View style={styles.card}>
        {SETTING_OPTIONS.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.optionItem, 
              index === SETTING_OPTIONS.length - 1 && { borderBottomWidth: 0 }
            ]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
            <ChevronRight color="#333" size={24} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer Copyright */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Copyright © 2025 University of Malaya. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    backgroundColor: '#FFFBD9' 
  },
  headerStar: { fontSize: 32, color: '#424242' },
  pageTitle: { 
    textAlign: 'center', 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#444', 
    marginTop: 20,
    marginBottom: 30 
  },
  card: { 
    backgroundColor: '#FFF', 
    marginHorizontal: 20, 
    borderRadius: 20, 
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3
  },
  optionItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 20, 
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  optionText: { fontSize: 16, color: '#333', fontWeight: '500' },
  footer: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
  footerText: { fontSize: 10, color: '#999' }
});