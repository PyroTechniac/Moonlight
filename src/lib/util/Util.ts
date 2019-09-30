import { scan, ensureDir } from 'fs-nextra';
import { extname, relative } from 'path';

export async function walk(directory: string): Promise<string[]> {
	try {
		const files = await scan(directory, { filter: (stats, path): boolean => stats.isFile() && extname(path) === '.js' });
		return [...files.keys()].map((file): string => relative(directory, file));
	} catch {
		await ensureDir(directory);
		return [];
	}
}
