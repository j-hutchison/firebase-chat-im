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
			{props.chatLogs.map((message, index) => {
				const messageUserId = message.val().user;

				const messageUserInfo = props.users.filter(
					(user) => user.key === messageUserId
				)[0];

				if (messageUserInfo) {
					const isCurrentUser = messageUserId === props.currentUser.getUserId();
					const { avatar, initials } = messageUserInfo.val();

					return (
						<Message
							key={index}
							isRecipient={isCurrentUser}
							text={message.val().text}
							avatar={avatar}
							initials={initials}
						></Message>
					);
				}
			})}
		</div>
	);
};

export default Conversation;
