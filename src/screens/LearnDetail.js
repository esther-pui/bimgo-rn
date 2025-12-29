import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { X, Heart, Play, Megaphone, ThumbsDown, ChevronLeft, ChevronRight, Diamond } from 'lucide-react-native';
import { ImageBackground } from 'react-native';

export default function LearnDetailScreen({ navigation }) {
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
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Abang</Text>
          <Text style={styles.subTitle}>Big Brother</Text>
        </View>

        <View style={styles.contentRow}>
          {/* Left: Image Placeholders */}
          <View style={styles.imageColumn}>
            <View style={styles.imageWrapper}>
              <Text style={styles.indicator}>1/2</Text>
              <Image 
                source={{ uri: 'https://picsum.photos/400/300' }} 
                style={styles.placeholderImage} 
              />
            </View>
            <View style={styles.imageWrapper}>
              <Text style={styles.indicator}>1/2</Text>
              <Image 
                source={{ uri: 'https://picsum.photos/401/300' }} 
                style={styles.placeholderImage} 
              />
            </View>
          </View>

          {/* Right: Vertical Action Icons */}
          <View style={styles.actionColumn}>
            <TouchableOpacity 
              style={styles.iconBtn} 
              onPress={() => navigation.navigate('LearnVideo')}
            >
              <Play size={28} color="#444" fill="#444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}><Diamond size={28} color="#444" /></TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}><Megaphone size={28} color="#444" /></TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}><Heart size={28} color="#444" /></TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}><ThumbsDown size={28} color="#444" /></TouchableOpacity>
          </View>
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

            {/* Optional overlay text */}
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
  container: { flex: 1, backgroundColor: '#FFFDF0' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    backgroundColor: '#FFFBD9' 
  },
  headerStar: { fontSize: 32, color: '#424242' },
  card: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  titleContainer: { marginBottom: 20 },
  mainTitle: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  subTitle: { fontSize: 20, color: '#666' },
  contentRow: { flexDirection: 'row', flex: 1 },
  imageColumn: { flex: 1, gap: 20 },
  imageWrapper: { width: '100%' },
  indicator: { textAlign: 'right', color: '#999', fontSize: 12, marginBottom: 5 },
  placeholderImage: { width: '100%', height: 180, borderRadius: 15, backgroundColor: '#F0F0F0' },
  actionColumn: { width: 60, alignItems: 'center', justifyContent: 'center', gap: 25 },
  iconBtn: { padding: 5 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 10 },
  adsBox: {
    height: 90, // realistic banner height
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden', // ensures image + button respect border radius
    marginTop: 10,
    backgroundColor: '#f0f0f0', // fallback color
  },

  adsImage: {
    flex: 1,          // fills the parent container
    width: '100%',    // ensures full width
    height: '100%',   // ensures full height
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
});