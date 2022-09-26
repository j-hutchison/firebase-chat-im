import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Conversation from "./components/Conversation";
import MessageInputBar from "./components/MessageInputBar";

import { User } from "./models/User";
import { Message } from "./models/Message";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

function App() {
	const text1 = "Hello! Anyone there?";
	const avatar1 = "https://randomuser.me/api/portraits/thumb/men/75.jpg";
	const initials1 = "JH";

	const text2 = "Yes! I'm here! What's up?";
	const avatar2 = "https://randomuser.me/api/portraits/thumb/men/72.jpg";
	const initials2 = "YC";

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
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		// initial get users and messages
		if (user?.user) {
			console.log(user);
			setCurrentUser(() => parseUser(user));
			setIsAuthenticated(() => true);
		}
	}, [user]);

	useEffect(() => {
		// get messages on re-render
	});

	// const user1 = new User(initials1, avatar1);
	// const user2 = new User(initials2, avatar2);

	// const message1 = new Message(currentUser, user1, text1);
	// const message2 = new Message(currentUser, user2, text2);

	const [chatLogs, setChatLogs] = useState([]);

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const parseUser = (user) => {
		const current = new User(user.user.displayName, user.user.photoURL);
		return current;
	};

	const handleSignoutClick = () => {
		setIsAuthenticated(() => false);
		setCurrentUser(() => {});
		console.log("Signed Out");
	};

	const submitMessage = (message) => {
		const newMessage = new Message(currentUser, currentUser, message);
		setChatLogs(() => [...chatLogs, newMessage]);
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
						loading={loading}
					/>
				)}
				{isAuthenticated && (
					<>
						<Conversation chatLogs={chatLogs} />
						<MessageInputBar submitMessage={submitMessage} />
					</>
				)}
			</main>
		</div>
	);
}

export default App;
