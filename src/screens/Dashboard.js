import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const translations = {
  en: { translate: "TRANSLATE", learn: "LEARN", repeat: "REPEAT" },
  bm: { translate: "TERJEMAH", learn: "BELAJAR", repeat: "ULANG" }
};

export default function DashboardScreen({ navigation }) {
  const [lang, setLang] = useState('en'); 
  const t = translations[lang];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logoText}>BİM</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: '#FFF9E6' }]}
          onPress={() => navigation.navigate('Translate', { lang })}
        >
          <Text style={styles.buttonText}>{t.translate}</Text>
          <ChevronRight color="#333" size={28} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: '#FFFDF0' }]}
          onPress={() => navigation.navigate('Learn', { lang })}
        >
          <Text style={styles.buttonText}>{t.learn}</Text>
          <ChevronRight color="#333" size={28} />
        </TouchableOpacity>
        
        <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: '#FFFDF0' }]}
            onPress={() => navigation.navigate('Repeat')}
        >
        <Text style={styles.buttonText}>{t.repeat}</Text>
        <ChevronRight color="#333" size={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.langSwitch}>
          <TouchableOpacity onPress={() => setLang('bm')}>
            <Text style={lang === 'bm' ? styles.langActive : styles.langInactive}>BM</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLang('en')}>
            <Text style={lang === 'en' ? styles.langActive : styles.langInactive}>EN</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Text style={styles.starLogo}>✱</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { alignItems: 'center', marginTop: 60, marginBottom: 40 },
  logoText: { fontSize: 48, fontWeight: 'bold', letterSpacing: 4, color: '#444' },
  menuContainer: { paddingHorizontal: 25 },
  menuButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 35, 
    paddingHorizontal: 25, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#00000010', 
    marginBottom: 20 
  },
  buttonText: { fontSize: 24, fontWeight: '400', letterSpacing: 1.5, color: '#333' },
  footer: { position: 'absolute', bottom: 60, left: 0, right: 0, alignItems: 'center' },
  langSwitch: { flexDirection: 'row', marginBottom: 30 },
  langInactive: { fontSize: 18, color: '#999', marginHorizontal: 10 },
  langActive: { 
    fontSize: 18, 
    color: '#000', 
    fontWeight: 'bold', 
    marginHorizontal: 10, 
    textDecorationLine: 'underline' 
  },
  starLogo: { fontSize: 50, color: '#333' },
});