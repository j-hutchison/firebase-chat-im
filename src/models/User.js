export class User {
	#initials;
	#avatar;

	constructor(initials, avatar) {
		this.#initials = initials;
		this.#avatar = avatar;
	}

	getInitials() {
		return this.#initials;
	}

	getAvatar() {
		return this.#avatar;
	}

	isCurrentUser(currentUserId) {
		if (currentUserId === this.#initials) {
			return true;
		}
		return false;
	}
}
