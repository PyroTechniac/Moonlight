import { Server as VezaServer } from 'veza';
import { IPCMonitorStore } from '../structures/IPCMonitorStore';
import { Sockets } from './Enums';

declare module 'discord.js' {
	interface Client {
		server: VezaServer;
		ipcMonitors: IPCMonitorStore;
		ipcRequest<T>(sockets: Sockets, body: [string, unknown?], receptive?: boolean): Promise<T>;
		broadcastRequest<T>(data: [string, unknown?], receptive?: boolean): Promise<T[]>;
	}
}
