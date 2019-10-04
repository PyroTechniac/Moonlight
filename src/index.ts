import { MoonlightClient } from './lib/MoonlightClient';

MoonlightClient
    .defaultClientSchema
    .add('owners', 'User', { array: true });

// eslint-disable-next-line @typescript-eslint/no-floating-promises
new MoonlightClient({
    prefix: 'm!'
}).login(process.env.TOKEN);
