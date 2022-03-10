import config from 'config'
import cron from 'cron'
import jobHandler from './jobHandler'

console.log(config.get('configName'));

import './commonDB'

const CronJob = cron.CronJob

const job = new CronJob(
    //'0 0 4 * * 0',
	config.get('cronExp'),
	jobHandler,
	null,
	true,
	'Europe/Moscow'
)