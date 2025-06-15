import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  data: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoState {
  todos: Todo[];
  totalCount: number;
  completedCount: number;
}

const initialState: TodoState = {
  todos: [],
  totalCount: 0,
  completedCount: 0,
};

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todo/fetchTodos",
  async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    const data = await res.json();
    const formatted: Todo[] = data.map((item: any) => {
      const now = new Date().toISOString();

      return {
        id: item.id,
        data: item.title,
        done: item.completed,
        createdAt: now,
        updatedAt: now,
      };
    });
    return formatted;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ data: string }>) => {
      const now = new Date().toISOString();
      const nextId =
        state.todos.length > 0
          ? Math.max(...state.todos.map((t) => t.id)) + 1
          : 1;
      state.todos.push({
        id: nextId,
        data: action.payload.data,
        done: false,
        createdAt: now,
        updatedAt: now,
      });
      state.totalCount += 1;
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      const todoToDelete = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (todoToDelete) {
        if (todoToDelete.done) {
          state.completedCount -= 1;
        }
        state.totalCount -= 1;
      }
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (
      state,
      action: PayloadAction<{ id: number; data: string }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.data = action.payload.data;
        todo.updatedAt = new Date().toISOString();
      }
    },

    toggleDone: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
        if (todo.done) {
          state.completedCount += 1;
        } else {
          state.completedCount -= 1;
        }
        todo.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.totalCount = action.payload.length;
      state.completedCount = action.payload.filter((todo) => todo.done).length;
    });
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleDone } =
  todoSlice.actions;
export default todoSlice.reducer;
