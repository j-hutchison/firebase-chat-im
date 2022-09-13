import React from "react";
import styles from "./Message.module.css";

const Message = (props) => {
	return (
		<div
			className={
				props.isRecipient
					? `${styles["message"]} ${styles["message-recipient"]}`
					: `${styles["message"]} ${styles["message-sender"]}`
			}
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
