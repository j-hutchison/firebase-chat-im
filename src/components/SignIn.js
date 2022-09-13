import React from "react";
import styles from "./SignIn.module.css";

const SignIn = () => {
	return (
		<div className={styles["signin"]}>
			<button className={styles["signin-btn"]}>Sign in with Google</button>
			<p className={styles["signin-guidelines"]}>
				Do not violate the community guidelines or you will be banned for life!
			</p>
		</div>
	);
};

export default SignIn;
