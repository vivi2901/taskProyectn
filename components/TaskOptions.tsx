import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
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
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.optionsButton}
      >
        <Feather name="more-vertical" size={20} color="#666" />
      </TouchableOpacity>

      {/* Modal flotante */}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        {/* Capa que cubre toda la pantalla para detectar toques fuera */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          {/* Espacio para permitir clics solo dentro del menú */}
          <Pressable style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onEdit();
                setVisible(false);
              }}
            >
              <Feather name="edit-2" size={16} color="#414b64" />
              <Text style={styles.menuText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onDelete();
                setVisible(false);
              }}
            >
              <Feather name="trash-2" size={16} color="red" />
              <Text style={[styles.menuText, { color: "red" }]}>Eliminar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsButton: {
    padding: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 50, // Espacio desde arriba (ajusta si es necesario)
    paddingRight: 20, // Espacio desde la derecha
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
    color: "#414b64",
  },
  menuText: {
    color: "#414b64",
    marginLeft: 8,
    fontSize: 14,
  },
});
