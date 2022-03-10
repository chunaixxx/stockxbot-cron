import config from 'config'
import mongoose from 'mongoose'

mongoose.connect(
	config.get('mongoURL'),
	{ useUnifiedTopology: true, useNewUrlParser: true },
	e => {
		if (e) console.log(e)
		else console.log('БД подключена')
	}
)