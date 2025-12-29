import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { X, Heart, Play, Timer, Maximize, ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function LearnVideoScreen({ navigation }) {
  const videoSource = require('../assets/videos/abang.mp4'); // local video

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
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Text style={styles.headerStar}>✱</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Abang</Text>
          <Text style={styles.subTitle}>Big Brother</Text>
        </View>

        {/* Video Player */}
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
          <ImageBackground
            source={require('../assets/images/shopee_ads.jpg')}
            style={styles.adsImage}
            resizeMode="cover"
          >
            {/* Small X button */}
            <TouchableOpacity style={styles.adsCloseBtn} onPress={() => console.log('Ad closed')}>
              <X size={18} color="#fff" />
            </TouchableOpacity>

            {/* Overlay text */}
            <Text style={styles.adsText}>Sponsored</Text>
          </ImageBackground>
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
  container: { flex: 1, backgroundColor: '#FFFBD9' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    backgroundColor: '#FFFBD9' 
  },
  headerStar: { fontSize: 32, color: '#424242' },
  card: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  titleContainer: { marginBottom: 30 },
  mainTitle: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  subTitle: { fontSize: 20, color: '#666' },
  videoWrapper: { width: '100%', height: 220, borderRadius: 10, overflow: 'hidden', backgroundColor: '#000' },
  video: { width: '100%', height: '100%' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 30 },

  /* Ads styles */
  adsBox: {
    height: 90,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: '#f0f0f0',
  },
  adsImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 5,
  },
  adsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  adsCloseBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 2,
    zIndex: 10,
  },

  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 10 },
});
