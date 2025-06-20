import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Mainscreen from "./screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import Addtodoscreen from "./screens/AddTodoScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const Stack = createNativeStackNavigator();
import { useEffect } from "react";
import { fetchTodos } from "./redux/slice/todoSlice";
import { useAppDispatch } from "./hooks";
import { StatusBar } from "react-native";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return <>{children}</>;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Provider store={store}>
        <AppInitializer>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Mainscreen"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Mainscreen" component={Mainscreen} />
              <Stack.Screen name="Addtodoscreen" component={Addtodoscreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppInitializer>
      </Provider>
    </GestureHandlerRootView>
  );
}
