import { MoonlightClient } from './lib/MoonlightClient';

MoonlightClient
	.defaultClientSchema
	.add('owners', 'User', { array: true });

MoonlightClient
	.defaultPermissionLevels
	.add(0, ({ client, author }) => author ? client.owners.has(author) : false, { 'break': true });

// eslint-disable-next-line @typescript-eslint/no-floating-promises
new MoonlightClient({
	prefix: 'm!'
}).login(process.env.TOKEN);
