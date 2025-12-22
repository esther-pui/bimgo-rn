import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { X, Heart, Play, Timer, Maximize, ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function LearnVideoScreen({ navigation }) {
  // Random placeholder video
  const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color="#999" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerStar}>✱</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Abang</Text>
          <Text style={styles.subTitle}>Big Brother</Text>
        </View>

        {/* Video Player Area */}
        <View style={styles.videoWrapper}>
          <VideoView 
            style={styles.video} 
            player={player} 
            allowsFullscreen 
            allowsPictureInPicture 
          />
        </View>

        {/* Horizontal Action Bar */}
        <View style={styles.actionRow}>
          <TouchableOpacity><Timer size={32} color="#444" /></TouchableOpacity>
          <TouchableOpacity><Play size={32} color="#444" fill="#444" /></TouchableOpacity>
          <TouchableOpacity><Heart size={32} color="#444" /></TouchableOpacity>
          <TouchableOpacity><Maximize size={32} color="#444" /></TouchableOpacity>
        </View>

        {/* Ads Section */}
        <View style={styles.adsBox}>
          <Text style={styles.adsText}>ADS</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity><ChevronLeft size={45} color="#2D4379" /></TouchableOpacity>
        <TouchableOpacity><ChevronRight size={45} color="#2D4379" /></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDF0' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' },
  headerStar: { fontSize: 35, color: '#444' },
  card: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  titleContainer: { marginBottom: 30 },
  mainTitle: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  subTitle: { fontSize: 20, color: '#666' },
  videoWrapper: { width: '100%', height: 220, borderRadius: 10, overflow: 'hidden', backgroundColor: '#000' },
  video: { width: '100%', height: '100%' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 30 },
  adsBox: { backgroundColor: '#D9D9D9', height: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000', marginTop: 'auto', marginBottom: 20 },
  adsText: { letterSpacing: 5, fontWeight: '500' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 10 }
});