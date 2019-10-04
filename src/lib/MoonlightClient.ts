import { Client, Colors, KlasaClientOptions } from 'klasa';
import './MoonlightPreload';
import { IPCMonitorStore } from './structures/IPCMonitorStore';
import { MoonlightIPCServer as MoonlightServer } from './structures/MoonlightServer';
import { Events } from './types/Enums';

const g = new Colors({ text: 'green' }).format('[IPC   ]');
const y = new Colors({ text: 'yellow' }).format('[IPC   ]');
const r = new Colors({ text: 'red' }).format('[IPC   ]');

export class MoonlightClient extends Client {

	public constructor(options: KlasaClientOptions = {}) {
		super(options);
		Reflect.defineMetadata('MoonlightClient', true, this);


		this.ipcMonitors = new IPCMonitorStore(this);
		this.registerStore(this.ipcMonitors);
		this.server = new MoonlightServer(this, 'moonlight-master')
			.on('open', (): void => { this.emit(Events.Log, `${g} Server Opened`); })
			.on('close', (): void => { this.emit(Events.Error, `${g} Server Closed`); })
			.on('disconnect', (client): void => { this.emit(Events.Warn, `${y} Disconnected: ${client.name}`); })
			.on('connect', (client): void => { this.emit(Events.Log, `${g} Ready: ${client.name}`); })
			.on('error', (error, client): void => { this.emit(Events.Error, `${r} Error from ${(client && client.name) || 'Unknown'}`, error); })
			.on('message', this.ipcMonitors.run.bind(this.ipcMonitors));

	}

	public async login(token?: string): Promise<string> {
		await this.server.listen(7827)
			.catch((err): void => this.console.error(`${r} Could not start server: ${err}`));
		return super.login(token);
	}

}
