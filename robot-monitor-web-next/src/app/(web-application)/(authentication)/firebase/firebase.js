// app/firebase/client.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQndn1lLSVK5S7LOqOH5OYTiRsV6d3iNU",
  authDomain: "roverant-monitor.firebaseapp.com",
  projectId: "roverant-monitor",
  // ...
};

// Initialize
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
