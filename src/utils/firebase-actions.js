import {db} from "./firebase";
import {addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const COLLECTION_QUESTIONS = 'materials'

export async function addQ(name, constraints, isPercentage) {
    return await addDoc(collection(db, COLLECTION_QUESTIONS), {
        "name": name,
        "lower": parseFloat(constraints.lower),
        "upper": parseFloat(constraints.upper),
        "isPercentage": isPercentage,
    });
}

export async function getAllQ() {
    const query = await getDocs(collection(db, COLLECTION_QUESTIONS))
    const data = []
    query.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push(doc)
        });
    return data
}


export async function getAllMaterials() {
    const query = await getDocs(collection(db, COLLECTION_QUESTIONS))
    const data = []
    query.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        doc.id, " => ", doc.data());
        data.push(doc.data())
    });
    return data
}


export async function deleteQ(id){
    await deleteDoc(doc(db, COLLECTION_QUESTIONS, id));
}

