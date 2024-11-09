// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCQerdqg4_azt6gFC26yzJwdc9fmb0IVzg",
  authDomain: "airdrop-infinity.firebaseapp.com",
  projectId: "airdrop-infinity",
  storageBucket: "airdrop-infinity.firebasestorage.app",
  messagingSenderId: "240302471347",
  appId: "1:240302471347:web:96c76ae6eba1081e5398c6",
  measurementId: "G-4KTTR97QHT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line no-unused-vars
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("User Info:", user);
      return user; // You can return the user data if needed
    })
    .catch((error) => {
      // eslint-disable-next-line no-unused-vars
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's Google Account used.
      // eslint-disable-next-line no-unused-vars
      const email = error.email;
      // The Firebase Auth Credential.

      // eslint-disable-next-line no-unused-vars
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Error during Google Sign-In:", errorMessage);
    });
};

// Export the initialized app and auth for use in other parts of your application
export { app, auth };
