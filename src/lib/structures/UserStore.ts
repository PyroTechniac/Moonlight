import { CollectionConstructor, default as Collection } from '@discordjs/collection';
import { NightLightServer } from './Server';
import { RawUserData, User } from './User';

export class UserStore extends Collection<string, User> {
    public readonly server!: NightLightServer
    public constructor(server: NightLightServer) {
        super();
        Object.defineProperty(this, 'server', { value: server });
    }

    public add(data: RawUserData, cache: boolean = true): User {
        const existing = this.get(data.id);
        if (existing && cache) existing.patch(data);
        if (existing) return existing;

        const entry = new User(data);
        if (cache) this.set(entry.id, entry);
        return entry;
    }

    public async fetch(id: string): Promise<User> {
        const data: RawUserData = await this.server.sendTo('starlight-master', ['userFetch', id])[1];
        console.log(data);
        return this.add(data);
    }

    public static get [Symbol.species](): CollectionConstructor {
        return Collection as unknown as CollectionConstructor;
    }
}