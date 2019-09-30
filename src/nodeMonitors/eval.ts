import { NodeMonitor } from '../lib/structures/NodeMonitor'
import { inspect } from 'util'


export default class extends NodeMonitor {
    public async run(payload: string) {
        if (!payload) throw 'MISSING_PAYLOAD';
        try {
            return inspect(await eval(payload), { depth: 0, showProxy: true });
        } catch (error) {
            return inspect(error, { depth: 0, showProxy: true });
        }
    }
}