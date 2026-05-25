import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1Y047RYO3cGmHGK1kQg6ROC5mIkSbTII",
  authDomain: "ai-model-inventory-2e2d7.firebaseapp.com",
  projectId: "ai-model-inventory-2e2d7",
  storageBucket: "ai-model-inventory-2e2d7.firebasestorage.app",
  messagingSenderId: "372447216844",
  appId: "1:372447216844:web:24aef538ff1cf35fd96e69"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();