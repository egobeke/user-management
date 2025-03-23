import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
    email: string;
    address: Address;

}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;

}

interface UserState {
    users: User[];
    status: "idle" | "loading" | "succeeded" | "failed" ;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    status: "idle",
    error: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return await response.json();
});

// Asyn thunk for adding user
export const addUser = createAsyncThunk(
    "users/addUser",
    async (user: Omit<User, "id">) => {

        return{
            ...user,
            id: Math.floor(Math.random()*1000),
        };
    }
);

// Async thunk for updating a user
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (user: User) => {
        return user;
    }
);

// Async thunk for deleting user
export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userId: number) => {
        return userId;
    }
);


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetching users cases
        .addCase(fetchUsers.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
          state.status = 'succeeded';
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch users';
        })
        // Adding user cases
        .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
          state.users.push(action.payload);
        })
        // Updating user cases
        .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        })
        // Deleting user cases
        .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
          state.users = state.users.filter((user) => user.id !== action.payload);
        });
    },
  });
  
  export default userSlice.reducer;
