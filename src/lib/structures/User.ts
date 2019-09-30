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

    public username: string;
    public discriminator: string;
    public avatar: string;
    public createdTimestamp: number;
    public displayAvatarURL: string;

    public constructor(data: RawUserData) {
        this.id = data.id;
        this.bot = Boolean(data.bot);

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
}