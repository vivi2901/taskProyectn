import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { fetchTasks, Tasks } from "@/lib/api";
import TaskCard from "@/components/TaskCard";

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Tasks>([]);
  
    useEffect(() => {
      fetchTasks().then((data) => setTasks(data));
    }, []);
  
    return (
      <View style={styles.container}>
        <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskCard task={item} />}
        />
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

