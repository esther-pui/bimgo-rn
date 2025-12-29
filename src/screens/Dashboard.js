import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const translations = {
  en: { translate: 'TRANSLATE', learn: 'LEARN', repeat: 'REPEAT' },
  bm: { translate: 'TERJEMAH', learn: 'BELAJAR', repeat: 'ULANG' },
};

export default function DashboardScreen({ navigation }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  // Animation for subtle splash
  const splashAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const splashLoop = () => {
      Animated.sequence([
        Animated.timing(splashAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(splashAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.delay(1000),
      ]).start(() => splashLoop());
    };
    splashLoop();
  }, []);

  const menuItems = [
    { key: 'translate', route: 'Translate', animated: true },
    { key: 'learn', route: 'Learn', animated: false },
    { key: 'repeat', route: 'Repeat', animated: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logoText}>BİM</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map(({ key, route, animated }) => {
          if (key === 'translate') {
            return (
              <TouchableOpacity key="translate" onPress={() => navigation.navigate('Translate', { lang })}>
                {/* Wrapper with gradient background */}
                <Animated.View
                  style={{
                    borderRadius: 20,        // outer radius
                    padding: 2,              // border thickness
                    background: 'linear-gradient(45deg, #4ED1E2, #AEBEFF, #D1BCD6, #FCBAA4)',
                    opacity: splashAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] }),
                    marginBottom: 10,
                  }}
                >
                  {/* Inner button */}
                  <View
                    style={{
                      borderRadius: 20,      // slightly smaller to show border
                      backgroundColor: '#FFF9E6',
                      paddingVertical: 25,
                      paddingHorizontal: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={styles.buttonText}>{t['translate']}</Text>
                    <ChevronRight color="#333" size={28} />
                  </View>
                </Animated.View>
              </TouchableOpacity>

            );
          } else {
            return (
              <View
                key={key}
                style={[styles.menuButtonWrapper, { borderColor: '#424242', borderWidth: 2 }]}
              >
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate(route, { lang })}
                >
                  <Text style={styles.buttonText}>{t[key]}</Text>
                  <ChevronRight color="#333" size={28} />
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.langSwitch}>
          {['bm', 'en'].map((code) => (
            <TouchableOpacity key={code} onPress={() => setLang(code)}>
              <Text style={lang === code ? styles.langActive : styles.langInactive}>
                {code.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
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
  header: { alignItems: 'center', marginTop: 60, marginBottom: 90 },
  logoText: { fontSize: 30, fontWeight: 'bold', letterSpacing: 4, color: '#444' },
  menuContainer: { paddingHorizontal: 25 },
  menuButtonWrapper: {
    borderRadius: 20,
    marginBottom: 10,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
  },
  buttonText: { fontSize: 23, fontWeight: '300', letterSpacing: 1.5, color: '#424242' },
  footer: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center' },
  langSwitch: { flexDirection: 'row', marginBottom: 30 },
  langInactive: { fontSize: 16, color: '#999', marginHorizontal: 10 },
  langActive: {
    fontSize: 16,
    color: '#424242',
    fontWeight: 'bold',
    marginHorizontal: 10,
    textDecorationLine: 'underline',
  },
  starLogo: { fontSize: 40, color: '#424242' },
});
