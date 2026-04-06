import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { db } from "./firebase_config.js";

export async function addArtwork(artwork) {
    try {
        const docRef = await addDoc(collection(db, "artworks"), artwork);
        console.log("Artwork added with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding artwork:", error);
    }
}