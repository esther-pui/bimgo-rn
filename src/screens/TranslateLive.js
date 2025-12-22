import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { X, Sun, Scan, RotateCcw, Heart, Copy, Volume2, ThumbsUp, ThumbsDown } from 'lucide-react-native';

export default function TranslateLive({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="front">
        <SafeAreaView style={styles.overlay}>
          {/* Top Controls */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <X color="white" size={32} />
            </TouchableOpacity>
            <Sun color="white" size={28} />
          </View>

          {/* Viewfinder Corners */}
          <View style={styles.viewfinder}>
             <View style={[styles.corner, { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 }]} />
             <View style={[styles.corner, { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 }]} />
             <View style={[styles.corner, { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 }]} />
             <View style={[styles.corner, { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 }]} />
          </View>

          {/* Translation Bottom Sheet */}
          <View style={styles.bottomSheet}>
            <Text style={styles.sheetTitle}>TRANSLATING</Text>
            <View style={styles.infoRow}>
               <Text style={styles.langText}>▼ BM</Text>
               <Text style={styles.confidenceText}>confidence level 😊</Text>
            </View>

            <View style={styles.resultBox}>
              <View style={styles.resultItem}>
                <Text style={styles.aiText}>✨ BIMGo...</Text>
              </View>
              <View style={styles.separator} />
              
              {/* Mock Translation Result */}
              <View style={styles.resultItem}>
                <Text style={styles.translatedWord}>Baik</Text>
                <View style={styles.iconRow}>
                  <Heart size={18} color="#666" />
                  <Copy size={18} color="#666" />
                  <Volume2 size={18} color="#666" />
                  <ThumbsUp size={18} color="#666" />
                  <ThumbsDown size={18} color="#666" />
                </View>
              </View>
            </View>

            {/* Camera Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.circleBtn}><Scan color="#333" /></TouchableOpacity>
              <TouchableOpacity style={styles.mainCaptureBtn}><View style={styles.innerCircle} /></TouchableOpacity>
              <TouchableOpacity style={styles.circleBtn}><RotateCcw color="#333" /></TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
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
  innerCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#999' }
});