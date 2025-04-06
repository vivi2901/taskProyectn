import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { fetchTasks, Tasks, Task , Profile} from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import { useUserInfo } from '@/lib/userContext';

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Tasks>([]);
  
    
    const { profile } = useUserInfo();
    useEffect(() => {
      const getUserTasks = async () => {
        const allTasks = await fetchTasks();
        if (profile?.id) {
          const userTasks = allTasks.filter((task) => task.user_id === profile.id);
          setTasks(userTasks);
        }
      };
      getUserTasks();
    }, [profile]);
  
    return (
      <View style={styles.container}>
        <Text>{profile?.username}</Text>
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

