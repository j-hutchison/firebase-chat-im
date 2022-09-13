import React from "react";
import styles from "./MessageInputBar.module.css";

const MessageInputBar = () => {
	return (
		<footer className={styles["footer"]}>
			<input
				className={styles["footer-input"]}
				type="text"
				placeholder="Message"
			/>
			<button className={styles["footer-send-btn"]}>✉</button>
		</footer>
	);
};

export default MessageInputBar;
