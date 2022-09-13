import React from "react";
import Message from "./Message";
import styles from "./Conversation.module.css";

const isRecipient1 = false;
const text1 = "Hello! Anyone there?";
const avatar1 = "https://randomuser.me/api/portraits/thumb/men/75.jpg";
const initials1 = "JH";

const isRecipient2 = true;
const text2 = "Yes! I'm here! What's up?";
const avatar2 = "https://randomuser.me/api/portraits/thumb/men/70.jpg";
const initials2 = "YC";

const Conversation = () => {
	return (
		<div className={styles["conversation"]}>
			<Message
				isRecipient={isRecipient1}
				text={text1}
				avatar={avatar1}
				initials={initials1}
			></Message>
			<Message
				isRecipient={isRecipient2}
				text={text2}
				avatar={avatar2}
				initials={initials2}
			></Message>
		</div>
	);
};

export default Conversation;
