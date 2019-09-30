import { NodeMonitor } from '../lib/structures/NodeMonitor'
import { RawUserData } from '../lib/structures/User';

export default class extends NodeMonitor {
    public run(data: RawUserData) {
        this.server.users.add(data);
    }
}