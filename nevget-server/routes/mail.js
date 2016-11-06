var rndString = require('randomstring');
var moment = require('moment-timezone');
var schedule = require('node-schedule');
var ejs = require('ejs');
var fs = require('fs');
var async = require('async');

function mail(app, mailer) {
    mailer.extend(app, {
        from: 'admin@nevget.xyz',
        host: 'smtpout.asia.secureserver.net',
        secureConnection: true,
        port: 465,
        transportMethod: 'SMTP',
        auth: {
            user: 'admin@nevget.xyz',
            pass: 'Iwinjune247!'
        }
    });
}

// users.save(function(err, data) {
//           if (err) {
//               return res.status(409).send("already exists");
//           } else {
//               var tasks = [
//                   function(callback) {
//                       ejs.renderFile('views/email_from.ejs', {
//                           token: users.token
//                       }, function(err, html) {
//                           if (err) console.log(err); // Handle error
//                           callback(null, html);
//                       });
//                   },
//
//                   function(html, callback) {
//                       fs.writeFile('views/email.ejs', html, 'utf8', function(error) {
//                           console.log('write end');
//                           callback(null);
//                       });
//                   },
//
//                   function(callback) {
//                       app.mailer.send('email', {
//                           to: email,
//                           subject: "User Account Created plz confirm",
//                           otherProperty: 'Other Property'
//                       }, function(err) {
//                           if (err) {
//                               console.log(err);
//                               return;
//                           }
//                           console.log('Email Sent');
//                       });
//
//                   }
//               ];
//
//               async.waterfall(tasks, function(err, result) {
//                   if (err) console.log(err);
//                   console.log(result);
//               });
//
//               //sendEmail(app, users.email, res);
//               return res.status(200).json({
//                   email: users.email,
//                   nick_name: users.nick_name
//               });
//           }
//       });

exports.mail_schedule = function(app, user, title, name) {
    schedule.scheduleJob('*/15 * * * *', function() {
        app.mailer.send('email', {
            to: user,
            subject: name + title,
            otherProperty: 'Other Property'
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Email Sent');
        });
    });
};

module.exports = mail;
