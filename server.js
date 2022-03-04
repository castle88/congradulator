const express = require('express')
const app = express()
require('dotenv').config()
const nodemailer = require('nodemailer')
const cron = require('node-cron')
const port = process.env.PORT || 4343


const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
})

const emailJob = async () => {
	transporter.sendMail({
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		subject: 'You are awesome',
		text: 'You did SUCH A GOOD JOB TODAY. CONGRATS!!!'
	}, (err, info) => {
		if(err){
			console.log(err)
		}else{
			console.log(`Email sent: ${info.response}`)
		}
	})
}

// every day at 530pm 30 17 * * *
cron.schedule('* * * * *', emailJob)

app.listen(port, () => console.log(`Server running\nPort: ${port}`))