import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { View, TextInput } from "./Themed";
import { Feather } from '@expo/vector-icons';

interface Props {
  onSubmit: (title: string, description: string) => void;
}

export default function AddTaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      <TouchableOpacity style={styles.backButton}>
        <Feather name="chevron-left" size={40} color="black" />
      </TouchableOpacity>

      <View>
        <Text style={styles.yearText}>{year}</Text>
        <Text style={styles.dateText}>{day} de {month}</Text>
      </View>

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
    width: "100%",
    padding: 16,
  },
  backButton: {
    justifyContent: 'center',
  },
  yearText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
  },
  formContainer: {
    flex: 1,
  },
  input: {
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
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

  //container: {
    //width: "100%",
    //padding: 16,
  //},
  //input: {
    //borderColor: "gray",
    //borderWidth: 1,
    //padding: 8,
  //},
//});