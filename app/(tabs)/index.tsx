import { Animated, FlatList, LayoutAnimation, Platform, UIManager, StyleSheet, Image } from "react-native";
import { Text, View } from '@/components/Themed';
import { useState, useEffect, useRef } from "react";
import { fetchTasks, Tasks, Task } from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import { useUserInfo } from '@/lib/userContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Tasks>([]);
  const { profile } = useUserInfo();

  const today = new Date().toDateString();

  const refreshTasks = async () => {
    const allTasks = await fetchTasks();
    if (profile?.id) {
      const userTasks = allTasks
        .filter((task) =>
          task.user_id === profile.id &&
          new Date(task.created_at).toDateString() === today
        );
      setTasks(userTasks);
    }
  };

  useEffect(() => {
    refreshTasks();
    //Actualizacion cada 3s
    const interval = setInterval(refreshTasks, 3000);
    return () => clearInterval(interval);
  }, [profile]);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.updated_at && !b.updated_at) return 1;
    if (!a.updated_at && b.updated_at) return -1;
    return 0;
  });

  const handleTaskComplete = (updatedTask: Task) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const completedToday = tasks.filter(task =>
    task.completed && task.updated_at &&
    new Date(task.updated_at).toDateString() === today
  ).length;

  const scheduledToday = tasks.length;

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.imageWrapper}>
              <Image source={require('@/assets/images/userProfile.jpg')} style={styles.profileImage} />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>Hola</Text>
              <Text style={styles.username}>{profile?.username}</Text>
              <Text style={styles.taskSummary}>Tareas Programadas: {scheduledToday}</Text>
              <Text style={styles.taskSummary}>Tareas Terminadas: {completedToday}</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TaskCard task={item} onComplete={handleTaskComplete} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  imageWrapper: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#888',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskSummary: {
    fontSize: 14,
    color: '#666',
  },
});
