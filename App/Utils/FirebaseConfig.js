// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV9YzL_ZB5mgfXiA16pyeaT0jWFBmKPJE",
  authDomain: "ev-charging-38792.firebaseapp.com",
  projectId: "ev-charging-38792",
  storageBucket: "ev-charging-38792.appspot.com",
  messagingSenderId: "450918490943",
  appId: "1:450918490943:web:54a4b6ca0359d54f5b298a",
  measurementId: "G-XQM0F8249W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);