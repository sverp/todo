import { Modal, Pressable, Text, View } from "react-native";
import { modalStyles } from "../stylesheets/modal";
interface Props {
  visible: boolean;
  onClose: () => void;
  filterStatus: "all" | "active" | "done";
  setFilterStatus: (status: "all" | "active" | "done") => void;
  sortLatestFirst: boolean;
  toggleSort: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  filterStatus,
  setFilterStatus,
  sortLatestFirst,
  toggleSort,
}: Props) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <Text style={modalStyles.modalTitle}>Filter Todos</Text>

          {["all", "active", "done"].map((status) => (
            <Pressable
              key={status}
              style={[
                modalStyles.modalButton,
                filterStatus === status && modalStyles.modalButtonSelected,
              ]}
              onPress={() => setFilterStatus(status as any)}
            >
              <Text style={modalStyles.modalButtonText}>
                {status.toUpperCase()}
              </Text>
            </Pressable>
          ))}

          <Pressable
            style={[modalStyles.modalButton, modalStyles.modalButtonSelected]}
            onPress={toggleSort}
          >
            <Text style={modalStyles.modalButtonText}>
              Sort: {sortLatestFirst ? "Newest First" : "Oldest First"}
            </Text>
          </Pressable>

          <Pressable
            style={[modalStyles.modalButton, modalStyles.modalButtonSelected]}
            onPress={onClose}
          >
            <Text style={modalStyles.modalButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
