export interface RawUserData {
	id: string;
	bot: boolean;
	username: string;
	discriminator: string;
	avatar: string;
	createdTimestamp: number;
	displayAvatarURL: string;
}

export class User {

	public id: string;
	public bot: boolean;

	public username!: string;
	public discriminator!: string;
	public avatar!: string;
	public createdTimestamp!: number;
	public displayAvatarURL!: string;

	public constructor(data: RawUserData) {
		this.id = data.id;
		this.bot = Boolean(data.bot);

		this.patch(data);
	}

	public patch(data: RawUserData) {
		this.username = data.username;
		this.discriminator = data.discriminator;
		this.avatar = data.avatar;

		this.createdTimestamp = data.createdTimestamp;
		this.displayAvatarURL = data.displayAvatarURL;
	}

	public get createdAt(): Date {
		return new Date(this.createdTimestamp);
	}

	public get tag(): string {
		return `${this.username}#${this.discriminator}`;
	}

	public toJSON(): Record<string, string | number | boolean> {
		return {
			username: this.username,
			discriminator: this.discriminator,
			avatar: this.avatar,
			createdTimestamp: this.createdTimestamp,
			displayAvatarURL: this.displayAvatarURL,
			id: this.id,
			tag: this.tag,
			bot: Boolean(this.bot)
		}
	}
}
