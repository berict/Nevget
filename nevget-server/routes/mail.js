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
