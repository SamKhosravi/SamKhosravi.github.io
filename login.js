// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAWrPPe2PF-i-zCgarDafqQ5ywS5OQQ5k8",
    authDomain: "nutri-scan-food.firebaseapp.com",
    projectId: "nutri-scan-food",
    storageBucket: "nutri-scan-food.appspot.com",
    messagingSenderId: "451956998080",
    appId: "1:451956998080:web:98a4fb3bf0b2148a5b1225",
    measurementId: "G-PBH8J37N2K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

document.getElementById('sign-in-google').addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            console.log(result.user);
            // Redirection to index.html after successful login
            window.location.assign('index.html');
        }).catch((error) => {
            console.error('Failed to sign in with Google:', error);
        });
});

document.getElementById('sign-in-facebook').addEventListener('click', () => {
    signInWithPopup(auth, facebookProvider)
        .then((result) => {
            console.log(result.user);
            // Redirection to index.html after successful login
            window.location.assign('index.html');
        }).catch((error) => {
            console.error('Failed to sign in with Facebook:', error);
        });
});
