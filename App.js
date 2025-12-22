import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

// Import all screens
import DashboardScreen from './src/screens/Dashboard';
import LearnListScreen from './src/screens/Learn'; 
import TranslateLiveScreen from './src/screens/TranslateLive'; 
import LearnDetailScreen from './src/screens/LearnDetail';
import LearnVideoScreen from './src/screens/LearnVideo';
import SettingScreen from './src/screens/Setting';
import AboutScreen from './src/screens/About';
import RepeatScreen from './src/screens/Repeat';

const Stack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFDF0', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#3FB1D5' }}>BİMGo</Text>
      <Text style={{ color: '#3FB1D5', marginTop: 10 }}>AI-powered BIM Translator</Text>
    </View>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Translate" component={TranslateLiveScreen} />
        <Stack.Screen name="Learn" component={LearnListScreen} />
        <Stack.Screen name="LearnDetail" component={LearnDetailScreen} />
        <Stack.Screen name="LearnVideo" component={LearnVideoScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Repeat" component={RepeatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}