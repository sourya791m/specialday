// ============================================================
// Fill these in with your own free Firebase project's keys to
// turn on REAL shared data (leaderboards, referrals, activity
// feed) across every visitor. Steps:
//
// 1. Go to https://console.firebase.google.com -> Add project
// 2. Build > Firestore Database -> Create database -> Start in
//    test mode (then apply firestore.rules from this folder
//    before you get real traffic)
// 3. Project settings (gear icon) > General > "Your apps" >
//    Web app (</>) > copy the firebaseConfig object below
//
// Leave apiKey as "YOUR_API_KEY" and the whole site runs fine
// in local-only demo mode (each browser sees its own data).
// ============================================================
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDZ66euatjZtSQuE4PBBpcbJjcWsychi8M",
  authDomain: "gfdaystorage.firebaseapp.com",
  projectId: "gfdaystorage",
  storageBucket: "gfdaystorage.firebasestorage.app",
  messagingSenderId: "1050735841273",
  appId: "1:1050735841273:web:5f678e8a7de022366df728"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);