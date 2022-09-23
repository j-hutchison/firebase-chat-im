import React from "react";
import styles from "./Message.module.css";

import { useRef } from "react";

const Message = (props) => {
	const thisMessage = useRef("");

	return (
		<div
			className={
				props.isRecipient
					? `${styles["message"]} ${styles["message-recipient"]}`
					: `${styles["message"]} ${styles["message-sender"]}`
			}
			ref={thisMessage}
		>
			<span className={styles["message-text"]}>{props.text}</span>
			<img
				className={styles["message-avatar"]}
				src={props.avatar}
				alt={props.initials}
			/>
		</div>
	);
};

export default Message;
