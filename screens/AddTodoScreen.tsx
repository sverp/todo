import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, TextInput, Modal, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../hooks";
import { addTodo } from "../redux/slice/todoSlice";
import styles from "../stylesheets/common";
import { modalStyles } from "../stylesheets/modal";
export default function Addtodoscreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [userInput, setUserInput] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [last, setLast] = useState<string>("");
  function handleAdd() {
    if (userInput.trim() === "") {
      setShowModal(true);
      return;
    } else {
      setLast(userInput);
      dispatch(addTodo({ data: userInput }));
      setUserInput("");
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.statsText, { marginBottom: 5 }]}>
          {last.length ? `last added : ${last}` : "nothing added"}
        </Text>
        <TextInput
          style={styles.bigInput}
          placeholder="Enter todo..."
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
        />
        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Mainscreen")}
        >
          <Text style={styles.buttonText}>View Todos</Text>
        </Pressable>

        <Modal
          transparent
          animationType="fade"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={modalStyles.modalOverlay}>
            <View style={modalStyles.modalContainer}>
              <Text style={modalStyles.modalText}>Please enter a todo!</Text>
              <Pressable
                style={modalStyles.modalButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={modalStyles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
