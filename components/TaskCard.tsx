import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Task } from "../lib/api";
import { Card, Text, useThemeColor } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Feather } from '@expo/vector-icons';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
    const color = useThemeColor({}, "primary");
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const [loading, setLoading] = useState(false);
  
    const toggleCompleted = async () => {
      setLoading(true);
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !isCompleted })
        .eq("id", task.id);
  
      if (!error) {
        setIsCompleted(!isCompleted);
      } else {
        console.error("Error al actualizar tarea:", error);
      }
      setLoading(false);
    };
  
    return (
      <Card style={styles.container}>
        <View style={styles.row}>
          {/* Checkbox */}
          <TouchableOpacity
            style={styles.checkbox}
            onPress={toggleCompleted}
            disabled={loading}
          >
            {isCompleted && <Feather name="check" size={16} color="#4CAF50" />}
          </TouchableOpacity>
  
          {/* Contenido Derecha*/}
          <View style={styles.content}>
            {/* Titulo */}
            <View style={styles.titleRow}>
              <Text
                style={[
                  styles.title,
                  isCompleted && { textDecorationLine: "line-through", color: "#999" },
                ]}
              >
                {task.title}
              </Text>
  
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={() => console.log("Abrir opciones")}
              >
                <Feather name="more-vertical" size={20} color="#666" />
              </TouchableOpacity>
            </View>
  
            {/* Descripción */}
            <Text
              style={[
                styles.descriptionText,
                isCompleted && { textDecorationLine: "line-through", color: "#999" },
              ]}
            >
              {task.description}
            </Text>
          </View>
        </View>
      </Card>
    );
  }
  const styles = StyleSheet.create({
    container: {
      marginVertical: 8,
      padding: 16,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: "#ddd",
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flex: 1,
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
      flexShrink: 1,
    },
    optionsButton: {
      padding: 4,
    },
    descriptionText: {
      fontSize: 14,
      color: "#666",
      marginTop: 4,
    },
  });
  