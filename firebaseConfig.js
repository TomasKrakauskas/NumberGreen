import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

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


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);


