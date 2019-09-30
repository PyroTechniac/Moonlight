import { ensureDir, scan } from 'fs-nextra';
import { extname } from 'path';

export async function walk(directory: string): Promise<string[]> {
	try {
		const files = await scan(directory, { filter: (stats, path): boolean => stats.isFile() && extname(path) === '.js' });
		return [...files.keys()];
	} catch {
		await ensureDir(directory);
		return [];
	}
}
