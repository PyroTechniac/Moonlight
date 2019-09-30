import { NightLightServer } from './Server';

export abstract class NodeMonitor {

	public server: NightLightServer;

	public name: string;

	public constructor(server: NightLightServer, name: string) {
		this.server = server;

		this.name = name;
	}

	public abstract run(message: unknown): unknown;

}
