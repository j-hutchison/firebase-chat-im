export class User {
	#initials;
	#avatar;

	constructor(name, avatar) {
		this.#initials = this.#generateInitials(name);
		this.#avatar = avatar;
		console.log(avatar);
	}

	#generateInitials(displayName) {
		console.log(displayName);
		const names = displayName.split(" ");
		let initials = "";

		for (let i = 0; i < names.length; i++) {
			console.log(names.at(i));
			initials += names[i].at(0);
		}

		console.log(initials);
		return initials;
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
