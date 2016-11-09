var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  Users.findOne({email: req.session.email}, function(err, users) {
    if(err) err;
    if(!users.isTested || users.isTested == null){
      res.render('brain_test');
    }else{
      res.redirect('/home');
    }
  });
});

router.post('/', function(req, res, next) {
  var score = req.body.score;
  score = 1.5185954532 + score * 0.0759297726;

   Users.update({email: req.session.email}, {$set: {score: score}}, function(err, result){
      if(err) err;
      if(result) res.redirect('/');
    });
});

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

function calcRate(day, score, level) {
  var r = (Math.pow(e, -(day / (score * (Math.pow(level, 2) * 10))))) * 100;
  return r;
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
            if(confirm("Email sent" + "\nLevel " + level +
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
module.exports = router;
