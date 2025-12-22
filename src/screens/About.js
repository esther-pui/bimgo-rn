import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { X, ChevronDown, ChevronUp } from 'lucide-react-native';

const ABOUT_CONTENT = [
  {
    title: "ABOUT",
    content: "BIMGo is an AI-powered app that translates Bahasa Isyarat Malaysia (BIM) into text in real time using live camera or video input.\n\nThe app is designed to make everyday interactions easier. For example, communicating with a deaf Grab driver or customer who uses BIM.\n\nWith BIMGo, we aim to bring diverse communities together through communication, supporting the vision of Malaysia MADANI: Rakyat Disantuni."
  },
  { title: "AI & ETHICS", content: "Information regarding AI usage and ethical standards..." },
  { title: "PRIVACY POLICY", content: "Details on how your data is protected..." },
  { title: "CREDITS", content: "Designed and Developed by University of Malaya students." }
];

export default function AboutScreen({ navigation }) {
  const [expandedIndex, setExpandedIndex] = useState(0); // Set first item open by default

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color="#999" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerStar}>✱</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>BİMGGo</Text>
          <Text style={styles.versionText}>version 1.0</Text>
        </View>

        {/* Accordion List */}
        <View style={styles.card}>
          {ABOUT_CONTENT.map((item, index) => (
            <View key={index} style={styles.accordionItem}>
              <TouchableOpacity 
                style={styles.accordionHeader}
                onPress={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
              >
                <Text style={styles.accordionTitle}>{item.title}</Text>
                {expandedIndex === index ? <ChevronUp color="#333" /> : <ChevronDown color="#333" />}
              </TouchableOpacity>
              
              {expandedIndex === index && (
                <View style={styles.accordionBody}>
                  <Text style={styles.bodyText}>{item.content}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
  headerStar: { fontSize: 32, color: '#444' },
  scrollContent: { paddingBottom: 100 },
  logoSection: { alignItems: 'center', marginVertical: 40 },
  logoText: { fontSize: 48, fontWeight: 'bold', color: '#3FB1D5', letterSpacing: 2 },
  versionText: { fontSize: 16, color: '#666', marginTop: 5 },
  card: { backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 20, overflow: 'hidden' },
  accordionItem: { borderBottomWidth: 1, borderBottomColor: '#EEE' },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  accordionTitle: { fontSize: 16, fontWeight: '500', color: '#444' },
  accordionBody: { paddingHorizontal: 20, paddingBottom: 20 },
  bodyText: { fontSize: 14, color: '#555', lineHeight: 20 },
  footer: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' },
  footerText: { fontSize: 10, color: '#999' }
});