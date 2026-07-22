// Firebase SDK 読み込み（ES Modules）
import { initializeApp } 
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase設定（あなたのプロジェクト）
const firebaseConfig = {
  apiKey: "AIzaSyD2QN26tIMHOQ-2EoY3W_1s25tMm7zP6wg",
  authDomain: "shinonoi-members.firebaseapp.com",
  projectId: "shinonoi-members",
  storageBucket: "shinonoi-members.firebasestorage.app",
  messagingSenderId: "762545358774",
  appId: "1:762545358774:web:4e0545ad56dabf77f22317"
};

// 初期化
const app = initializeApp(firebaseConfig);

// 認証オブジェクト
export const auth = getAuth(app);

// 認証関数をまとめて export
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
