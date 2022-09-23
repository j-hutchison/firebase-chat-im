import React from "react";
import styles from "./MessageInputBar.module.css";

import { useRef } from "react";

const MessageInputBar = (props) => {
	const currentMessage = useRef("");

	const handleSubmitMessage = (event) => {
		event.preventDefault();
		props.submitMessage(currentMessage.current.value);
		currentMessage.current.value = "";
	};

	return (
		<form className={styles["footer"]} onSubmit={handleSubmitMessage}>
			<input
				ref={currentMessage}
				className={styles["footer-input"]}
				type="text"
				placeholder="Message"
			/>
			<button
				className={styles["footer-send-btn"]}
				onClick={handleSubmitMessage}
			>
				✉
			</button>
		</form>
	);
};

export default MessageInputBar;
