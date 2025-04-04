import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AddTaskForm from "@/components/AddTaskForm";
import { fetchTasks, Tasks } from "@/lib/api";

export default function TabTwoScreen() {
  const [tasks, setTasks] = useState<Tasks>([]);

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
  }, []);

  const handleSubmit = async (title: string, description: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, description }])
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
