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
  apiKey: "AIzaSyBi5hbbpsGiRrnYFWAR8flVTJPkk7IZxCQ",
  authDomain: "test2-9dcac.firebaseapp.com",
  projectId: "test2-9dcac",
  storageBucket: "test2-9dcac.appspot.com",
  messagingSenderId: "345389281767",
  appId: "1:345389281767:web:e2ad4c0fd65654d9744d42",
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
