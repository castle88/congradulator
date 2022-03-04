const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cron = require('node-cron')
const port = process.env.PORT || 4343


const transporter = nodemailer.createTransport({
	service: 'gmail',
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
		if(error){
			console.log(error)
		}else{
			console.log(`Email sent: ${info.response}`)
		}

	})
}

cron.schedule('30 17 * * *', emailJob)

app.listen(port, () => console.log(`Server running\nPort: ${port}`))