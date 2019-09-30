import { Server as VezaServer } from 'veza';
export declare abstract class NodeMonitor {
    server: VezaServer;
    name: string;
    constructor(server: VezaServer, name: string);
    abstract run(message: unknown): unknown;
}
