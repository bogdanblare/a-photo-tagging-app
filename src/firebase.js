// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxhVRfwLz8CGZ3jRf_xG1wTMGqd8pxkpU",
  authDomain: "test3-94270.firebaseapp.com",
  databaseURL: "https://test3-94270-default-rtdb.firebaseio.com",
  projectId: "test3-94270",
  storageBucket: "test3-94270.appspot.com",
  messagingSenderId: "393868256286",
  appId: "1:393868256286:web:786da39856f0dbcbac3a0f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Get data from firestore (percentage of the character on the screen)
export const getPercentageData = async (character, location) => {
  let collectionRef = collection(db, "characters");
  let characterRef = doc(collectionRef, character);
  let locationRef = collection(characterRef, "location");
  let percentageRef = doc(locationRef, "percentage");
  let percentage = await getDoc(percentageRef);
  percentage = percentage.data();

  return percentage[location];
};

export const addToLeaderboard = async (e, username, time) => {
  //Prevent form submit
  e.preventDefault();

  let leaderboardRef = collection(db, "leaderboard");

  const data = {
    time: Number(time),
  };

  const documentId = username;
  const documentRef = doc(leaderboardRef, documentId);
  await setDoc(documentRef, data);

  document.querySelector(".modal-container").innerHTML = "";
};

export const getLeaderboard = async () => {
  try {
    const collectionRef = collection(db, "leaderboard");
    const orderedQuery = query(
      collectionRef,
      orderBy("time", "asc"),
      limit(10),
    );
    const snapshot = await getDocs(orderedQuery);
    const leaderboardData = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return leaderboardData;
  } catch (error) {
    console.log("Error getting leaderboard data: ", error);
    return [];
  }
};
