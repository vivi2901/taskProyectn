import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { View, TextInput } from "./Themed";

interface Props {
  onSubmit: (title: string, description: string) => void;
}

export default function AddTaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Calcular la fecha actual
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('es-ES', { month: 'long' });
  const day = currentDate.getDate();

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Mostrar la fecha */}
      <View style={styles.dateContainer}>
        <Text style={styles.yearText}>{year}</Text>
        <Text style={styles.dateText}>{day} de {month}</Text>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Título de la tarea"
          placeholderTextColor="#999"
        />
        <TextInput 
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción de la tarea"
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Crear tarea</Text>
        </TouchableOpacity>
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
  },
  dateContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  yearText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2e3d60',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#2e3d60',
    textTransform: 'capitalize',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2e3d60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
