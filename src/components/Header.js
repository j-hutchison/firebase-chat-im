import React from "react";
import styles from "./Header.module.css";

const Header = (props) => {
	return (
		<header className={styles["chat-header"]}>
			<h1 className={styles["chat-logo"]}>⚛️🔥💬</h1>
			{props.isAuthenticated && (
				<button
					className={styles["chat-signout"]}
					onClick={props.triggerSignOut}
				>
					Sign Out
				</button>
			)}
		</header>
	);
};

export default Header;
