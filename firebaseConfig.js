import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxvCFzntOqEh1iitPzyG2IDiMWX4VqE6A",
  authDomain: "numbergreen-3c216.firebaseapp.com",
  databaseURL: "https://numbergreen-3c216.firebaseio.com",
  projectId: "numbergreen-3c216",
  storageBucket: "numbergreen-3c216.appspot.com",
  messagingSenderId: "sender-id",
  appId: "1:202511921132:android:d81e3ff420897c1d4adac9",
  measurementId: "G-measurement-id",
};

const firebaseConfig1 = {
  apiKey: "AIzaSyDxvCFzntOqEh1iitPzyG2IDiMWX4VqE6A",
  authDomain: "numbergreen-3c216.firebaseapp.com",
  projectId: "numbergreen-3c216",
  storageBucket: "numbergreen-3c216.appspot.com",
  messagingSenderId: "202511921132",
  appId: "1:202511921132:web:6b9a2bbe661a17a94adac9",
  measurementId: "G-EXE4SLBQBP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig1);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
