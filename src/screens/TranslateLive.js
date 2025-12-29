import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated, Alert, Platform } from 'react-native';
import { X, Sun, Scan, RotateCcw, Heart, Copy, Volume2, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function TranslateLive({ navigation }) {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const copiedOpacity = useRef(new Animated.Value(0)).current;

  const [flashOn, setFlashOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('back');
  const [isRecording, setIsRecording] = useState(false);

  const [targetLang, setTargetLang] = useState('BM');
  const [translatedText, setTranslatedText] = useState('Baik');
  const [isTranslating, setIsTranslating] = useState(false);

  const [isFavorited, setIsFavorited] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  const toggleLanguage = () => {
    if (isTranslating) return;
    setIsTranslating(true);
    setTimeout(() => {
      if (targetLang === 'BM') {
        setTargetLang('EN');
        setTranslatedText('Good');
      } else {
        setTargetLang('BM');
        setTranslatedText('Baik');
      }
      setIsTranslating(false);
    }, 500);
  };

  const copyToClipboard = async (text) => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        alert(`Copied: ${text}`);
      }
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 800);
    } catch (e) {
      console.error(e);
      alert(`Could not copy: ${text}`);
    }
  };

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 0.9,
            duration: 600,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 600,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      ).start();
    } else {
      pulse.stopAnimation();
      pulse.setValue(1);
    }
  }, [isRecording]);

  const rotateCamera = () => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => rotation.setValue(0));

    setCameraFacing(prev => (prev === 'back' ? 'front' : 'back'));
    setFlashOn(false);
  };

  const pickVideoFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const videoUri = result.assets[0].uri;
      navigation?.navigate?.('TranslateVideo', { videoUri });
    }
  };

  return (
    <View style={styles.container}>
      {/* Fake camera background */}
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <SafeAreaView style={styles.overlay}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <X color="white" size={32} />
            <TouchableOpacity onPress={() => setFlashOn(prev => !prev)}>
              <Sun color={flashOn ? '#FFD700' : 'white'} size={28} />
            </TouchableOpacity>
          </View>

          {/* Fake viewfinder */}
          <View style={styles.viewfinder}>
            <View style={[styles.corner, { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 }]} />
            <View style={[styles.corner, { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 }]} />
            <View style={[styles.corner, { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 }]} />
            <View style={[styles.corner, { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 }]} />
          </View>

          {/* Bottom sheet */}
          <View style={styles.bottomSheet}>
            <Text style={styles.sheetTitle}>TRANSLATING</Text>

            <View style={styles.infoRow}>
              <TouchableOpacity onPress={toggleLanguage}>
                <Text style={styles.langText}>▼ {targetLang}</Text>
              </TouchableOpacity>
              <Text style={styles.confidenceText}>confidence level 😊</Text>
            </View>

            <View style={styles.resultBox}>
              <View style={styles.resultItem}>
                <Text style={styles.aiText}>✨ BIMGo...</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.resultItem}>
                <Text style={styles.translatedWord}>{isTranslating ? '…' : translatedText}</Text>

                {showCopied && (
                  <Text style={{ fontSize: 12, color: '#424242', marginTop: 4 }}>Copied ✓</Text>
                )}

                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => setIsFavorited(prev => !prev)}>
                    <Heart
                      size={18}
                      color={isFavorited ? '#424242' : '#666'}   // stroke color
                      strokeWidth={2}
                      fill={isFavorited ? '#424242' : 'none'}    // fill color
                    />

                  
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => copyToClipboard(translatedText)}>
                    <Copy size={18} color="#666" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => Alert.alert('🔊 Playing pronunciation')}>
                    <Volume2 size={18} color="#666" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setFeedback('up')}>
                    <ThumbsUp size={18} color={feedback === 'up' ? '#424242' : '#666'} fill={feedback === 'up' ? '#424242' : 'none'}/>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setFeedback('down')}>
                    <ThumbsDown size={18} color={feedback === 'down' ? '#424242' : '#666'} fill={feedback === 'down' ? '#424242' : 'none'}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.circleBtn} onPress={pickVideoFromGallery}>
                <Scan color="#333" />
              </TouchableOpacity>

              <Animated.View style={{ transform: [{ scale: pulse }] }}>
                <TouchableOpacity
                  style={[styles.mainCaptureBtn, isRecording && { borderColor: '#E53935' }]}
                  onPress={() => setIsRecording(prev => !prev)}
                >
                  {isRecording ? <View style={styles.stopSquare} /> : <View style={styles.innerCircle} />}
                </TouchableOpacity>
              </Animated.View>

              <TouchableOpacity style={styles.circleBtn} onPress={rotateCamera}>
                <Animated.View
                  style={{
                    transform: [{
                      rotate: rotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    }],
                  }}
                >
                  <RotateCcw color="#333" />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  viewfinder: { position: 'absolute', top: '15%', left: '10%', right: '10%', height: '40%' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: 'white' },
  bottomSheet: { backgroundColor: 'rgba(255,255,255,0.85)', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, paddingBottom: 40 },
  sheetTitle: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: '#444' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  langText: { fontWeight: 'bold' },
  confidenceText: { color: '#666', fontStyle: 'italic' },
  resultBox: { backgroundColor: '#FFFDF0', borderRadius: 20, borderWidth: 1, borderColor: '#E0E0E0', padding: 15 },
  resultItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  aiText: { color: '#888', fontStyle: 'italic' },
  translatedWord: { fontSize: 22, color: '#333' },
  iconRow: { flexDirection: 'row', gap: 12 },
  separator: { height: 1, backgroundColor: '#EEE', marginVertical: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 25 },
  circleBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' },
  mainCaptureBtn: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#999', justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#999' },
  stopSquare: { width: 32, height: 32, backgroundColor: '#E53935', borderRadius: 6 },
});
