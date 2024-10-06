import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Address {
  city: string;
}

interface Company {
  name: string;
}

interface User {
  id: number;
  username: string;
  address: Address;
  company: Company;
}

interface UsersState {
  users: User[];
  archivedUsers: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UsersState = {
  users: [],
  archivedUsers: [],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return response.data.slice(0, 6);
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    editUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) state.users[index] = updatedUser;
    },
    archiveUser: (state, action) => {
      const userId = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        state.archivedUsers.push(user);
        state.users = state.users.filter(user => user.id !== userId);
      }
    },
    restoreUser: (state, action) => {
      const userId = action.payload;
      const user = state.archivedUsers.find((user) => user.id === userId);
      if (user) {
        state.users.push(user);
        state.archivedUsers = state.archivedUsers.filter(user => user.id !== userId);
      }
    },
    hideUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { editUser, archiveUser, restoreUser, hideUser } = usersSlice.actions;

export default usersSlice.reducer;
