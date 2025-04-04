import { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { Feather,  FontAwesome  } from "@expo/vector-icons";
import { Task } from "@/lib/api";
import { Card, Text, useThemeColor } from "./Themed";
import { supabase } from "@/lib/supabase";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);

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
                <View style={styles.header}>
                <Text
                    style={[
                    styles.title,
                    isCompleted && { textDecorationLine: "line-through", color: "#999" },
                    ]}
                >
                    {task.title}
                </Text>
                {/* Botón de more options */}
                <TouchableOpacity
                    ref={menuRef} // Guarda referencia para el menú
                    style={styles.optionsButton}
                    onPress={() => setMenuVisible(true)}
                >
                    <Feather name="more-vertical" size={20} color="#666" />
                </TouchableOpacity>
                </View>
                <Text style={[
                    styles.description,
                    isCompleted && { textDecorationLine: "line-through", color: "#999" },
                    ]}>
                    {task.description}
                </Text>
            </View>
            {/* Menú flotante */}
            <Modal
                transparent
                visible={menuVisible}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <Pressable
                style={styles.overlay}
                onPress={() => setMenuVisible(false)} // Cierra al hacer clic fuera
                >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Editar")}>
                        <Feather name="edit-2" size={16} color="#333" />
                        <Text style={styles.menuText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Eliminar")}>
                        <Feather name="trash" size={16} color="#333" />
                        <Text style={styles.menuText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </Card>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    flexShrink: 1,
    flexDirection: "row",
    justifyContent: "space-between",
     alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  optionsButton: {
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    width: 150,
    position: "absolute",
    top: 60,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
