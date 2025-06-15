import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAppDispatch } from "../hooks";
import { updateTodo } from "../redux/slice/todoSlice";
import { modalStyles } from "../stylesheets/modal";

interface EditModalProps {
  visible: boolean;
  initialValue: {
    id: number;
    data: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  onClose: () => void;
}

export default function EditModal({
  visible,
  initialValue,
  onClose,
}: EditModalProps) {
  const dispatch = useAppDispatch();

  const [text, setText] = useState("");

  useEffect(() => {
    setText(initialValue?.data || "");
  }, [initialValue]);

  function updateItem() {
    if (!initialValue) return;

    dispatch(updateTodo({ id: initialValue.id, data: text }));
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalTitle}>Edit Todo</Text>
            <TextInput
              style={modalStyles.modalInput}
              placeholder="Update your todo..."
              value={text}
              onChangeText={setText}
            />
            <Text>
              Created :{" "}
              {initialValue?.createdAt
                ? new Date(initialValue.createdAt).toLocaleTimeString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: false,
                  })
                : "N/A"}
            </Text>
            <Text>
              Updated :{" "}
              {initialValue?.updatedAt
                ? new Date(initialValue.updatedAt).toLocaleTimeString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: false,
                  })
                : "N/A"}
            </Text>
            <View style={modalStyles.modalButtonRow}>
              <Pressable
                style={[
                  modalStyles.modalButton,
                  modalStyles.modalButtonSelected,
                ]}
                onPress={updateItem}
              >
                <Text style={modalStyles.modalButtonText}>Update</Text>
              </Pressable>
              <Pressable style={[modalStyles.modalButton]} onPress={onClose}>
                <Text style={modalStyles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
