import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAu6qMHLDBX3fut13I-2ycsLlUeZsF-r88",
  authDomain: "artist-s-portfolio.firebaseapp.com",
  projectId: "artist-s-portfolio",
  storageBucket: "artist-s-portfolio.firebasestorage.app",
  messagingSenderId: "926993318979",
  appId: "1:926993318979:web:a61f85960d358d66e600f6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);