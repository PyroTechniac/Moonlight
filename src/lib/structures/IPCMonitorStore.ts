import { Store, KlasaClient } from 'klasa';
import { NodeMessage } from 'veza';
import { IPCMonitor } from './IPCMonitor';

export class IPCMonitorStore extends Store<string, IPCMonitor, typeof IPCMonitor> {

	public constructor(client: KlasaClient) {
		super(client, 'ipcMonitors', IPCMonitor);
	}

	public async run(message: NodeMessage): Promise<void> {
		if (!Array.isArray(message.data) || message.data.length === 0 || message.data.length > 2) {
			message.reply([0, 'INVALID_PAYLOAD']);
			return;
		}

		const [route, payload = null] = message.data;
		const monitor = this.get(route);
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
