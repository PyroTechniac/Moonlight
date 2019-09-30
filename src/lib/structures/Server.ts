import { Server as VezaServer, NodeMessage } from 'veza';
import Collection from '@discordjs/collection';
import { NodeMonitor } from './NodeMonitor';
import { walk } from '../util/Util';
import { dirname, join, basename } from 'path';
import { UserStore } from './UserStore';

export class NightLightServer extends VezaServer {

	public monitors: Collection<string, NodeMonitor>;

	public users: UserStore;

	public userBaseDirectory: string = dirname(require.main!.filename);

	public constructor(name: string, ...args: any[]) {
		super(name, ...args);

		this.users = new UserStore(this);

		this.monitors = new Collection();

		/* eslint-disable @typescript-eslint/explicit-function-return-type */
		this
			.on('open', () => { console.log('Server Opened'); })
			.on('close', () => { console.error('Server Closed'); })
			.on('disconnect', client => { console.log(`Disconnected: ${client.name}`); })
			.on('connect', client => { console.log(`Ready: ${client.name}`); })
			.on('error', (error, client) => { console.error(`Error from ${(client && client.name) || 'Unknown'}`, error); })
			.on('message', this.run.bind(this));
		/* eslint-enable @typescript-eslint/explicit-function-return-type */
	}

	public async loadAll(): Promise<void> {
		const keys = await walk(join(this.userBaseDirectory, 'nodeMonitors'));

		for (const key of keys) {
			const Piece = ((req): any => req.default || req)(require(key));

			const filename = basename(key);

			const sliced = filename.slice(0, -3);
			console.log(key);
			console.log(filename);
			console.log(sliced);
			console.log(Piece)
			this.monitors.set(sliced, new Piece(this, sliced));
		}
	}

	public async listen(...options: any[]): Promise<this> {
		await this.loadAll();

		console.log(this.monitors);
		return super.listen(...options);
	}

	private async run(message: NodeMessage): Promise<void> {
		if (!Array.isArray(message.data) || message.data.length === 0 || message.data.length > 2) {
			message.reply([0, 'INVALID_PAYLOAD']);
			return;
		}

		console.log(message.data);

		const [route, payload = null] = message.data;
		const monitor = this.monitors.get(route);
		if (!monitor) {
			message.reply([0, 'UNKNOWN_ROUTE']);
			return;
		}

		try {
			const result = await monitor.run(payload);
			message.reply([1, result]);
		} catch (error) {
			message.reply([0, error]);
		}
	}

}
