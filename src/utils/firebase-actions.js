import {db} from "./firebase";
import {addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const COLLECTION_QUESTIONS = 'materials'

export async function addQ(name, constraints, isPercentage) {
    // Add a new document in collection "cities"
    console.log(db)
    // Add a new document in collection "cities"
    return await addDoc(collection(db, COLLECTION_QUESTIONS), {
        "name": name,
        "lower": constraints.lower,
        "upper": constraints.upper,
        "isPercentage": isPercentage,
    });
}

export async function getAllQ() {
    const query = await getDocs(collection(db, COLLECTION_QUESTIONS))
    const data = []
    query.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            data.push(doc)
        });
    return data
}

export async function deleteQ(id){
    await deleteDoc(doc(db, COLLECTION_QUESTIONS, id));
}

