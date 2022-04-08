import config from 'config'
import cron from 'cron'
import archivingHandler from './handlers/archiving'
import extendedUsersHandler from './handlers/extendedUsers'
import mounthlySearchAndSellHandler from './handlers/mounthlySearchAndSell'

console.log(config.get('configName'));

import './commonDB'

const CronJob = cron.CronJob

// Архивирование неактуальных товаров
//const job = new CronJob(
//    //'0 0 4 * * 0',
//	config.get('cronExp'),
//	archivingHandler,
//	null,
//	true,
//	'Europe/Moscow'
//)

// Снять PRO-версию у просроченных по дате пользователей
const takeExpiredUsersJob = new CronJob(
    '0 */10 * * * *',
	//config.get('cronExp'),
	extendedUsersHandler,
	null,
	true,
	'Europe/Moscow'
)

// Выдать 1 числа каждого месяца бесплатные поиски/продажи
const giveMounthlySearchAndSellJob = new CronJob(
    '0 0 4 1 * *',
	//config.get('cronExp'),
	mounthlySearchAndSellHandler,
	null,
	true,
	'Europe/Moscow'
)
