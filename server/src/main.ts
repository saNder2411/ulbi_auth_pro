import express from 'express'
import ENV from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
ENV.config()
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL ?? '')

		app.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}`))
	} catch (err) {
		console.log(err)
	}
}

start()
