import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ66euatjZtSQuE4PBBpcbJjcWsychi8M",
  authDomain: "gfdaystorage.firebaseapp.com",
  projectId: "gfdaystorage",
  storageBucket: "gfdaystorage.firebasestorage.app",
  messagingSenderId: "1050735841273",
  appId: "1:1050735841273:web:5f678e8a7de022366df728"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if supported)
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export default app;
