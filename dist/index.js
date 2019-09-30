"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./lib/structures/Server");
new Server_1.NightLightServer('nightlight-master')
    .listen(7827)
    .catch(console.error.bind(null));
//# sourceMappingURL=index.js.map