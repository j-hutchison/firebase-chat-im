import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Conversation from "./components/Conversation";
import MessageInputBar from "./components/MessageInputBar";

import { User } from "./models/User";
import { Message } from "./models/Message";

import { ref } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import {
	auth,
	database,
	writeUserData,
	writeMessageData,
} from "./api/firebase";

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAuthenticated2, setIsAuthenticated2] = useState(false);

	const [signInWithGoogle, user, loadingGoogleAuth] = useSignInWithGoogle(auth);
	// GET MESSAGES FROM DB
	const [messages] = useList(ref(database, "messages"));
	// GET USERS FROM DB
	const [users] = useList(ref(database, "users"));

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
