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

exports.mail_schedule = function(app, user, title, name, date) {
    schedule.scheduleJob(date, function() {
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



var e = 2.71828182;
var day = 0;
var rate = 0;
var level = 1;
var last_interval_date = 0;
var score = 45;

score = 1.5185954532 + ((((score - 15) / 6) - 1) * 0.0759297726);
var loop;

function calcRate(day, score, level) {
    var r = (Math.pow(e, -(day / (score * (Math.pow(level, 2) * 10))))) * 100;
    return r;
}

function startLoop() {
    loop = setInterval(calculate, 50);
}

function calculate() {
    rate = calcRate(day, score, level);
    document.getElementById("result").innerHTML = "Day " + Math.round(day + last_interval_date) + ", Rate " + rate.toFixed(5) + "%";
    drawCanvas();
    console.log("Rate : " + rate);
    if (rate <= 90) {
        interval();
        clearInterval(loop);
    }
    day += 1;
}

function calcNextInterval() {
    console.log("Next interval calculating started");
    var dayCalc = 0;
    var rateCalc = calcRate(dayCalc, score, level + 1);
    while (rateCalc > 90) {
        console.log("Next interval calculating, rate : " + rateCalc);
        rateCalc = calcRate(dayCalc, score, level + 1);
        ++dayCalc;
    }
    return dayCalc - 1;
}

function interval() {
    drawCanvasInterval();
    sendEmail(level, (day + last_interval_date), calcNextInterval());
    level++;
    last_interval_date += day;
    day = 0;
    console.log("Rate <= 90");
}

function sendEmail(level, day, dayPassed) {
    if (confirm("Email sent" +
            "\nLevel " + level +
            "\nDay " + Math.round(day) +
            "\nUntil next interval " + dayPassed + " days left" +
            "\nNext interval on Day " + (Math.round(day) + dayPassed) +
            "\nPress OK to continue, press CANCEL to pause."
        )) {
        // ok, continue
        startLoop();
    } else {
        // cancel, pause
        console.log("Paused");
        clearInterval(loop);
    }
}

function drawCanvas() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    for (var i = 0; i < 2; i++) {
        context.beginPath();
        context.moveTo((day + last_interval_date) * 2, (100 - Math.round(rate)) * 2);
        context.lineTo(((day + last_interval_date) * 2) + 1, (100 - Math.round(calcRate(day + 1, score, level))) * 2);
        context.stroke();
    }
}

function drawCanvasInterval() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.fillRect((day + last_interval_date) * 2, 0, 1, 21);
}
