import { config } from 'dotenv';
import { addAliases } from 'module-alias';
import { resolve } from 'path';
import 'reflect-metadata';

addAliases({
	'@settings': resolve(__dirname, 'settings'),
	'@structures': resolve(__dirname, 'structures'),
	'@typings': resolve(__dirname, 'types'),
	'@utils': resolve(__dirname, 'util')
});

config();
