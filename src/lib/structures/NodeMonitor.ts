import { Server as VezaServer } from 'veza';

export abstract class NodeMonitor {

	public server: VezaServer;

	public name: string;

	public constructor(server: VezaServer, name: string) {
		this.server = server;

		this.name = name;
	}

	public abstract run(message: unknown): unknown;

}
