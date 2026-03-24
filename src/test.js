import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

async function test() {
  try {
    console.log("Scrivo su Firestore...");
    await addDoc(collection(db, "test"), { nome: "test", ora: new Date().toISOString() });
    console.log("SCRITTO! Ora leggo...");
    const snap = await getDocs(collection(db, "test"));
    console.log("FUNZIONA! Documenti trovati:", snap.size);
  } catch (err) {
    console.error("ERRORE:", err.code, err.message);
  }
}

test();