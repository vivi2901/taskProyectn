import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";

interface Props {
  onSubmit: (title: string) => void;
}

export default function AddTaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button
        title="Publicar"
        onPress={() => {
          onSubmit(title);
          setTitle("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },
});