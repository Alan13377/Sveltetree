// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDzbCGiQD0R_LAPsd8rNQTnk0DUYd6OrN8',
	authDomain: 'svelte-tree.firebaseapp.com',
	projectId: 'svelte-tree',
	storageBucket: 'svelte-tree.appspot.com',
	messagingSenderId: '518209491357',
	appId: '1:518209491357:web:8ac2fe74618245b6805f74'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
