"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const veza_1 = require("veza");
const collection_1 = require("@discordjs/collection");
const Util_1 = require("../util/Util");
const path_1 = require("path");
class NightLightServer extends veza_1.Server {
    constructor(name, ...args) {
        super(name, ...args);
        this.userBaseDirectory = path_1.dirname(require.main.filename);
        this.monitors = new collection_1.default();
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
    async loadAll() {
        const keys = await Util_1.walk(path_1.join(this.userBaseDirectory, 'nodeMonitors'));
        for (const key of keys) {
            const Piece = ((req) => req.default || req)(require(key));
            const filename = path_1.basename(key);
            const sliced = filename[filename.length - 1].slice(0, -3);
            this.monitors.set(sliced, new Piece(this, sliced));
        }
    }
    async listen(...options) {
        await this.loadAll();
        return super.listen(...options);
    }
    async run(message) {
        if (!Array.isArray(message.data) || message.data.length === 0 || message.data.length > 2) {
            message.reply([0, 'INVALID_PAYLOAD']);
            return;
        }
        const [route, payload = null] = message.data;
        const monitor = this.monitors.get(route);
        if (!monitor) {
            message.reply([0, 'UNKNOWN_ROUTE']);
            return;
        }
        try {
            const result = await monitor.run(payload);
            message.reply([1, result]);
        }
        catch (error) {
            message.reply([0, error]);
        }
    }
}
exports.NightLightServer = NightLightServer;
//# sourceMappingURL=Server.js.map