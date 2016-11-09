  var pw_check = false;

  function yes() {
      document.getElementById("yn").checked = true;
      $('#agreeAlert').css("display", "none");
  }

  function no() {
      document.getElementById("yn").checked = false;
  }

  function check() {
      document.getElementById("yn").checked = false;
      agree = false;
  }

  /*Log in & Sign in - To be able to move*/
  $(function() {
      var log = $('.L');
      var sign = $('.S');
      var main = $('.M');
      log.click(function() {
          $('.main').css("display", "none");
          $('.log').fadeIn();
      });
      sign.click(function() {
          $('.main').css("display", "none");
          $('.sign').fadeIn();
      });
      main.click(function() {
          $('.log').css("display", "none");
          $('.sign').css("display", "none");
          $('.main').fadeIn();
      });
  });



  /*TEXT UPDOWN*/
  $(function() {
      var down = $('.down');
      var up = $('.up');
      var textbox = $('.textbox');
      down.click(function() {
          textbox.slideDown();
          $('.down').css("display", "none");
          $('.up').show();
      });
      up.click(function() {
          textbox.slideUp();
          $('.up').css("display", "none");
          $('.down').show();
      });
  });

  /*graph*/
  var e = 2.71828182;
  var day = 0;
  var rate = 0;
  var level = 1;
  var last_interval_date = 0;

  //var score = prompt("Enter game score 1 <= x <= 10");
  var score = 4;
  score = 1.5185954532 + (score * 0.0759297726);

  var loop;

  function calcRate(day, score, level) {
      var r = (Math.pow(e, -(day / (score * (Math.pow(level, 2) * 10))))) * 100;
      return r;
  }

  function startLoop() {
      loop = setInterval(calculate, 10);
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
          //context.fillRect((day + last_interval_date) * 2, 100 - Math.round(rate), i + 1, i + 1);
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


  /*Reminders & settings - To be able to move*/
  $(function() {
      $('.Set').click(function() {
          $('.main').css("display", "none");
          $('.setting').fadeIn();
      });
      $('.Lis').click(function() {
          $('.main').css("display", "none");
          $('.add').css("display", "none");
          $('.edit').css("display", "none");
          $('.list').fadeIn();
      });
      $('.Add').click(function() {
          $('.list').css("display", "none");
          $('.add').fadeIn();
      });
      $('.Edi').click(function() {
          $('.list').css("display", "none");
          $('.edit').fadeIn();
      });
      $('.Ma').click(function() {
          $('.setting').css("display", "none");
          $('.list').css("display", "none");
          $('.add').css("display", "none");
          $('.edit').css("display", "none");
          $('.main').fadeIn();
      });

  });

  /*Keyword toggle*/
  $('.accordion .item .heading').click(function() {

      var a = $(this).closest('.item');
      var b = $(a).hasClass('open');
      var c = $(a).closest('.accordion').find('.open');

      if (b !== true) {
          $(c).find('.content').slideUp(200);
          $(c).removeClass('open');
      }

      $(a).toggleClass('open');
      $(a).find('.content').slideToggle(200);

  });


  /*Background GRADATION*/
  var colors = new Array(
      [62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]);

  var step = 0;
  var colorIndices = [0, 1, 2, 3];

  //transition speed
  var gradientSpeed = 0.002;

  function updateGradient() {
      if ($ === undefined) return;

      var c0_0 = colors[colorIndices[0]];
      var c0_1 = colors[colorIndices[1]];
      var c1_0 = colors[colorIndices[2]];
      var c1_1 = colors[colorIndices[3]];

      var istep = 1 - step;
      var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";


      $('#gradient').css({
          background: "-webkit-radial-gradient(circle," + color1 + ",white)"
      }, 2000);
      step += gradientSpeed;
      if (step >= 1) {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];
          colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
          colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

      }
  }
  setInterval(updateGradient, 10);


  $('input[name=sign]').click(function() {
      if ($("input:checkbox[id='yn']").is(":checked")) {
          $.post("/email", {
              email: $('#iemail').val()
          }, (data, status) => {
            if (data) {
              $('#emailAlert').css("display", "none");
                if ($('#pw').val() !== "" && $('#pw_c').val() !== "" && $('#pw').val() == $('#pw_c').val()) {
                  var form = document.createElement("form");
                  var email = document.createElement("input");
                  var Name = document.createElement("input");
                  var pw = document.createElement("input");

                  form.setAttribute("method", "post");
                  form.setAttribute("action", "/auth/reg");

                  email.setAttribute("name", "email");
                  email.setAttribute("value", $('#iemail').val());

                  Name.setAttribute("name", "name");
                  Name.setAttribute("value", $('#Name').val());

                  pw.setAttribute("name", "pw");
                  pw.setAttribute("value", $('#pw').val());
                  form.appendChild(email);
                  form.appendChild(Name);
                  form.appendChild(pw);
                  form.submit();
                } else {
                    $('#pwAlert').html("check passwd plz");
                    $('#pwAlert').css("display", "block");
                }
            } else {
                $('#emailAlert').html("invaild email address");
                $('#emailAlert').css("display", "block");
            }
          });
      } else {
          $("#agreeAlert").html("plz Agreement of the policy");
          $('#agreeAlert').css("display", "block");
      }
  });
