    /*Regular Expression*/
function validate() {
var inputEmail = $("iemail");

if(!chk(/^[-!#$%& amp;'*+./0-9=?A-Z^_a-z{|}~]+@[-!#$%&'*+/0-9=?A-Z^_a-z{|}~]+.[-!#$%& amp;'*+./0-9=?A-Z^_a-z{|}~]+$/,iemail, "이메일 형식에 어긋납니다."))return false;} //서버에서 2차 처리

      function chk(re, e, msg) {
               if (re.test(e.value)) {
                       return true;
               }
               $("#iemail").before("<p style='color:red'>"+msg+"</p>");
               e.value = "";
               e.focus();
               return false;
        }


    function yes() {
        document.getElementById("yn").checked = true;
    }

    function no() {
        document.getElementById("yn").checked = false;
    }

    /*Log in & Sign in - To be able to move*/
    $(function () {
        var log = $('.L');
        var sign = $('.S');
        var main = $('.M');
        log.click(function () {
            $('.main').css("display", "none");
            $('.log').fadeIn();
        });
        sign.click(function () {
            $('.main').css("display", "none")
            $('.sign').fadeIn();
        });
        main.click(function () {
            $('.log').css("display", "none")
            $('.sign').css("display", "none")
            $('.main').fadeIn();
        });
    });



    /*TEXT UPDOWN*/
    $(function () {
        var down = $('.down');
        var up = $('.up');
        var textbox = $('.textbox');
        down.click(function () {
            textbox.slideDown();
            $('.down').css("display", "none")
            $('.up').show();
        });
        up.click(function () {
            textbox.slideUp();
            $('.up').css("display", "none")
            $('.down').show();
        });
    });

    /*graph*/
    var x = 0;
    var y = 0;
    var level = 1;
    var last_interval_date = 0;

    function calculate() {
        var e = 2.71828182;

        y = Math.pow(e, -(x / (1.898 * (Math.pow(level, 2)))));
        document.getElementById("result").innerHTML = "Day " + Math.round((x + last_interval_date) * 10) + ", Rate " + y.toFixed(5);
        drawCanvas();

        if (y <= 0.9) {
            sendEmail(level, (x + last_interval_date) * 10);
            level++;
            last_interval_date += x;
            x = 0;
        }
        x += 0.1;
    }

    function sendEmail(level, x) {
        alert("Email sent : level " + level + ", day " + Math.round(x));
    }

    function drawCanvas() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        context.fillRect(((x + last_interval_date) * 10) * 2, 100 - Math.round(y * 100), 2, 2);
    }


    /*Reminders & settings - To be able to move*/
    $(function () {
        $('.Set').click(function () {
            $('.main').css("display", "none");
            $('.setting').fadeIn();
        });
        $('.Lis').click(function () {
            $('.main').css("display", "none")
            $('.add').css("display", "none")
            $('.edit').css("display", "none")
            $('.list').fadeIn();
        });
        $('.Add').click(function () {
            $('.list').css("display", "none")
            $('.add').fadeIn();
        });
        $('.Edi').click(function () {
            $('.list').css("display", "none")
            $('.edit').fadeIn();
        });
        $('.Ma').click(function () {
            $('.setting').css("display", "none")
            $('.list').css("display", "none")
            $('.add').css("display", "none")
            $('.edit').css("display", "none")
            $('.main').fadeIn();
        });

    });

    /*Keyword toggle*/
    $('.accordion .item .heading').click(function () {

        var a = $(this).closest('.item');
        var b = $(a).hasClass('open');
        var c = $(a).closest('.accordion').find('.open');

        if (b != true) {
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
            background: "radial-gradient(circle," + color1 + ",white)"
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
 
/*Carousel*/
$('.carousel').carousel({
pause: true,
interval: false
});

$(function () {
var CB = new Array("#f8da76","#c7ffb6","#eda5f7");
var a= 0;
var currentIndex = $('div.active').index();

$('.carousel').on('slid.bs.carousel', function () {
  currentIndex = $('div.active').index();
  if(currentIndex==0)
      $(".login-card.carousel.slide").animate({backgroundColor: CB[0]}, 300); 
  else if(currentIndex==1)
      $(".login-card.carousel.slide").animate({backgroundColor: CB[1]}, 300); 
  else if(currentIndex==2)
      $(".login-card.carousel.slide").animate({backgroundColor: CB[2]}, 300); 
});
    
});