import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Conversation from "./components/Conversation";
import MessageInputBar from "./components/MessageInputBar";

import { User } from "./models/User";
import { Message } from "./models/Message";

function App() {
	const text1 = "Hello! Anyone there?";
	const avatar1 = "https://randomuser.me/api/portraits/thumb/men/75.jpg";
	const initials1 = "JH";

	const text2 = "Yes! I'm here! What's up?";
	const avatar2 = "https://randomuser.me/api/portraits/thumb/men/72.jpg";
	const initials2 = "YC";

	const user1 = new User(initials1, avatar1);
	const user2 = new User(initials2, avatar2);

	const currentUser = user2;

	const message1 = new Message(currentUser, user1, text1);
	const message2 = new Message(currentUser, user2, text2);

	const [chatLogs, setChatLogs] = useState([message1, message2]);

	const [isAuthenticated, setIsAuthenticated] = useState(true);

	const handleSignoutClick = () => {
		setIsAuthenticated(() => false);
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
				{!isAuthenticated && <SignIn />}
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
