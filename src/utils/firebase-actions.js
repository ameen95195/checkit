import {db} from "./firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";

const COLLECTION_QUESTIONS = 'questions'

export async function addQ(id, title, value) {
    // Add a new document in collection "cities"
    console.log(db)
    // Add a new document in collection "cities"
    return await addDoc(collection(db, COLLECTION_QUESTIONS), {
        "data": value,
        "id": id,
        "title": title
    });
}

export async function getAllQ() {
    const querySnapshot = await getDocs(collection(db, COLLECTION_QUESTIONS));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
    })
    return querySnapshot
}

