export class Message {
	#user;
	#text;
	#isCurrentUser;

	constructor(currentUser, user, text) {
		this.#user = user;
		this.#text = text;
		this.#isCurrentUser = this.#user.isCurrentUser(currentUser.getUserId());
	}

	getMessage() {
		return this;
	}

	getUser() {
		return this.#user;
	}

	getMessageText() {
		return this.#text;
	}

	getIsCurrentUser() {
		return this.#isCurrentUser;
	}
}
