import { db } from "./firebase";
import { type Message, type Test } from "../redux/reducers/tests";
import { type Result } from "../redux/reducers/results";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export const fetchTests = async () => {
  const snapshot = await getDocs(collection(db, "tests"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
export const fetchResults = async () => {
  const snapshot = await getDocs(collection(db, "results"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const createTest = async (testData: Omit<Test, "id">) => {
  const docRef = await addDoc(collection(db, "tests"), testData);
  return { id: docRef.id, ...testData };
};
export const sendMessage = async (message: Omit<Message, "id">) => {
  const docRef = await addDoc(collection(db, "message"), message);
  return { id: docRef.id, ...message };
};

export const createResult = async (resultData: Result) => {
  const docRef = await addDoc(collection(db, "results"), resultData);
  return { ...resultData, id: docRef.id };
};

export const updateTest = async (id: string, updatedData: Partial<Test>) => {
  const docRef = doc(db, "tests", id);
  await updateDoc(docRef, updatedData);
  return true;
};

export const deleteTest = async (id: string) => {
  const docRef = doc(db, "tests", id);
  await deleteDoc(docRef);
  return true;
};

export const getTestById = async (id: string): Promise<Test | null> => {
  const docRef = doc(db, "tests", id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Test;
  } else {
    return null;
  }
};
export const getResultById = async (id: string): Promise<Test | null> => {
  const docRef = doc(db, "results", id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Test;
  } else {
    return null;
  }
};