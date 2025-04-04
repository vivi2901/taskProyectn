import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskOptions({ onEdit, onDelete }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      {/* Botón de opciones */}
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.optionsButton}>
        <Feather name="more-vertical" size={20} color="#666" />
      </TouchableOpacity>

      {/* Modal para mostrar las opciones */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
              <Feather name="edit-2" size={16} color="black" />
              <Text style={styles.menuText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
              <Feather name="trash-2" size={16} color="red" />
              <Text style={[styles.menuText, { color: "red" }]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsButton: {
    padding: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
