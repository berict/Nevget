function mail(app, mailer) {
    mailer.extend(app, {
        from: 'admin@nevget.xyz',
        host: 'smtpout.asia.secureserver.net', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: 'admin@nevget.xyz',
            pass: 'Iwinjune247!'
        }
    });

    app.mailer.send('email', {
      to: 'iwin247@edcan.kr',
      subject: 'you must remind',
      otherProperty: 'Other Property'
  }, function(err) {
      if (err) {
          console.log(err);
          return;
      }
      console.log('Email Sent');
  });

}

function mail_schedule(user, title, name){
  app.mailer.send('email', {
      to: user,
      subject: name + 'you must remind this ' + title,
      otherProperty: 'Other Property'
  }, function(err) {
      if (err) {
          console.log(err);
          return;
      }
      console.log('Email Sent');
  });
}

module.exports = mail;
