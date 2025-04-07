import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { supabase } from "../../lib/supabase";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: true, 
        headerTitle: 'TaskFlow',
        headerRight: () => (
          <Pressable style={styles.logoutButton} onPress={() => supabase.auth.signOut()}>
            <FontAwesome name="sign-out" size={20} color="black" />
          </Pressable>
        ),
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
          headerLeft: () => (
            <Pressable style={styles.backButton} onPress={() => {router.push({ pathname: '/'});}}>
              <FontAwesome name="chevron-left" size={15} color="black" />
            </Pressable>
          ),
          title: 'Nueva Tarea',
          tabBarStyle: { display: 'none' },
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
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <Pressable style={styles.backButton} onPress={() => {router.push({ pathname: '/'});}}>
              <FontAwesome name="chevron-left" size={15} color="black" />
            </Pressable>
          ),
          title: 'Editar Tarea',
          href: null, 
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 60,
    backgroundColor: '#ccccd5',
    borderTopWidth: 0,
    elevation: 0,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#45adff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButton: {
    marginRight: 20,
  },
  backButton: {
    paddingLeft: 20,
    paddingRight: 20,
  }
});
