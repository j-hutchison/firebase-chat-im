import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import Conversation from "./components/Conversation";
import MessageInputBar from "./components/MessageInputBar";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	const handleSignoutClick = () => {
		console.log("Signed Out");
	};

	return (
		<div className="App">
			<Header isAuthenticated={isAuthenticated} />
			<main className="chat-container">
				{!isAuthenticated && <SignIn />}
				{isAuthenticated && (
					<>
						<Conversation />
						<MessageInputBar />
					</>
				)}
			</main>
		</div>
	);
}

export default App;
