import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, FlatList, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../hooks";
import { deleteTodo, toggleDone } from "../redux/slice/todoSlice";
import { useState, useMemo, useEffect } from "react";
import FilterModal from "../components/FilterModal";
import styles from "../stylesheets/common";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import EditModal from "../components/EditModal";

export default function Mainscreen() {
  const navigation = useNavigation();
  const { todos, totalCount, completedCount } = useAppSelector(
    (state) => state.todo
  );
  const dispatch = useAppDispatch();

  const [sortLatestFirst, setSortLatestFirst] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "done">(
    "all"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<{
    id: number;
    data: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  function deleteItem(id: number) {
    dispatch(deleteTodo(id));
  }

  function markItem(id: number) {
    dispatch(toggleDone(id));
  }

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = [...todos];

    if (filterStatus === "done") {
      filtered = filtered.filter((item) => item.done);
    } else if (filterStatus === "active") {
      filtered = filtered.filter((item) => !item.done);
    }

    filtered.sort((a, b) =>
      sortLatestFirst
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );

    return filtered.slice(0, page * itemsPerPage);
  }, [todos, filterStatus, sortLatestFirst, page, itemsPerPage]);

  const activeCount = totalCount - completedCount;

  useEffect(() => {
    setPage(1);
  }, [filterStatus, sortLatestFirst]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Total: {totalCount}</Text>
          <Text style={styles.statsText}>Completed: {completedCount}</Text>
          <Text style={styles.statsText}>Active: {activeCount}</Text>
        </View>

        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Filter and Sort</Text>
        </Pressable>

        <FilterModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortLatestFirst={sortLatestFirst}
          toggleSort={() => setSortLatestFirst((prev) => !prev)}
        />
        <EditModal
          visible={editModalVisible}
          initialValue={editItem}
          onClose={() => {
            setEditModalVisible(false);
            setEditItem(null);
          }}
        />

        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={filteredAndSortedTodos}
          onEndReached={() => {
            if (filteredAndSortedTodos.length < todos.length) {
              setPage((prev) => prev + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            !(filteredAndSortedTodos.length < todos.length) ? (
              <Text style={{ textAlign: "center", padding: 10, color: "gray" }}>
                No more todos.
              </Text>
            ) : null
          }
          renderItem={({ item }) => (
            <View style={styles.row}>
              <BouncyCheckbox
                isChecked={item.done}
                disableText
                fillColor="black"
                size={30}
                useBuiltInState={false}
                iconStyle={{ borderColor: "green" }}
                onPress={(checked: boolean) => {
                  markItem(item.id);
                }}
              />

              <View style={styles.row}>
                <View>
                  <Text style={styles.text}>{item.data}</Text>
                </View>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    setEditModalVisible(true);
                    setEditItem({
                      id: item.id,
                      data: item.data,
                      createdAt: item.createdAt,
                      updatedAt: item.updatedAt,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={() => deleteItem(item.id)}
                >
                  <Text style={styles.buttonText}> X </Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Addtodoscreen")}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
