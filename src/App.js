import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Conversation from "./components/Conversation";
import MessageInputBar from "./components/MessageInputBar";

import { User } from "./models/User";
import { Message } from "./models/Message";

import { initializeApp } from "firebase/app";
import { ref, set, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";

import { getAuth } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

function App() {
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
	const [signInWithGoogle, user, loadingGoogleAuth] = useSignInWithGoogle(auth);
	const [currentUser, setCurrentUser] = useState({});

	// const [chatLogs, setChatLogs] = useState([]);
	const database = getDatabase(firebaseApp);

	// GET MESSAGES FROM DB
	const [messages, loadingMessages, errorMessages] = useList(
		ref(database, "messages")
	);
	// GET USERS FROM DB
	const [users, loadingUsers, errorUsers] = useList(ref(database, "users"));

	function writeUserData(currentUser) {
		set(ref(database, "users/" + currentUser.getUserId()), {
			initials: currentUser.getInitials(),
			email: currentUser.getEmail(),
			avatar: currentUser.getAvatar(),
		});
	}

	function writeMessageData(messageText) {
		set(ref(database, "messages/" + new Date().getTime()), {
			text: messageText,
			user: currentUser.getUserId(),
		});
	}

	useEffect(() => {
		// if user is updated and returns a user object
		if (user?.user) {
			console.log(user);
			const existingUser = isExistingUser(user.user.email);
			const { avatar, initials } = existingUser.val();
			const userId = existingUser.key;

			if (initials) {
				setCurrentUser(() => new User(null, avatar, null, userId, initials));
			} else {
				setCurrentUser(() => parseUser(user));
			}
			setIsAuthenticated(() => true);
		}
	}, [user]);

	const isExistingUser = (email) => {
		return users.filter((user) => user.val().email === email)[0];
	};

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const parseUser = (user) => {
		const curr_user = new User(
			user.user.displayName,
			user.user.photoURL,
			user.user.email
		);
		writeUserData(curr_user);
		return curr_user;
	};

	const handleSignoutClick = () => {
		setIsAuthenticated(() => false);
		setCurrentUser(() => {});
		console.log("Signed Out");
	};

	const submitMessage = (message) => {
		const newMessage = new Message(currentUser, currentUser, message);
		writeMessageData(message);
	};

	return (
		<div className="App">
			<Header
				isAuthenticated={isAuthenticated}
				triggerSignOut={handleSignoutClick}
			/>
			<main className="chat-container">
				{!isAuthenticated && (
					<SignIn
						signInWithGoogle={signInWithGoogle}
						user={currentUser}
						loading={loadingGoogleAuth}
					/>
				)}
				{isAuthenticated && (
					<>
						<Conversation
							chatLogs={messages}
							users={users}
							currentUser={currentUser}
						/>
						<MessageInputBar submitMessage={submitMessage} />
					</>
				)}
			</main>
		</div>
	);
}

export default App;
