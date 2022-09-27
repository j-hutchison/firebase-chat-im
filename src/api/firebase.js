import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import { ref, set } from "firebase/database";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

function writeUserData(currentUser) {
	set(ref(database, "users/" + currentUser.getUserId()), {
		initials: currentUser.getInitials(),
		email: currentUser.getEmail(),
		avatar: currentUser.getAvatar(),
	});
}

function writeMessageData(messageText, currentUser) {
	set(ref(database, "messages/" + new Date().getTime()), {
		text: messageText,
		user: currentUser.getUserId(),
	});
}

export { auth, database, writeUserData, writeMessageData };
