import React from "react";
import styles from "./SignIn.module.css";

const SignIn = (props) => {
	if (props.loading) {
		return <p>Loading...</p>;
	}
	if (props.user?.user) {
		if (!props.user.user.email) {
			return (
				<p>
					An unexpected error occurred when signing in, please refresh and try
					again...
				</p>
			);
		}
	}

	return (
		<div className={styles["signin"]}>
			<button
				className={styles["signin-btn"]}
				onClick={() => props.signInWithGoogle()}
			>
				Sign in with Google
			</button>
			<p className={styles["signin-guidelines"]}>
				Do not violate the community guidelines or you will be banned for life!
			</p>
		</div>
	);
};

export default SignIn;
