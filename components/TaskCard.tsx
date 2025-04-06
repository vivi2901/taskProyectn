import { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  LayoutRectangle,
  findNodeHandle,
  UIManager,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Task } from "@/lib/api";
import { Card, Text } from "./Themed";
import { supabase } from "@/lib/supabase";

interface Props {
  task: Task;
  onDelete?: (id: string) => void; // nueva prop para notificar al padre
}

export default function TaskCard({ task, onDelete }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<LayoutRectangle | null>(null);
  const buttonRef = useRef<View>(null);

  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);

  const toggleCompleted = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !isCompleted })
      .eq("id", task.id);

    if (!error) setIsCompleted(!isCompleted);
    else console.error("Error al actualizar tarea:", error);

    setLoading(false);
  };

  const deleteTask = async () => {
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);
    if (error) {
      console.error("Error al eliminar tarea:", error);
    } else {
      console.log("Tarea eliminada:", task.id);
      onDelete?.(task.id); // Notificar al componente padre
      setMenuVisible(false);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Eliminar tarea",
      "¿Estás seguro de que quieres eliminar esta tarea?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: deleteTask },
      ]
    );
  };

  const openMenu = () => {
    const handle = findNodeHandle(buttonRef.current);
    if (handle) {
      UIManager.measure(handle, (_x, _y, width, height, pageX, pageY) => {
        setMenuPosition({ x: pageX, y: pageY, width, height });
        setMenuVisible(true);
      });
    }
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

      {/* Contenido de la tarea */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              isCompleted && {
                textDecorationLine: "line-through",
                color: "#999",
              },
            ]}
          >
            {task.title}
          </Text>
          {/* Botón de opciones */}
          <TouchableOpacity ref={buttonRef} style={styles.optionsButton} onPress={openMenu}>
            <Feather name="more-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.description,
            isCompleted && {
              textDecorationLine: "line-through",
              color: "#999",
            },
          ]}
        >
          {task.description}
        </Text>
      </View>

      {/* Menú flotante */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.fullscreenOverlay} onPress={() => setMenuVisible(false)}>
          {menuPosition && (
            <View
              style={[
                styles.menuContainer,
                {
                  position: "absolute",
                  top: menuPosition.y + menuPosition.height + 4,
                  left: menuPosition.x - 120 + menuPosition.width,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  console.log("Editar", task.id);
                  setMenuVisible(false);
                }}
              >
                <Feather name="edit-2" size={16} color="black" />
                <Text style={styles.menuText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={confirmDelete} // <-- llamada a confirmación
              >
                <Feather name="trash-2" size={16} color="red" />
                <Text style={[styles.menuText, { color: "red" }]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
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
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  optionsButton: {
    padding: 4,
  },
  fullscreenOverlay: {
    flex: 1,
  },
  menuContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
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
