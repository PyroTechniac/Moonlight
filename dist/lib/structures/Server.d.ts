import { Server as VezaServer } from 'veza';
import Collection from '@discordjs/collection';
import { NodeMonitor } from './NodeMonitor';
export declare class NightLightServer extends VezaServer {
    monitors: Collection<string, NodeMonitor>;
    userBaseDirectory: string;
    constructor(name: string, ...args: any[]);
    loadAll(): Promise<void>;
    listen(...options: any[]): Promise<this>;
    private run;
}
