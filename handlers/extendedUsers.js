import ExtendedUser from '../models/ExtendedUser'
import MailingUser from '../models/MailingUser'
import BotConfig from '../models/BotConfig'
import User from '../models/User'
import Good from '../models/Good'

const extendedUsersHandler = async () => {
	try {
		const exdendedUsers = await ExtendedUser.find({ forever: false })
		const expiredUsers = exdendedUsers.filter(user => Date.now() - user.expiresAt > 0)

		for (const user of expiredUsers) {
            const userId = user.userId

			await ExtendedUser.deleteOne({ userId })

			await MailingUser.deleteMany({
				type: 'subscribeSearch',
				userId,
			})

			const botConfig = await BotConfig.findOne()

			await User.updateOne(
				{ userId },
				{
					freeSearch: botConfig.maxSearch,
					freeSell: botConfig.maxGoods,
				}
			)

			await Good.updateMany({ sellerId: userId }, { desc: null })
		}
	} catch (e) {
		console.log(e)
	}
}

export default extendedUsersHandler
