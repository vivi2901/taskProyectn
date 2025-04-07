import { View } from '@/components/Themed';
import { StyleSheet,  Alert} from "react-native";
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
      .select("*, profile: profiles(username)");
    if (error) {
      console.log(error);
      Alert.alert("Server Error", error.message);
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
