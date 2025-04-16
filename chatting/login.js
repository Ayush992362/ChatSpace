
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAWX6vmJrvq8yGmkWIjvg7OHHPTKCecTrE",
    authDomain: "chatting-88fd2.firebaseapp.com",
    projectId: "chatting-88fd2",
    storageBucket: "chatting-88fd2.firebasestorage.app",
    messagingSenderId: "666589578678",
    appId: "1:666589578678:web:5c9706bd84c9cb2010ed17",
    measurementId: "G-RC41F5RPTS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);



// Event listener for registration
const login = document.getElementById("login");
login.addEventListener("click", (event) =>{
  event.preventDefault();
  // DOM elements
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

  // Firebase authentication for user registration
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successful registration
      const user = userCredential.user;
      window.location.href="home.html";
    })
    .catch((error) => {
      // Handle registration errors
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  })


