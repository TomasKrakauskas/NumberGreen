const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const fs = require('fs');
const { randomUUID } = require('crypto');

const firebaseConfig = {
  apiKey: "AIzaSyDxvCFzntOqEh1iitPzyG2IDiMWX4VqE6A",
  authDomain: "numbergreen-3c216.firebaseapp.com",
  databaseURL: "https://numbergreen-3c216.firebaseio.com",
  projectId: "numbergreen-3c216",
  storageBucket: "numbergreen-3c216.appspot.com",
  messagingSenderId: "sender-id",
  appId: "1:202511921132:android:d81e3ff420897c1d4adac9",
  measurementId: "G-measurement-id",
};


const app = firebase.initializeApp(firebaseConfig);
const database = firestore.getFirestore(app);

let trackMap = {};

async function uploadData(data) {
    let id = randomUUID();
    trackMap[data.trackName] = id;
    

    const ref = firestore.doc(database,'tracks_data', id);
    firestore.setDoc(ref, data )
        .then(() => console.log("Data uploaded successfully!"))
        .catch((error) => console.error("Failed to upload data: ", error));
}

fs.readFile("tracks.json", "utf8", async (err, data) => {
    if (err) {
        console.error("Failed to read file: ", err);
        return;
    }
    const trackMapRef = firestore.doc(database, 'track_map', 'tracks');

    try {
        const jsonData = JSON.parse(data);
        for (let data of jsonData) {
            await uploadData(data);
        }
        
        firestore.setDoc(trackMapRef, trackMap)
            .then(() => console.log("Track map uploaded successfully!"))
            .catch((error) => console.error("Failed to upload track map: ", error));
    } catch (parseErr) {
        console.error("Error parsing JSON: ", parseErr);
    }
});

