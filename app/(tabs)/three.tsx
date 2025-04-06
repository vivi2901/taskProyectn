import { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function TabThreeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Validación de id
  useEffect(() => {
    if (!id || Array.isArray(id)) {
      Alert.alert('Error', 'ID inválido');
      return;
    }

    const fetchTask = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        Alert.alert('Error', 'No se pudo cargar la tarea');
        return;
      }

      setTitle(data.title ?? '');
      setDescription(data.description ?? '');
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título no puede estar vacío');
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('tasks')
      .update({ title, description })
      .eq('id', id as string); // ya validamos que es string

    setLoading(false);

    if (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea');
      console.error('Supabase update error:', error);
    } else {
      Alert.alert('Éxito', 'Tarea actualizada correctamente');
      router.back(); // volver a la pantalla anterior
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título de la tarea"
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        multiline
      />
      <Button title={loading ? "Guardando..." : "Guardar cambios"} onPress={handleUpdate} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
});
