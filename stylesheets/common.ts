import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  bigInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 4,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    alignItems: "flex-start",
    width: 200,
    flexShrink: 1,
    padding: 3,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  statsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
