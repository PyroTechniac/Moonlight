import { Server as VezaServer } from 'veza';
import { KlasaClient } from 'klasa';

export class MoonlightIPCServer extends VezaServer {

	public readonly client!: KlasaClient;
	public constructor(client: KlasaClient, name: string, ...args: any[]) {
		super(name, ...args);

		Object.defineProperty(this, 'client', { value: client });
	}

}
