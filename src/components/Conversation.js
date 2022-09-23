import React from "react";
import Message from "./Message";
import styles from "./Conversation.module.css";

const Conversation = (props) => {
	return (
		<div className={styles["conversation"]}>
			{props.chatLogs.map((message) => {
				const messageUser = message.getUser();

				return (
					<Message
						isRecipient={message.getIsCurrentUser()}
						text={message.getMessageText()}
						avatar={messageUser.getAvatar()}
						initials={messageUser.getInitials()}
					></Message>
				);
			})}
		</div>
	);
};

export default Conversation;
