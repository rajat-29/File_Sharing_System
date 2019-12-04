var mailer = require('nodemailer');

// node mailler add your email and password here for email //
let transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    },
});

exports.sendMail = (mailOptions,cb)=>
{
	transporter.sendMail(mailOptions, function(error, info){
		if (error)
			cb(error);
		cb(null,info);
	});
}