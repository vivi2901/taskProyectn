import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AddTaskForm from "@/components/AddTaskForm";
import { fetchTasks, Tasks } from "@/lib/api";

export default function TabOneScreen() {

  const [tasks, setTasks] = useState<Tasks>([]);

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
  }, []);

  const handleSubmit = async (title: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert({ title })
      .select();
    if (error) {
      console.log(error);
    } else {
      setTasks([data[0], ...tasks]);
    }
  };

  return (
    <View style={styles.container}>
      <AddTaskForm onSubmit={handleSubmit} />
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
