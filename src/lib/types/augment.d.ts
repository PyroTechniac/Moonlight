import { Server as VezaServer } from 'veza';
import { IPCMonitorStore } from '@structures/IPCMonitorStore';

declare module 'discord.js' {
	interface Client {
		server: VezaServer;
		ipcMonitors: IPCMonitorStore;
	}
}
