import { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function TabThreeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

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
      if (data.created_at) {
        setCreatedAt(new Date(data.created_at));
      }
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
      .eq('id', id as string);

    setLoading(false);

    if (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea');
      console.error('Supabase update error:', error);
    } else {
      Alert.alert('Éxito', 'Tarea actualizada correctamente');
      router.back();
    }
  };

  // Formatear la fecha usando createdAt
  let yearText = '';
  let dateText = '';
  if (createdAt) {
    yearText = createdAt.getFullYear().toString();
    const month = createdAt.toLocaleString('es-ES', { month: 'long' });
    const day = createdAt.getDate();
    dateText = `${day} de ${month}`;
  }

  return (
    <View style={styles.container}>
      {createdAt && (
        <View style={styles.dateContainer}>
          <Text style={styles.yearText}>{yearText}</Text>
          <Text style={styles.dateText}>{dateText}</Text>
        </View>
      )}
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
        <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Guardando..." : "Guardar cambios"}</Text>
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
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
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
    backgroundColor: '#000',
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
