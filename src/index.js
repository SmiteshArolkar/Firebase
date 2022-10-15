import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAf2JT859cNE3R1tVM80j5VoLxgbOfC8xw",
    authDomain: "fir-test-615fb.firebaseapp.com",
    projectId: "fir-test-615fb",
    storageBucket: "fir-test-615fb.appspot.com",
    messagingSenderId: "877236588346",
    appId: "1:877236588346:web:6763ad433afe3c798bca03"
  };

  //init firebase app
  initializeApp(firebaseConfig);


  //init services
  const db = getFirestore();

  //collection refrence
  const colRef = collection(db, 'Books');

  //get collection data
  getDocs(colRef)
  .then((snapshot) => {
        let books = []
        //docs contains an array of all the documents in the QuerySnapshot
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data() , id: doc.id })
        })

        console.log(books)
    })
    .catch(err => {
        console.log(err.message);
    })


