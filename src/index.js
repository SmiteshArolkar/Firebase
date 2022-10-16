import { 
    initializeApp ,
} from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
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

    //adding docs requires addDocs function
    //refrencing add form
    const addbookForm = document.querySelector('.add')
    //e event object
    addbookForm.addEventListener('submit',(e) => {
       //prevents refresing the page on submit
        e.preventDefault()

        //adding docs from input to db
        addDoc(colRef,{
            title: addbookForm.title.value,
            author: addbookForm.author.value,
        })

        .then(() => {
            addbookForm.reset()
        })


    })

    //deleting documents requires deleteDoc() and for refrencing require doc()
    const deleteBookForm = document.querySelector('.delete')
    deleteBookForm.addEventListener('submit',(e) => {
        e.preventDefault()

        //1) create a refrence to document 
        // docRef() => database(firestore) , document name , id
        const docRef = doc(db,'Books',deleteBookForm.id.value)

        //2)delete doc
        deleteDoc(docRef)
        .this(() => {
            //reseting form
            deleteBookForm.reset()
        })
        


    })


