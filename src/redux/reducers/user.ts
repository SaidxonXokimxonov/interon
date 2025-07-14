import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase";

interface UserType {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface UserState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// 🔐 Register
export const registerUser = createAsyncThunk(
  "user/register",
  async (
    { email, password, displayName }: { email: string; password: string, displayName: string },
    thunkAPI
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password,);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        await signOut(auth);
      }

      return {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };
    } catch (err: any) {

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 🔐 Login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        code: err.code,
        message: err.message,
      });
    }
  }
);

// 🔐 Google Login (yangi qo‘shildi)
export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (_, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account"
      });
      const res = await signInWithPopup(auth, provider);
      return {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        {
          code: err.code,
          message: err.message,
        }
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },

    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        console.log(state.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
