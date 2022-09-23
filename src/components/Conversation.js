import React from "react";
import Message from "./Message";
import styles from "./Conversation.module.css";

import { useEffect, useRef } from "react";

const Conversation = (props) => {
	const thisConversation = useRef("");

	useEffect(() => {
		thisConversation.current.scrollIntoView(false);
	});

	return (
		<div className={styles["conversation"]} ref={thisConversation}>
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
