import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated, ScrollView, Platform, Alert } from 'react-native';
import { X, Sun, Scan, RotateCcw, Heart, Copy, Volume2, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function TranslateLive({ navigation }) {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const videoRef = useRef(null);
  const scrollRef = useRef(null);
  const bimgoColor = useRef(new Animated.Value(0)).current; // 0 = gray, 1 = highlight

  // Camera states
  const [flashOn, setFlashOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('back');
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user');

  // Translation feed
  const wordSequence = ['Baik', 'Makan', 'Nasi', 'Lemak'];
  const [words, setWords] = useState([]);
  const [fadeAnims, setFadeAnims] = useState([]);

  // Word-specific interactions
  const [favorites, setFavorites] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Language & UI
  const [targetLang, setTargetLang] = useState('BM');

  const translations = {
    BM: ['Baik', 'Makan', 'Nasi', 'Lemak'],
    EN: ['Good', 'Eat', 'Rice', 'Coconut Rice'],
  };

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [words]);

  // Pulse animation for recording
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 0.9, duration: 600, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: Platform.OS !== 'web' }),
        ])
      ).start();
    } else {
      pulse.stopAnimation();
      pulse.setValue(1);
    }
  }, [isRecording]);

  // Web camera setup with error handling
  useEffect(() => {
    if (Platform.OS === 'web') {
      async function startCamera() {
        if (stream) stream.getTracks().forEach(track => track.stop());
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          if (!devices.some(d => d.kind === 'videoinput')) {
            alert('No camera detected');
            return;
          }
          const newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode }, audio: false });
          setStream(newStream);
          if (videoRef.current) videoRef.current.srcObject = newStream;
        } catch (err) {
          console.error('Camera error:', err);
          alert('Unable to access camera');
        }
      }
      startCamera();
      return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
    }
  }, [facingMode]);

  useEffect(() => {
    let isCancelled = false; // to stop the loop when recording stops

    const loopTranslation = async () => {
      const currentWords = translations[targetLang];
      let index = 0;

      while (!isCancelled) {
        const word = currentWords[index % currentWords.length];
        await addWord(word);
        await new Promise(res => setTimeout(res, 800));
        index++;
      }
    };

    if (isRecording) {
      loopTranslation();
    } else {
      isCancelled = true; // stop loop
    }

    return () => { isCancelled = true; }; // cleanup if component unmounts
  }, [isRecording, targetLang]);


  // Rotate camera
  const rotateCamera = () => {
    if (Platform.OS !== 'web') {
      Animated.timing(rotation, { toValue: 1, duration: 300, useNativeDriver: true }).start(() => rotation.setValue(0));
      setCameraFacing(prev => (prev === 'back' ? 'front' : 'back'));
      setFlashOn(false);
    } else {
      setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
    }
  };

  // Pick video from gallery
  const pickVideoFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      const videoUri = result.assets[0]?.uri || 'https://www.w3schools.com/html/mov_bbb.mp4';
      navigation.navigate('TranslateVideo', { videoUri }); // <- here
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        alert(`Copied: ${text}`);
      }
      Alert.alert('Copied!', text);
    } catch (e) {
      console.error(e);
      alert(`Could not copy: ${text}`);
    }
  };

  // Language toggle
  const toggleLanguage = () => {
    setTargetLang(prev => (prev === 'BM' ? 'EN' : 'BM'));
  };

  // Add word with fade animation
  const addWord = async (word) => {
    startBimgoAnimation(); // start flashing color

    await new Promise(res => setTimeout(res, 1500)); // simulate scanning

    stopBimgoAnimation(); // finalize color to blue

    const anim = new Animated.Value(0);
    setFadeAnims(prev => [...prev, anim]);
    setWords(prev => [...prev, word]);
    setFavorites(prev => [...prev, false]);
    setFeedbacks(prev => [...prev, null]);

    Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  };


  // Start translating words
  const startTranslation = async () => {
    // Start with empty arrays only the first time
    if (words.length === 0) {
      setWords([]);
      setFadeAnims([]);
      setFavorites([]);
      setFeedbacks([]);
    }

    const currentWords = translations[targetLang];

    let index = 0;
    while (isRecording) {  // <- loop while recording
      const word = currentWords[index % currentWords.length]; // rotate words
      await addWord(word);
      await new Promise(res => setTimeout(res, 800)); // delay between words
      index++;
    }
  };

  const startBimgoAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bimgoColor, { toValue: 1, duration: 500, useNativeDriver: false }),
        Animated.timing(bimgoColor, { toValue: 0, duration: 500, useNativeDriver: false }),
      ])
    ).start();
  };

  const stopBimgoAnimation = () => {
    bimgoColor.stopAnimation();
    Animated.timing(bimgoColor, { toValue: 1, duration: 200, useNativeDriver: false }).start(); // stay blue
  };

  // Start on mount
  // useEffect(() => { startTranslation(); }, [targetLang]);

  const handleRecordPress = () => {
    setIsRecording(prev => !prev);

    if (!isRecording) {
      // Start looping translation
      startTranslation();
    }
  };

  return (
    <View style={styles.container}>
      {/* Camera */}
      {Platform.OS === 'web' && (
        <div style={{ flex: 1, position: 'relative', backgroundColor: '#000' }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Overlay */}
      <SafeAreaView style={styles.overlay}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <X color="white" size={32} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFlashOn(prev => !prev)}>
            <Sun color={flashOn ? '#FFD700' : 'white'} size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>TRANSLATING</Text>

          {/* Language toggle & confidence */}
          <View style={styles.infoRow}>
            <TouchableOpacity onPress={toggleLanguage}>
              <Text style={styles.langText}>▼ {targetLang}</Text>
            </TouchableOpacity>
            <Text style={styles.confidenceText}>confidence level 😊</Text>
          </View>

          {/* Translation feed */}
          <View style={styles.resultBox}>
            {/* BIMGo stays fixed at the top */}
            <Animated.Text
              style={{
                fontStyle: 'italic',
                marginBottom: 5,
                color: bimgoColor.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#888', '#2295C5'], // grey -> blue
                }),
              }}
            >
              ✨ BIMGo...
            </Animated.Text>

            <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 5 }}
            showsVerticalScrollIndicator={true}
          >
            {words.map((word, index) => (
              <View key={index}>
                {/* Word row */}
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

                {/* Separator between words (except after last word) */}
                {index < words.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </ScrollView>

          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.circleBtn} onPress={pickVideoFromGallery}>
              <Scan color="#333" />
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ scale: pulse }] }}>
              <TouchableOpacity
                style={[styles.mainCaptureBtn, isRecording && { borderColor: '#E53935' }]}
                onPress={handleRecordPress}
              >
                {isRecording ? <View style={styles.stopSquare} /> : <View style={styles.innerCircle} />}
              </TouchableOpacity>

            </Animated.View>

            <TouchableOpacity style={styles.circleBtn} onPress={rotateCamera}>
              <Animated.View style={{ transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
                <RotateCcw color="#333" />
              </Animated.View>
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
  topBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  bottomSheet: { backgroundColor: 'rgba(255,255,255,0.85)', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, paddingBottom: 40 },
  sheetTitle: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: '#444', marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  langText: { fontWeight: 'bold' },
  confidenceText: { color: '#666', fontStyle: 'italic' },
  resultBox: {
  backgroundColor: '#FFFDF0',
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#E0E0E0',
  padding: 10,
  maxHeight: 140,  // limit height
  height: 140,     // fixed height
},

  wordRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 2 },
  iconRow: { flexDirection: 'row', gap: 10 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 },
  circleBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' },
  mainCaptureBtn: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#999', justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#999' },
  stopSquare: { width: 32, height: 32, backgroundColor: '#E53935', borderRadius: 6 },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0', // light grey
    marginVertical: 5,
  }

});
