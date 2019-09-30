"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_nextra_1 = require("fs-nextra");
const path_1 = require("path");
async function walk(directory) {
    try {
        const files = await fs_nextra_1.scan(directory, { filter: (stats, path) => stats.isFile() && path_1.extname(path) === '.js' });
        return [...files.keys()].map((file) => path_1.relative(directory, file));
    }
    catch {
        await fs_nextra_1.ensureDir(directory);
        return [];
    }
}
exports.walk = walk;
//# sourceMappingURL=Util.js.map