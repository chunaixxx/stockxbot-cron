import moment from 'moment'
import Good from './models/Good'
import BotConfig from './models/BotConfig'

moment.locale('ru')

const jobHandler = async () => {
    const botConfig = await BotConfig.findOne()
    
	const nowDate = moment()
	const lastDate = moment(botConfig.stats.archiving.lastDate)

	// Если с последнего вызова прошло больше daysRelevance - 1 дней
	if (nowDate - lastDate > 86400000 * (daysRelevance - 1)) {
		try {
            /*
                Скрыть все товары, обновление которых происходило
                не за последние 14 дней
            */
            const daysRelevance = config.get('daysRelevance')

			const res = await Good.updateMany(
				{
					updatedAt: {
                        $not: {
                            $gte: moment().subtract(daysRelevance, 'days'),
                            $lte: moment(),
                        }
					},
				},
				{
					isHide: true,
				}
			)

            /*
                Обновить в BotConfigs последнюю дату архивирования товаров
                и количество
            */
            await BotConfig.updateOne({}, {
                'stats.archiving': {
                    lastDate: moment(),
                    lastCount: res.modifiedCount
                }
            })
		} catch (e) {
			console.log(e)
		}
	}
}

export default jobHandler
