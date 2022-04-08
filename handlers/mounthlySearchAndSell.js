import User from '../models/User'
import BotConfig from '../models/BotConfig'

const mounthlySearchAndSellHandler = async () => {
	try {
        const botConfig = await BotConfig.findOne()

        await User.updateMany(
            {},
            {
                freeSearch: botConfig.maxSearch,
                freeSell: botConfig.maxGoods
            }
        )
	} catch (e) {
		console.log(e)
	}
}

export default mounthlySearchAndSellHandler
