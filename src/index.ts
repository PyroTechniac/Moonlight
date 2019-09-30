import { NightLightServer } from './lib/structures/Server';

new NightLightServer('nightlight-master')
	.listen(7827)
	.catch(console.error.bind(null));
