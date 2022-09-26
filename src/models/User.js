export class User {
	#initials;
	#avatar;
	#email;
	#id;

	constructor(name, avatar, email, id = false, initials = false) {
		this.#id = id ? id : Math.round(Math.random() * 10000);
		this.#initials = initials ? initials : this.#generateInitials(name);
		this.#email = email;
		this.#avatar = avatar;
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

	getUserId() {
		return this.#id;
	}

	getEmail() {
		return this.#email;
	}

	isCurrentUser(currentUserId) {
		if (currentUserId === this.#id) {
			return true;
		}
		return false;
	}
}
