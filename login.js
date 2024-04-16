import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

document.getElementById('sign-in-google').addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // Gestion réussie
            console.log('Google sign in success', result);
        })
        .catch((error) => {
            // Gestion des erreurs
            console.error('Google sign in error', error);
        });
});

document.getElementById('sign-in-facebook').addEventListener('click', () => {
    signInWithPopup(auth, facebookProvider)
        .then((result) => {
            // Gestion réussie
            console.log('Facebook sign in success', result);
        })
        .catch((error) => {
            // Gestion des erreurs
            console.error('Facebook sign in error', error);
        });
});
