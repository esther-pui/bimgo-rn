import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated, ScrollView, Platform, Alert } from 'react-native';
import { X, Sun, Scan, RotateCcw, Heart, Copy, Volume2, ThumbsUp, ThumbsDown } from 'lucide-react-native';

export default function TranslateVideo({ route, navigation }) {
  const { videoUri } = route.params || {}; // URI passed from gallery or placeholder
  const videoRef = useRef(null);
  const scrollRef = useRef(null);
  const bimgoColor = useRef(new Animated.Value(0)).current;

  // Translation word states
  const [words, setWords] = useState([]);        // start empty
  const [fadeAnims, setFadeAnims] = useState([]); 
  const [favorites, setFavorites] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [targetLang, setTargetLang] = useState('BM');

  // BIMGo color animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bimgoColor, { toValue: 1, duration: 500, useNativeDriver: false }),
        Animated.timing(bimgoColor, { toValue: 0, duration: 500, useNativeDriver: false }),
      ]),
      { iterations: 2 } // flash twice
    ).start();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const anim = new Animated.Value(0);
      setFadeAnims([anim]);
      setWords(['Baik']);
      setFavorites([false]);
      setFeedbacks([null]);

      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 1500); // delay in ms, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setTargetLang(prev => (prev === 'BM' ? 'EN' : 'BM'));
  };

  const copyToClipboard = (text) => {
    try {
      if (navigator?.clipboard) {
        navigator.clipboard.writeText(text);
        Alert.alert('Copied!', text);
      } else {
        Alert.alert('Copied!', text);
      }
    } catch (e) {
      console.error(e);
      alert(`Could not copy: ${text}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Video preview */}
      {Platform.OS === 'web' ? (
        <video
          ref={videoRef}
          src={videoUri || 'https://www.w3schools.com/html/mov_bbb.mp4'}
          controls
          autoPlay
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Video playback not implemented for mobile native in this prototype</Text>
        </View>
      )}

      {/* Overlay */}
      <SafeAreaView style={styles.overlay}>
        <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <X color="white" size={32} />
            </TouchableOpacity>
        </View>

        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>TRANSLATING</Text>

          {/* Language & confidence */}
          <View style={styles.infoRow}>
            <TouchableOpacity onPress={toggleLanguage}>
              <Text style={styles.langText}>▼ {targetLang}</Text>
            </TouchableOpacity>
            <Text style={styles.confidenceText}>confidence level 😊</Text>
          </View>

          {/* Translation feed */}
          <View style={styles.resultBox}>
            <Animated.Text
              style={{
                fontStyle: 'italic',
                marginBottom: 5,
                color: bimgoColor.interpolate({ inputRange: [0, 1], outputRange: ['#888', '#2295C5'] }),
              }}
            >
              ✨ BIMGo...
            </Animated.Text>

            <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 5 }}>
              {words.map((word, index) => (
                <View key={index}>
                  <View style={styles.wordRow}>
                    <View style={{ flex: 1 }}>
                      <Animated.Text style={{ opacity: fadeAnims[index], fontSize: 22 }}>
                        {word}
                      </Animated.Text>
                    </View>

                    <View style={styles.iconRow}>
                      <TouchableOpacity onPress={() => {
                        const newFav = [...favorites];
                        newFav[index] = !newFav[index];
                        setFavorites(newFav);
                      }}>
                        <Heart size={18} color={favorites[index] ? '#424242' : '#666'} fill={favorites[index] ? '#424242' : 'none'} />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => copyToClipboard(word)}>
                        <Copy size={18} color="#666" />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => Alert.alert('🔊 Playing pronunciation', word)}>
                        <Volume2 size={18} color="#666" />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => {
                        const newFb = [...feedbacks];
                        newFb[index] = feedbacks[index] === 'up' ? null : 'up';
                        setFeedbacks(newFb);
                      }}>
                        <ThumbsUp size={18} color={feedbacks[index] === 'up' ? '#424242' : '#666'} fill={feedbacks[index] === 'up' ? '#424242' : 'none'} />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => {
                        const newFb = [...feedbacks];
                        newFb[index] = feedbacks[index] === 'down' ? null : 'down';
                        setFeedbacks(newFb);
                      }}>
                        <ThumbsDown size={18} color={feedbacks[index] === 'down' ? '#424242' : '#666'} fill={feedbacks[index] === 'down' ? '#424242' : 'none'} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Separator */}
                  {index < words.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Action buttons (optional, can remove if you want only video view) */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.circleBtn}>
              <Scan color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn}>
              <RotateCcw color="#333" />
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  topBar: { flexDirection: 'row', justifyContent: 'flex-start', padding: 20 },
  bottomSheet: { backgroundColor: 'rgba(255,255,255,0.85)', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, paddingBottom: 40 },
  sheetTitle: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: '#444', marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  langText: { fontWeight: 'bold' },
  confidenceText: { color: '#666', fontStyle: 'italic' },
  resultBox: { backgroundColor: '#FFFDF0', borderRadius: 20, borderWidth: 1, borderColor: '#E0E0E0', padding: 10, maxHeight: 140, height: 140 },
  wordRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 },
  iconRow: { flexDirection: 'row', gap: 10 },
  separator: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 },
  circleBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' },
});
