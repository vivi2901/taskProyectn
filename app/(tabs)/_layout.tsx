import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: true, 
        headerTitle: 'TaskFlow',
      }}>
        
      <Tabs.Screen
        name="index"
        options={{
          href: null, 
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'Nueva Tarea',
          tabBarButton: () => (
            <Pressable style={styles.floatingButton} onPress={() => router.push('/two')}>
              <FontAwesome name="plus" size={28} color="white" />
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="three"
        options={{
          href: null, 
        }}
      />
    </Tabs>
  );
}

// Estilos
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 0, // Quita la línea superior en Android
    elevation: 0,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10, // Ajusta la distancia desde la parte inferior
    alignSelf: 'center', // Centra el botón en la barra
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
